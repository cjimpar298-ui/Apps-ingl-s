import React from 'react';
import { ICON_MAP } from '../data/activityTypes';
import { Pictograms } from './Pictograms';
import { LayoutGrid } from 'lucide-react';
import { cn } from '../lib/utils';

interface IconRendererProps {
  name: string;
  className?: string;
  size?: number | string;
  strokeWidth?: number;
}

export function IconRenderer({ 
  name, 
  className = "w-full h-full", 
  size = "100%", 
  strokeWidth = 2.5 
}: IconRendererProps) {
  // 1. Check if we have a bespoke polychromatic pictogram
  const PictogramComponent = Pictograms[name];
  if (PictogramComponent) {
    return (
      <div className={cn("inline-flex items-center justify-center shrink-0 drop-shadow-xs w-full h-full", className)}>
        <PictogramComponent size={size} />
      </div>
    );
  }

  // 2. Fallback to Lucide icon for backward compatibility
  const IconComponent = ICON_MAP[name] || LayoutGrid;
  return (
    <div className={cn("inline-flex items-center justify-center shrink-0 drop-shadow-xs w-full h-full", className)}>
      <IconComponent 
        size={typeof size === 'number' ? size : 28} 
        strokeWidth={strokeWidth} 
        className="w-full h-full transition-transform" 
      />
    </div>
  );
}

interface ActivityIconBadgeProps {
  icon: string;
  customImage?: string;
  colorClass?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'hero';
  className?: string;
}

export function ActivityIconBadge({
  icon,
  customImage,
  colorClass = 'bg-blue-100 text-blue-700 border-blue-200',
  size = 'md',
  className
}: ActivityIconBadgeProps) {
  // Proportional responsive sizes designed so the drawing fills 75-80% of usable space
  const sizeClasses = {
    xs: 'w-10 h-10 rounded-xl text-xs border-2 shadow-xs p-1.5',
    sm: 'w-14 h-14 sm:w-16 sm:h-16 rounded-2xl text-sm border-2 shadow-xs p-2',
    md: 'w-18 h-18 sm:w-20 sm:h-20 rounded-2xl sm:rounded-3xl text-base border-2 sm:border-3 shadow-sm p-2 sm:p-2.5',
    lg: 'w-22 h-22 sm:w-26 sm:h-26 rounded-3xl text-lg border-3 shadow-md p-2.5 sm:p-3',
    xl: 'w-28 h-28 sm:w-32 sm:h-32 rounded-3xl text-2xl border-3 sm:border-4 shadow-lg p-3 sm:p-4',
    '2xl': 'w-36 h-36 sm:w-44 sm:h-44 rounded-[2rem] sm:rounded-[2.5rem] text-3xl border-4 shadow-xl p-4 sm:p-5',
    hero: 'w-56 h-56 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-[2.8rem] sm:rounded-[3.5rem] text-4xl border-4 sm:border-8 shadow-2xl p-4 sm:p-6 md:p-8'
  };

  if (customImage) {
    return (
      <div 
        className={cn(
          "flex items-center justify-center overflow-hidden bg-white shrink-0 transition-transform relative select-none",
          sizeClasses[size],
          colorClass,
          className
        )}
      >
        <img 
          src={customImage} 
          alt="Activity custom" 
          className="w-full h-full object-contain rounded-inherit"
          referrerPolicy="no-referrer"
        />
      </div>
    );
  }

  return (
    <div 
      className={cn(
        "flex items-center justify-center shrink-0 transition-transform relative overflow-hidden select-none",
        sizeClasses[size],
        colorClass,
        className
      )}
    >
      {/* Subtle glossy tint background */}
      <div className="absolute inset-0 bg-white/25 pointer-events-none rounded-inherit" />
      
      {/* Icon fills 75-80% of the badge container */}
      <div className="relative z-10 flex items-center justify-center w-full h-full">
        <IconRenderer 
          name={icon} 
          size="100%" 
          strokeWidth={2.5} 
          className="w-full h-full max-w-full max-h-full"
        />
      </div>
    </div>
  );
}
