
import React from 'react';
import { cn } from '@/lib/utils';

interface PlayerAvatarProps {
  name: string;
  image?: string;
  status?: 'online' | 'offline' | 'playing';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const PlayerAvatar = ({ 
  name, 
  image, 
  status = 'offline',
  size = 'md',
  className
}: PlayerAvatarProps) => {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-12 h-12 text-sm',
    lg: 'w-16 h-16 text-lg'
  };
  
  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    playing: 'bg-yellow-500'
  };
  
  const statusSizes = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3',
    lg: 'w-4 h-4'
  };
  
  return (
    <div className="relative">
      <div 
        className={cn(
          "rounded-full flex items-center justify-center",
          sizeClasses[size],
          className,
          image ? "" : "bg-carolina-blue/20 text-yinmn-blue"
        )}
      >
        {image ? (
          <img 
            src={image} 
            alt={name} 
            className="w-full h-full rounded-full object-cover"
          />
        ) : (
          <span className="font-semibold">{initials}</span>
        )}
      </div>
      {status && (
        <div 
          className={cn(
            "absolute bottom-0 right-0 rounded-full border-2 border-white",
            statusColors[status],
            statusSizes[size]
          )}
        />
      )}
    </div>
  );
};

export default PlayerAvatar;
