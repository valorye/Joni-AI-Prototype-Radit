import React from 'react';

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export function Logo({ className = "", size = 40, showText = false }: LogoProps) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div 
        style={{ width: size, height: size }}
        className="relative group shrink-0"
      >
        <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 group-hover:opacity-40 transition-opacity" />
        <svg 
          viewBox="0 0 100 100" 
          className="w-full h-full relative z-10 filter drop-shadow-lg"
        >
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          {/* Main Background Shape */}
          <rect x="10" y="10" width="80" height="80" rx="24" fill="#0F172A" />
          <rect x="10" y="10" width="80" height="80" rx="24" fill="url(#logoGradient)" fillOpacity="0.1" stroke="url(#logoGradient)" strokeWidth="2" />
          
          {/* Dumbbell Silhouette */}
          <rect x="25" y="45" width="50" height="10" rx="2" fill="url(#logoGradient)" />
          <rect x="20" y="30" width="10" height="40" rx="4" fill="url(#logoGradient)" />
          <rect x="70" y="30" width="10" height="40" rx="4" fill="url(#logoGradient)" />
          
          {/* AI Sparkle Icon */}
          <path 
            d="M50 20 L52 28 L60 30 L52 32 L50 40 L48 32 L40 30 L48 28 Z" 
            fill="white" 
            className="animate-pulse"
          />
          <circle cx="80" cy="25" r="3" fill="#60A5FA" />
          <circle cx="15" cy="75" r="2" fill="#60A5FA" />
        </svg>
      </div>
      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-xl font-black italic tracking-tighter text-white">JONI</span>
            <span className="text-xl font-light tracking-tighter text-blue-400">AI</span>
          </div>
          <div className="h-1 w-full bg-linear-to-r from-blue-500 to-transparent rounded-full mt-0.5 opacity-50" />
        </div>
      )}
    </div>
  );
}
