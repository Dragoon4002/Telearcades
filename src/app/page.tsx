"use client"

import Link from "next/link";
import { ConnectButton } from "thirdweb/react";
import { client } from "./client";
import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, Dice5, Target, Puzzle, Trophy, Sword, Ghost, Crown, Wallet, ArrowLeft, ArrowRight } from 'lucide-react'

// const COLORS = [
//   'bg-blue-500/40',
//   'bg-purple-500/40',
//   'bg-pink-500/40',
//   'bg-orange-500/40',
//   'bg-green-500/40',
//   'bg-yellow-500/40',
//   'bg-red-500/40',
//   'bg-indigo-500/40'
// ];

// const gravity = 0.2;
//     const bounce = 0.8;
//     const friction = 0.99;
//     const INITIAL_VELOCITY = 2;

// const getRandomPosition = () => ({
//   x: Math.random() * (window.innerWidth - 100),
//   y: -Math.random() * 500
// });

// const getRandomColor = () => COLORS[Math.floor(Math.random() * COLORS.length)];

// const DraggableIcon = ({ children, initialX, initialY, color, gravityEnabled }) => {
//   const [position, setPosition] = useState({ x: initialX, y: initialY });
//   const [isDragging, setIsDragging] = useState(false);
//   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
//   const [velocity, setVelocity] = useState(getRandomVelocity());
//   const [lastPosition, setLastPosition] = useState({ x: initialX, y: initialY });
//   const [isMoving, setIsMoving] = useState(true);

//   useEffect(() => {

//     const animate = () => {
//       if (isMoving && !isDragging) {
//         setPosition(prev => {
//           // Update velocities
//           let newVelX = velocity.x * friction;
//           let newVelY = velocity.y;
          
//           if (gravityEnabled) {
//             newVelY = (velocity.y + gravity) * friction;
//           } else {
//             newVelY = velocity.y * friction;
//           }

//           // Calculate new position
//           let newX = prev.x + newVelX;
//           let newY = prev.y + newVelY;

//           // Wall collisions
//           if (newX < 0) {
//             newX = 0;
//             newVelX = -velocity.x * bounce;
//           }
//           if (newX > window.innerWidth - 100) {
//             newX = window.innerWidth - 100;
//             newVelX = -velocity.x * bounce;
//           }

//           // Floor and ceiling collisions
//           if (newY > window.innerHeight - 100) {
//             newY = window.innerHeight - 100;
//             newVelY = -velocity.y * bounce;
//           }
//           if (newY < 0) {
//             newY = 0;
//             newVelY = -velocity.y * bounce;
//           }

//           setVelocity({ x: newVelX, y: newVelY });

//           // Add small random movement when floating
//           if (!gravityEnabled && Math.random() < 0.02) {
//             setVelocity(prev => ({
//               x: prev.x + (Math.random() - 0.5) * 0.5,
//               y: prev.y + (Math.random() - 0.5) * 0.5
//             }));
//           }

//           return { x: newX, y: newY };
//         });
//       }
//       animationFrame = requestAnimationFrame(animate);
//     };

//     let animationFrame = requestAnimationFrame(animate);
//     return () => cancelAnimationFrame(animationFrame);
//   }, [isMoving, isDragging, velocity, gravityEnabled]);

//   const handleMouseDown = (e) => {
//     setIsDragging(true);
//     setIsMoving(false);
//     setVelocity({ x: 0, y: 0 });
//     setLastPosition({ x: position.x, y: position.y });
//     setDragStart({
//       x: e.clientX - position.x,
//       y: e.clientY - position.y
//     });
//   };

//   const handleMouseMove = (e) => {
//     if (isDragging) {
//       const newX = e.clientX - dragStart.x;
//       const newY = e.clientY - dragStart.y;
//       setPosition({ x: newX, y: newY });
//       setLastPosition(position);
//     }
//   };

//   const handleMouseUp = (e) => {
//     if (isDragging) {
//       const throwVelocityX = (position.x - lastPosition.x) * 0.3;
//       const throwVelocityY = (position.y - lastPosition.y) * 0.3;
      
//       setVelocity({
//         x: throwVelocityX,
//         y: throwVelocityY
//       });
//     }
//     setIsDragging(false);
//     setIsMoving(true);
//   };

//   return (
//     <div
//       className="absolute cursor-move rounded-lg p-4 shadow-lg"
//       style={{
//         transform: `translate(${position.x}px, ${position.y}px)`,
//         transition: isDragging ? 'none' : 'transform 0.05s linear',
//         backgroundColor: `${color}33`,
//         border: `2px solid ${color}`,
//         touchAction: 'none',
//         userSelect: 'none'
//       }}
//       onMouseDown={handleMouseDown}
//       onMouseMove={handleMouseMove}
//       onMouseUp={handleMouseUp}
//       onMouseLeave={handleMouseUp}
//     >
//       {React.cloneElement(children, { color: color })}
//     </div>
//   );
// };

// export default function Home(){
//   const [icons, setIcons] = useState([]);
//   const [gravityEnabled, setGravityEnabled] = useState(true);

//   useEffect(() => {
//     const iconComponents = [
//       <Target className="w-12 h-12" />,
//       <Puzzle className="w-12 h-12" />,
//       <Sword className="w-12 h-12" />,
//       <Crown className="w-12 h-12" />,
//       <Gamepad2 className="w-12 h-12" />,
//       <Dice5 className="w-12 h-12" />,
//       <Trophy className="w-12 h-12" />,
//       <Target className="w-12 h-12" />,
//       <Sword className="w-12 h-12" />
//     ];

//     const newIcons = iconComponents.map(icon => ({
//       x: Math.random() * (window.innerWidth - 64),
//       y: Math.random() * (window.innerHeight - 64),
//       vx: (Math.random() - 0.5) * INITIAL_VELOCITY,
//       vy: (Math.random() - 0.5) * INITIAL_VELOCITY,
//       rotation: 0,
//       icon,
//       color: getRandomColor()
//     }));

//     setIcons(newIcons);
//   }, []);

//   return (
//     <div className="bg-white relative w-full h-screen overflow-hidden flex flex-col">
//       <div className="absolute p-10 items-center justify-center">
//         <div className="text-6xl md:text-8xl font-bold dark:text-black text-center">
//           Arcades on MANTLE
//         </div>
//         <div className="font-extralight text-base md:text-4xl dark:text-gray-600 py-4">
//           Enter the <b>Arena</b> of arcade and board games on MANTLE!!
//         </div>
//       {/* </div>

//       <div className="flex flex-row gap-2"> */}
//         <Link
//           className="bg-black rounded-xl w-fit text-white px-8 py-3 block"
//           href="./arena"
//         >
//           Enter Arena
//         </Link>
//         <ConnectButton client={client} theme={"dark"}></ConnectButton>
//         <button
//           className="px-4 py-2 bg-black bg-opacity-20 hover:bg-opacity-30 
//           text-gray-500 rounded-lg shadow-lg z-10 transition-all duration-200 pointer-events-auto"
//           onClick={() => setGravityEnabled(!gravityEnabled)}
//           >
//           {gravityEnabled ? 'Disable Gravity' : 'Enable Gravity'}
//         </button>
//       </div>
      
//       {/*{icons.map((icon, index) => (
//         <DraggableIcon
//           key={index}
//           initialX={icon.position.x}
//           initialY={icon.position.y}
//           color={icon.color}
//           gravityEnabled={gravityEnabled}
//         >
//           {icon.component}
//         </DraggableIcon>
//       ))}*/}
//     </div>
      
      
//   );
// };




interface FloatingIcon {
  id: number
  x: number
  y: number
  vx: number
  vy: number
  rotation: number
  icon: JSX.Element
  color: string
}

const GRAVITY = 0.1
const FRICTION = 0.99
const BOUNCE = 0.7
const INITIAL_VELOCITY = 2

export default function InteractiveIcons() {
  const [icons, setIcons] = useState<FloatingIcon[]>([])
  const [draggedIcon, setDraggedIcon] = useState<number | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragStartRef = useRef<{ x: number; y: number } | null>(null)

  useEffect(() => {
    const iconComponents = [
      <Gamepad2 size={32} />,
      <Dice5 size={32} />,
      <Target size={32} />,
      <Puzzle size={32} />,
      <Trophy size={32} />,
      <Sword size={32} />,
      <Ghost size={32} />,
      <Crown size={32} />
    ]
    
    const colors = [
      'bg-blue-500/40',
      'bg-purple-500/40',
      'bg-pink-500/40',
      'bg-orange-500/40',
      'bg-green-500/40',
      'bg-yellow-500/40',
      'bg-red-500/40',
      'bg-indigo-500/40'
    ]

    const newIcons = iconComponents.map((icon, index) => ({
      id: index,
      x: Math.random() * (window.innerWidth - 64),
      y: Math.random() * (window.innerHeight - 64), 
      vx: (Math.random() - 0.5) * INITIAL_VELOCITY,
      vy: (Math.random() - 0.5) * INITIAL_VELOCITY,
      rotation: 0,
      icon,
      color: colors[index]
    }))

    setIcons(newIcons)

    let animationFrameId: number
    const animate = () => {
      setIcons(prevIcons => 
        prevIcons.map(icon => {
          if (icon.id === draggedIcon) return icon

          let newX = icon.x + icon.vx
          let newY = icon.y + icon.vy
          let newVx = icon.vx * FRICTION
          let newVy = icon.vy * FRICTION + GRAVITY
          
          if (newX <= 0 || newX >= window.innerWidth - 64) {
            newVx = -newVx * BOUNCE
            newX = newX <= 0 ? 0 : window.innerWidth - 64
          }
          if (newY <= 0 || newY >= window.innerHeight - 64) { 
            newVy = -newVy * BOUNCE
            newY = newY <= 0 ? 0 : window.innerHeight - 64
          }

          return {
            ...icon,
            x: newX,
            y: newY,
            vx: newVx,
            vy: newVy,
            rotation: icon.rotation + icon.vx
          }
        })
      )
      animationFrameId = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrameId)
  }, [draggedIcon])

  const handleMouseDown = (id: number, e: React.MouseEvent) => {
    setDraggedIcon(id)
    dragStartRef.current = { x: e.clientX, y: e.clientY }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (draggedIcon !== null && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect()
      setIcons(prevIcons =>
        prevIcons.map(icon =>
          icon.id === draggedIcon
            ? { ...icon, x: e.clientX - rect.left - 32, y: e.clientY - rect.top - 32 }
            : icon
        )
      )
    }
  }

  const handleMouseUp = (e: React.MouseEvent) => {
    if (draggedIcon !== null && dragStartRef.current) {
      const dragEnd = { x: e.clientX, y: e.clientY }
      const dragVector = {
        x: dragEnd.x - dragStartRef.current.x,
        y: dragEnd.y - dragStartRef.current.y
      }
      setIcons(prevIcons =>
        prevIcons.map(icon =>
          icon.id === draggedIcon
            ? { ...icon, vx: dragVector.x / 10, vy: dragVector.y / 10 }
            : icon
        )
      )
      setDraggedIcon(null)
      dragStartRef.current = null
    }
  }

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 bg-white overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div className="relative w-full h-full">
        {/* Centered Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            TeleArcade
          </h1>

          {/* Navigation */}
          <div className="flex items-center justify-between w-80 bg-white rounded-full shadow-lg p-2">
            <div className="flex items-center gap-2 px-4">
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm font-medium">Arena</span>
            </div>
            
            <button className="px-4 py-2 bg-purple-500 text-white rounded-full flex items-center gap-2">
              <Wallet className="w-5 h-5" />
              <span className="text-sm">Connect</span>
            </button>
            
            <div className="flex items-center gap-2 px-4">
              <span className="text-sm font-medium">Gaming</span>
              <ArrowRight className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Floating Icons */}
        {icons.map(icon => (
          <div
            key={icon.id}
            className={`absolute cursor-grab active:cursor-grabbing p-4 rounded-lg shadow-lg ${icon.color} backdrop-blur-sm transition-transform duration-100`}
            style={{
              left: icon.x,
              top: icon.y,
              transform: `rotate(${icon.rotation}deg)`,
            }}
            onMouseDown={(e) => handleMouseDown(icon.id, e)}
          >
            {icon.icon}
          </div>
        ))}
      </div>
    </div>
  )
}

