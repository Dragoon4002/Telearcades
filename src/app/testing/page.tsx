"use client"
import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Dice1, Trophy, Target, Sword, ArrowLeft, ArrowRight, Wallet } from 'lucide-react';
import ToggleButton from '@/components/ui/toggleButton';

const COLORS = [
  'rgb(239, 68, 68)',   // red
  'rgb(34, 197, 94)',   // green
  'rgb(59, 130, 246)',  // blue
  'rgb(168, 85, 247)',  // purple
  'rgb(249, 115, 22)',  // orange
  'rgb(234, 179, 8)'    // yellow
];

const CONTAINER_WIDTH = 400;
const CONTAINER_HEIGHT = 800;
const ICON_SIZE = 50;

const getRandomPosition = () => ({
  x: Math.random() * (CONTAINER_WIDTH - ICON_SIZE),
  y: -Math.random() * 200
});

const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

const DraggableIcon = ({ children, initialX, initialY, color, containerRef, gravityEnabled = true }) => {
  const [position, setPosition] = useState({ x: initialX, y: initialY });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [isDropping, setIsDropping] = useState(true);
  
  const moveHistory = useRef([]);
  const lastUpdateTime = useRef(Date.now());
  
  useEffect(() => {
    let animationFrame;
    const gravity = gravityEnabled ? 0.2 : 0;
    const bounce = 0.8;
    const friction = 0.995;

    const animate = () => {
      if (isDropping && !isDragging) {
        setPosition(prev => {
          const newVelocityY = velocity.y + gravity;
          const newVelocityX = velocity.x * friction;

          let newX = prev.x + newVelocityX;
          let newY = prev.y + newVelocityY;

          let finalVelocityX = newVelocityX;
          let finalVelocityY = newVelocityY;

          if (newX < 0) {
            newX = 0;
            finalVelocityX = -newVelocityX * bounce;
          } else if (newX > CONTAINER_WIDTH - ICON_SIZE) {
            newX = CONTAINER_WIDTH - ICON_SIZE;
            finalVelocityX = -newVelocityX * bounce;
          }

          if (newY > CONTAINER_HEIGHT - ICON_SIZE) {
            newY = CONTAINER_HEIGHT - ICON_SIZE;
            finalVelocityY = -newVelocityY * bounce;
          } else if (newY < 0) {
            newY = 0;
            finalVelocityY = -newVelocityY * bounce;
          }

          setVelocity({ x: finalVelocityX, y: finalVelocityY });

          if (Math.abs(finalVelocityX) < 0.01 && Math.abs(finalVelocityY) < 0.01 && 
              newY === CONTAINER_HEIGHT - ICON_SIZE) {
            setIsDropping(false);
          }

          return { x: newX, y: newY };
        });
      }
      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [isDropping, isDragging, velocity, gravityEnabled]);

  const updateMoveHistory = (x, y) => {
    const now = Date.now();
    moveHistory.current.push({
      x,
      y,
      time: now
    });
    
    const recentTime = now - 50;
    moveHistory.current = moveHistory.current.filter(move => move.time >= recentTime);
  };

  const calculateThrowVelocity = () => {
    if (moveHistory.current.length < 2) return { x: 0, y: 0 };
    
    const recent = moveHistory.current;
    const oldest = recent[0];
    const newest = recent[recent.length - 1];
    const timeDiff = newest.time - oldest.time;
    
    if (timeDiff === 0) return { x: 0, y: 0 };

    const velocityX = (newest.x - oldest.x) / timeDiff * 15;
    const velocityY = (newest.y - oldest.y) / timeDiff * 15;
    
    const maxVelocity = 20;
    return {
      x: Math.max(Math.min(velocityX, maxVelocity), -maxVelocity),
      y: Math.max(Math.min(velocityY, maxVelocity), -maxVelocity)
    };
  };

  const handleStart = (clientX, clientY) => {
    const rect = containerRef.current.getBoundingClientRect();
    setIsDragging(true);
    setIsDropping(false);
    moveHistory.current = [];
    setDragStart({
      x: clientX - position.x - rect.left,
      y: clientY - position.y - rect.top
    });
    lastUpdateTime.current = Date.now();
  };

  const handleMove = (clientX, clientY) => {
    if (isDragging) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = Math.min(Math.max(0, clientX - dragStart.x - rect.left), CONTAINER_WIDTH - ICON_SIZE);
      const newY = Math.min(Math.max(0, clientY - dragStart.y - rect.top), CONTAINER_HEIGHT - ICON_SIZE);
      updateMoveHistory(newX, newY);
      setPosition({ x: newX, y: newY });
    }
  };

  const handleEnd = () => {
    if (isDragging) {
      const throwVelocity = calculateThrowVelocity();
      setVelocity(throwVelocity);
    }
    setIsDragging(false);
    setIsDropping(true);
    moveHistory.current = [];
  };

  const handleMouseDown = (e) => {
    e.preventDefault();
    handleStart(e.clientX, e.clientY);
  };

  const handleMouseMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      handleMove(e.clientX, e.clientY);
    }
  };

  const handleMouseUp = () => {
    handleEnd();
  };

  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    handleStart(touch.clientX, touch.clientY);
  };

  const handleTouchMove = (e) => {
    if (isDragging) {
      e.preventDefault();
      const touch = e.touches[0];
      handleMove(touch.clientX, touch.clientY);
    }
  };

  return (
    <div
      className="absolute cursor-move"
      style={{
        transform: `translate(${position.x}px, ${position.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.05s linear',
        backgroundColor: `rgba(${parseInt(color.slice(4, -1).split(',')[0])}, ${parseInt(color.slice(4, -1).split(',')[1])}, ${parseInt(color.slice(4, -1).split(',')[2])}, 0.2)`,
        border: `2px solid ${color}`,
        borderRadius: '8px',
        padding: '8px',
        width: `${ICON_SIZE}px`,
        height: `${ICON_SIZE}px`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        touchAction: 'none',
        userSelect: 'none',
        opacity: 0.8
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleEnd}
    >
      {React.cloneElement(children, { color: color, size: ICON_SIZE * 0.6 })}
    </div>
  );
};

const GamingArena = () => {
  const [icons, setIcons] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const iconComponents = [
      <Gamepad2 />,
      <Dice1 />,
      <Trophy />,
      <Target />,
      <Sword />
    ];

    const newIcons = iconComponents.map(icon => ({
      component: icon,
      position: getRandomPosition(),
      color: getRandomColor()
    }));

    setIcons(newIcons);
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div 
        ref={containerRef}
        className="relative bg-white overflow-hidden"
        style={{
          width: `${CONTAINER_WIDTH}px`,
          height: `${CONTAINER_HEIGHT}px`,
          borderRadius: '16px',
        }}
      >
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <h1 className="text-4xl font-bold text-black mb-8">
            TeleArcades
          </h1>
          <div className="flex items-center justify-between w-96 bg-white rounded-full shadow-lg p-2 pointer-events-auto">
            <div className="flex items-center gap-2 px-4">
              <ToggleButton/>
              <span className="text-sm font-medium text-gray-600">Gravity</span>
            </div>
            <button className="px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Connect</span>
            </button>
            <div className="flex items-center gap-2 px-4">
              <span className="text-sm font-medium text-gray-600">Games</span>
              <ArrowRight className="w-5 h-5 text-black" />
            </div>
          </div>
        </div>
        
        {icons.map((icon, index) => (
          <DraggableIcon
            key={index}
            initialX={icon.position.x}
            initialY={icon.position.y}
            color={icon.color}
            containerRef={containerRef}
          >
            {icon.component}
          </DraggableIcon>
        ))}
      </div>
    </div>
  );
};

export default GamingArena;

