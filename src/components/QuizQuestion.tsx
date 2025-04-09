
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, HelpCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestionProps {
  question: string;
  options: QuizOption[];
  explanation?: string;
  timeLimit?: number; // in seconds
  onAnswer: (optionId: string) => void;
  isAnswered: boolean;
  correctOptionId?: string;
  selectedOptionId?: string;
}

const QuizQuestion = ({ 
  question, 
  options,
  explanation,
  timeLimit,
  onAnswer,
  isAnswered,
  correctOptionId,
  selectedOptionId
}: QuizQuestionProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeLimit || null);
  
  React.useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    
    if (timeLimit && !isAnswered) {
      timer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timer as NodeJS.Timeout);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [timeLimit, isAnswered]);
  
  React.useEffect(() => {
    if (timeRemaining === 0) {
      onAnswer('');
    }
  }, [timeRemaining, onAnswer]);

  const getOptionStateStyles = (optionId: string) => {
    if (!isAnswered) return '';
    
    if (optionId === correctOptionId) {
      return 'border-green-500 bg-green-50';
    }
    
    if (optionId === selectedOptionId && optionId !== correctOptionId) {
      return 'border-red-500 bg-red-50';
    }
    
    return 'opacity-60';
  };
  
  const getOptionIcon = (optionId: string) => {
    if (!isAnswered) return null;
    
    if (optionId === correctOptionId) {
      return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
    
    if (optionId === selectedOptionId && optionId !== correctOptionId) {
      return <XCircle className="w-5 h-5 text-red-500" />;
    }
    
    return null;
  };
  
  return (
    <div className="flex flex-col gap-6">
      {timeLimit && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-imperial" />
            <span className="font-medium">Time Remaining:</span>
          </div>
          <div className="text-lg font-semibold">
            {timeRemaining !== null ? `${timeRemaining}s` : 'N/A'}
          </div>
        </div>
      )}
      
      <div className="text-xl font-medium font-montserrat">{question}</div>
      
      <div className="flex flex-col gap-3">
        {options.map((option) => (
          <button 
            key={option.id}
            className={cn(
              "quiz-option flex justify-between items-center",
              getOptionStateStyles(option.id),
              !isAnswered && "hover:bg-imperial/5"
            )}
            onClick={() => !isAnswered && onAnswer(option.id)}
            disabled={isAnswered}
          >
            <span>{option.text}</span>
            {getOptionIcon(option.id)}
          </button>
        ))}
      </div>
      
      {isAnswered && explanation && (
        <div className="mt-4 bg-dutch-white/50 border border-dutch-white rounded-lg p-4">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-5 h-5 text-imperial shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Explanation</h4>
              <p className="text-sm">{explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
