
import React from 'react';
import { Progress } from "@/components/ui/progress";
import { Trophy, Flame, Star } from 'lucide-react';
import GameCard from './GameCard';

interface ProgressCardProps {
  title: string;
  value: number;
  total: number;
  type: 'streak' | 'score' | 'rank';
}

const ProgressCard = ({ title, value, total, type }: ProgressCardProps) => {
  const percentage = (value / total) * 100;
  
  let icon;
  let colorClass;
  
  switch (type) {
    case 'streak':
      icon = <Flame className="h-5 w-5 text-orange-500" />;
      colorClass = 'bg-orange-500';
      break;
    case 'score':
      icon = <Star className="h-5 w-5 text-yellow-500" />;
      colorClass = 'bg-yellow-500';
      break;
    case 'rank':
      icon = <Trophy className="h-5 w-5 text-imperial" />;
      colorClass = 'bg-imperial';
      break;
    default:
      icon = <Star className="h-5 w-5 text-imperial" />;
      colorClass = 'bg-imperial';
  }
  
  return (
    <GameCard 
      title={title}
      icon={icon}
      className="h-full"
    >
      <div className="flex flex-col gap-2">
        <div className="text-3xl font-bold font-montserrat">
          {value}
          <span className="text-base text-gray-500 font-normal">/{total}</span>
        </div>
        <Progress
          value={percentage} 
          className={`h-2 ${colorClass}`}
        />
      </div>
    </GameCard>
  );
};

export default ProgressCard;
