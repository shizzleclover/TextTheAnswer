
import React from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from '@/lib/utils';

interface GameCardProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  className?: string;
  onClick?: () => void;
  animate?: boolean;
}

const GameCard = ({ 
  title, 
  icon, 
  children, 
  footer,
  className,
  onClick,
  animate = true
}: GameCardProps) => {
  return (
    <Card 
      className={cn(
        "game-card overflow-hidden", 
        animate && "hover:-translate-y-1 transition-transform duration-300",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
    >
      <CardHeader className="bg-gradient-to-r from-imperial/10 to-cherry-blossom/10 pb-2">
        <CardTitle className="flex items-center gap-2 text-lg font-montserrat font-semibold">
          {icon}
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-4">
        {children}
      </CardContent>
      {footer && (
        <CardFooter className="border-t border-gray-100 bg-gray-50/50 pt-3">
          {footer}
        </CardFooter>
      )}
    </Card>
  );
};

export default GameCard;
