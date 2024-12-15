"use client";

import React from 'react';
import { Gamepad, Brain, Hash, Calculator, Clock, Home } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const NavItem = ({ href, icon: Icon, label }) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  
  return (
    <Link href={href}>
      <div className={`
        flex items-center gap-2 px-4 py-2 rounded-lg transition-colors
        ${isActive 
          ? 'bg-blue-100 text-blue-600' 
          : 'hover:bg-gray-100 text-gray-700 hover:text-gray-900'}
      `}>
        <Icon className="w-5 h-5" />
        <span className="hidden md:inline">{label}</span>
      </div>
    </Link>
  );
};

const Layout = ({ children }) => {
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/games/memoryFlip', icon: Hash, label: 'Word Puzzle' },
    { href: '/games/rockpaperscissor', icon: Brain, label: 'Pattern Match' },
    { href: '/games/math', icon: Calculator, label: 'Quick Math' },
    { href: '/games/memory', icon: Clock, label: 'Memory Flip' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation bar */}
      <nav className="fixed top-0 w-full bg-white shadow-md z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Gamepad className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-gray-900">Arcade Games</span>
            </div>
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <NavItem
                  key={item.href}
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                />
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <div className="pt-20 px-4">
        {children}
      </div>
    </div>
  );
};

export default Layout;