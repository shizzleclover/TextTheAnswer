
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CheckCircle, XCircle, HelpCircle, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  explanation?: string;
}

interface QuizQuestionProps {
  question: QuizQuestion;
  timeLimit?: number; // in seconds
  onAnswer: (answer: string) => void;
  isAnswered: boolean;
  isCorrect?: boolean;
  userAnswer?: string;
}

const QuizQuestion = ({ 
  question, 
  timeLimit,
  onAnswer,
  isAnswered,
  isCorrect,
  userAnswer
}: QuizQuestionProps) => {
  const [timeRemaining, setTimeRemaining] = useState<number | null>(timeLimit || null);
  const [inputValue, setInputValue] = useState('');
  
  useEffect(() => {
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
  
  useEffect(() => {
    if (timeRemaining === 0) {
      onAnswer('');
    }
  }, [timeRemaining, onAnswer]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isAnswered && inputValue.trim()) {
      onAnswer(inputValue.trim());
    }
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
      
      <div className="text-xl font-medium font-montserrat">{question.question}</div>
      
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className={cn(
          "flex flex-col gap-2",
          isAnswered && "opacity-60"
        )}>
          <Input
            type="text"
            placeholder="Type your answer here..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            disabled={isAnswered}
            className={cn(
              isAnswered && isCorrect && "border-green-500 bg-green-50",
              isAnswered && !isCorrect && "border-red-500 bg-red-50"
            )}
          />
          <Button 
            type="submit" 
            disabled={isAnswered || !inputValue.trim()}
            className="bg-imperial hover:bg-imperial/90"
          >
            Submit Answer
          </Button>
        </div>
      </form>
      
      {isAnswered && (
        <div className={cn(
          "flex items-center gap-3 p-3 rounded-md",
          isCorrect ? "bg-green-50 border border-green-200" : "bg-red-50 border border-red-200"
        )}>
          {isCorrect ? (
            <CheckCircle className="w-6 h-6 text-green-500 shrink-0" />
          ) : (
            <XCircle className="w-6 h-6 text-red-500 shrink-0" />
          )}
          <div>
            {isCorrect ? (
              <p className="font-medium">Correct answer!</p>
            ) : (
              <div>
                <p className="font-medium">Incorrect answer!</p>
                <p className="text-sm">The correct answer was: <span className="font-semibold">{question.correctAnswer}</span></p>
              </div>
            )}
          </div>
        </div>
      )}
      
      {isAnswered && question.explanation && (
        <div className="mt-4 bg-dutch-white/50 border border-dutch-white rounded-lg p-4">
          <div className="flex items-start gap-2">
            <HelpCircle className="w-5 h-5 text-imperial shrink-0 mt-0.5" />
            <div>
              <h4 className="font-semibold mb-1">Explanation</h4>
              <p className="text-sm">{question.explanation}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
