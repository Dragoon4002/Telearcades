"use client";

import React from 'react';

export const Card = ({ children, className = "", ...props }) => (
  <div 
    className={`
      bg-white rounded-xl shadow-lg 
      transition-all duration-200 
      hover:shadow-xl
      ${className}
    `} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ children, className = "", ...props }) => (
  <div 
    className={`
      px-6 py-4 border-b border-gray-100
      ${className}
    `} 
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ children, className = "", ...props }) => (
  <h2 
    className={`
      text-2xl font-bold text-gray-800
      ${className}
    `} 
    {...props}
  >
    {children}
  </h2>
);

export const CardContent = ({ children, className = "", ...props }) => (
  <div 
    className={`
      p-6
      ${className}
    `} 
    {...props}
  >
    {children}
  </div>
);

export const GameCard = ({ 
  children, 
  className = "", 
  gradient = "from-blue-50 to-purple-50",
  ...props 
}) => (
  <Card 
    className={`
      max-w-4xl mx-auto mt-8 
      bg-gradient-to-br ${gradient}
      ${className}
    `} 
    {...props}
  >
    {children}
  </Card>
);

export const CardButton = ({ 
  children, 
  variant = "primary", 
  size = "md",
  className = "", 
  ...props 
}) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    warning: "bg-yellow-500 hover:bg-yellow-600 text-black",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2",
    lg: "px-6 py-3 text-lg",
  };

  return (
    <button 
      className={`
        ${variants[variant]}
        ${sizes[size]}
        rounded-lg
        font-medium
        transition-colors
        duration-200
        disabled:opacity-50
        disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export const CardAlert = ({ children, type = "info", className = "", ...props }) => {
  const types = {
    info: "bg-blue-50 text-blue-800 border-blue-200",
    success: "bg-green-50 text-green-800 border-green-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200",
    error: "bg-red-50 text-red-800 border-red-200",
  };

  return (
    <div 
      className={`
        ${types[type]}
        p-4 rounded-lg border
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardModal = ({ 
  isOpen, 
  onClose, 
  children, 
  className = "", 
  ...props 
}) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className={`
          bg-white rounded-xl p-8 max-w-md mx-4
          transform transition-all duration-200
          scale-100 opacity-100
          ${className}
        `}
        onClick={e => e.stopPropagation()}
        {...props}
      >
        {children}
      </div>
    </div>
  );
};

export const CardGrid = ({ 
  children, 
  columns = { 
    default: 1, 
    sm: 2, 
    md: 3, 
    lg: 4 
  }, 
  gap = 6,
  className = "", 
  ...props 
}) => {
  const cols = {
    default: `grid-cols-${columns.default}`,
    sm: `sm:grid-cols-${columns.sm}`,
    md: `md:grid-cols-${columns.md}`,
    lg: `lg:grid-cols-${columns.lg}`,
  };

  return (
    <div 
      className={`
        grid gap-${gap}
        ${cols.default}
        ${cols.sm}
        ${cols.md}
        ${cols.lg}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};