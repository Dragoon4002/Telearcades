import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';

const GRID_SIZE = 5;
const GAME_DURATION = 30;
const COLORS = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500'];
const FAKE_COLORS = ['bg-purple-500', 'bg-pink-500', 'bg-orange-500'];

const ColorRush = () => {
  const [grid, setGrid] = useState([]);
  const [targetColor, setTargetColor] = useState('');
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION);
  const [gameStatus, setGameStatus] = useState('ready');
  const [message, setMessage] = useState('');

  const generateGrid = () => {
    const newGrid = [];
    const realColor = COLORS[Math.floor(Math.random() * COLORS.length)];
    setTargetColor(realColor);

    for (let i = 0; i < GRID_SIZE; i++) {
      const row = [];
      for (let j = 0; j < GRID_SIZE; j++) {
        // 70% chance of fake color, 30% chance of target color
        const isFake = Math.random() < 0.7;
        row.push({
          color: isFake ? FAKE_COLORS[Math.floor(Math.random() * FAKE_COLORS.length)] : realColor,
          isTarget: !isFake
        });
      }
      newGrid.push(row);
    }
    return newGrid;
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(GAME_DURATION);
    setGameStatus('playing');
    setMessage('');
    setGrid(generateGrid());
  };

  useEffect(() => {
    if (gameStatus === 'playing' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && gameStatus === 'playing') {
      setGameStatus('ended');
    }
  }, [timeLeft, gameStatus]);

  const handleTileClick = (row, col) => {
    if (gameStatus !== 'playing') return;

    const tile = grid[row][col];
    if (tile.isTarget) {
      // Correct click
      const streakBonus = Math.floor(streak / 5) * 10;
      const points = 10 + streakBonus;
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      setMessage(`+${points} points! Streak: ${streak + 1}`);
    } else {
      // Wrong click
      setScore(prev => Math.max(0, prev - 5));
      setStreak(0);
      setMessage('Wrong tile! -5 points');
    }

    // Generate new grid
    setGrid(generateGrid());
  };

  const getColorName = (color) => {
    return color.split('-')[1].split('-')[0];
  };

  return (
    <Card className="max-w-2xl mx-auto mt-8">
      <CardHeader>
        <CardTitle className="text-center">Color Rush Reflex</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-4">
          <div>
            <div className="text-xl font-bold">Score: {score}</div>
            <div className="text-sm">Streak: {streak}</div>
          </div>
          <div className="text-xl">Time: {timeLeft}s</div>
        </div>

        {message && (
          <Alert className="mb-4">
            <AlertDescription>{message}</AlertDescription>
          </Alert>
        )}

        {gameStatus === 'playing' && (
          <div className="text-center mb-4">
            <p className="text-lg">
              Tap the <span className="font-bold">{getColorName(targetColor)}</span> tiles!
            </p>
          </div>
        )}

        <div className="grid grid-cols-5 gap-2 mb-4">
          {grid.map((row, i) => (
            row.map((tile, j) => (
              <div
                key={`${i}-${j}`}
                onClick={() => handleTileClick(i, j)}
                className={`
                  aspect-square rounded-lg cursor-pointer transition-all
                  ${tile.color} hover:opacity-90
                `}
              />
            ))
          ))}
        </div>

        {(gameStatus === 'ready' || gameStatus === 'ended') && (
          <div className="text-center">
            <Button onClick={startGame}>
              {gameStatus === 'ready' ? 'Start Game' : 'Play Again'}
            </Button>
            {gameStatus === 'ended' && (
              <p className="mt-4">Final Score: {score}</p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ColorRush;