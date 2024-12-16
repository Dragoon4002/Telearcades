"use client";

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ConnectButton, TransactionButton, useActiveAccount, useActiveWallet, useDisconnect, useReadContract } from "thirdweb/react";
import { client } from "../../client";
import { inAppWallet } from "thirdweb/wallets";
import { shortenAddress } from "thirdweb/utils";
import { getContract } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { claimTo, getBalance } from "thirdweb/extensions/erc20";
import { 
  Heart, Star, Circle, Square, Triangle, 
  Cloud, Sun, Moon, Music, Camera 
} from 'lucide-react';

const ICONS = [
  Heart, Star, Circle, Square, Triangle, 
  Cloud, Sun, Moon, Music, Camera
];

type CardType = {
  id: number;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>; // Type for the Lucide-react icons
  isFlipped: boolean;
  isMatched: boolean;
};

const createBoard = () => {
  const pairs = [...ICONS, ...ICONS];
  return pairs
    .map((Icon, index) => ({
      id: index,
      Icon,
      isFlipped: false,
      isMatched: false
    }))
    .sort(() => Math.random() - 0.5);
};

const MemoryFlip = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [flippedCards, setFlippedCards] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [moves, setMoves] = useState(0);
  const [showPrize, setShowPrize] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [prizeClaimed, setPrizeClaimed] = useState(false);
  const [gameStatus, setGameStatus] = useState('ready'); // ready, playing, ended

  const account = useActiveAccount();
  const {disconnect} = useDisconnect();
  const wallet = useActiveWallet();

  const contract = getContract({
    client: client,
    chain: defineChain(5003),
    address: "0x69ED2e06eD7E614119eD1be679f9A540E1503BA4"
  });

  const { data: tokenbalance } = useReadContract(
    getBalance,
    {
      contract: contract,
      address: account?.address!
    }
  );

  useEffect(() => {
    if (gameStatus === 'playing') {
      setCards(createBoard());
    }
  }, [gameStatus]);

  // Check for matches
  useEffect(() => {
    if (flippedCards.length === 2) {
      const [first, second] = flippedCards;
      setMoves(prev => prev + 1);
      
      if (cards[first].Icon === cards[second].Icon) {
        setCards(prev => prev.map((card, idx) => 
          idx === first || idx === second
            ? { ...card, isMatched: true }
            : card
        ));
        setScore(prev => prev + 50);
        setFlippedCards([]);
      } else {
        setTimeout(() => {
          setCards(prev => prev.map((card, idx) => 
            idx === first || idx === second
              ? { ...card, isFlipped: false }
              : card
          ));
          setFlippedCards([]);
        }, 1000);
      }
    }
  }, [flippedCards]);

  // Check for win
  useEffect(() => {
    if (gameStatus === 'playing' && cards.every(card => card.isMatched)) {
      setGameStatus('ended');
      if (moves < 20) {
        setShowPrize(true);
      }
    }
  }, [cards, moves]);

  const handleCardClick = (index: number) => {
    if (
      gameStatus !== 'playing' ||
      flippedCards.length === 2 ||
      cards[index].isFlipped ||
      cards[index].isMatched
    ) return;

    setCards(prev => prev.map((card, idx) => 
      idx === index ? { ...card, isFlipped: true } : card
    ));
    setFlippedCards(prev => [...prev, index]);
  };

  const startGame = () => {
    setCards(createBoard());
    setScore(0);
    setMoves(0);
    setFlippedCards([]);
    setShowPrize(false);
    setPrizeClaimed(false);
    setGameStatus('playing');
  };

  return (
    <Card className="max-w-4xl mx-auto mt-8 bg-gradient-to-br from-blue-50 to-purple-50">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-blue-800">Memory Flip Challenge</CardTitle>
      </CardHeader>
      <CardContent>
        {!account ? (
          <div className="flex justify-center my-8">
            <ConnectButton
              client={client}
              accountAbstraction={{
                chain: defineChain(5003),
                sponsorGas: true
              }}
              wallets={[
                inAppWallet({
                  auth: {
                    options: ["email"]
                  }
                })
              ]}
            />
          </div>
        ) : (
          <>
            <div className="flex justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm">
              <div>
                <p className="text-sm text-gray-600">{shortenAddress(account.address)}</p>
                <p className="text-md">Balance: {tokenbalance?.displayValue}</p>
              </div>
              <div className="flex gap-4">
                <div className="text-center">
                  <p className="text-sm text-gray-600">Score</p>
                  <p className="text-xl font-bold">{score}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Moves</p>
                  <p className="text-xl font-bold">{moves}</p>
                </div>
              </div>
              <button
                onClick={() => disconnect(wallet!)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Logout
              </button>
            </div>

            {gameStatus === 'ready' ? (
              <div className="text-center py-8">
                <button
                  onClick={startGame}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-lg"
                >
                  Start Game
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-5 gap-4 mb-6">
                {cards.map((card, index) => (
                  <div
                    key={card.id}
                    onClick={() => handleCardClick(index)}
                    className={`
                      aspect-square rounded-xl cursor-pointer transition-all duration-500 transform
                      ${card.isFlipped || card.isMatched ? 'rotate-0' : 'rotate-180'}
                      hover:scale-105
                    `}
                  >
                    <div className={`
                      w-full h-full rounded-xl flex items-center justify-center
                      ${card.isFlipped || card.isMatched 
                        ? 'bg-white shadow-lg' 
                        : 'bg-gradient-to-br from-blue-500 to-purple-500'}
                    `}>
                      {(card.isFlipped || card.isMatched) && (
                        <card.Icon 
                          className="w-10 h-10 text-blue-600" 
                        />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {gameStatus === 'ended' && (
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">
                  Game Complete! Score: {score}
                </h3>
                {showPrize && !prizeClaimed && (
                  <div className="space-y-4">
                    <p className="text-green-600">Congratulations! You qualified for a prize!</p>
                    <button
                      onClick={() => setShowModal(true)}
                      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                    >
                      Claim Prize
                    </button>
                  </div>
                )}
                <button
                  onClick={startGame}
                  className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Play Again
                </button>
              </div>
            )}

            {showModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-8 rounded-xl max-w-md">
                  <h2 className="text-2xl font-bold mb-4">Claim 10 Tokens!</h2>
                  <p className="mb-6">You completed the game efficiently and won 10 tokens!</p>
                  <div className="flex justify-center gap-4">
                    <TransactionButton
                      transaction={() => claimTo({
                        contract: contract,
                        to: account.address,
                        quantity: "10"
                      })}
                      onTransactionConfirmed={() => {
                        alert('Prize claimed!');
                        setShowModal(false);
                        setPrizeClaimed(true);
                      }}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Claim Prize
                    </TransactionButton>
                    <button
                      onClick={() => setShowModal(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default MemoryFlip;