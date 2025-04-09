
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import QuizQuestion from '@/components/QuizQuestion';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Award, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

// Mock data for daily quiz
const mockQuestions = [
  {
    id: '1',
    question: 'Which planet is known as the Red Planet?',
    correctAnswer: 'Mars',
    explanation: 'Mars is called the Red Planet because it appears reddish in color due to iron oxide (rust) on its surface.'
  },
  {
    id: '2',
    question: 'Which element has the chemical symbol "O"?',
    correctAnswer: 'Oxygen',
    explanation: 'Oxygen is represented by the chemical symbol "O" on the periodic table.'
  },
  {
    id: '3',
    question: 'Who wrote "Romeo and Juliet"?',
    correctAnswer: 'William Shakespeare',
    explanation: 'William Shakespeare wrote the famous romantic tragedy "Romeo and Juliet" around 1594-1596.'
  }
];

const DailyQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  
  const currentQuestion = mockQuestions[currentQuestionIndex];
  const totalQuestions = mockQuestions.length;
  const progress = ((currentQuestionIndex + 1) / totalQuestions) * 100;
  
  const handleAnswer = (answer: string) => {
    const questionId = currentQuestion.id;
    const newUserAnswers = { ...userAnswers, [questionId]: answer };
    setUserAnswers(newUserAnswers);
    
    // Compare user answer with correct answer (case insensitive)
    const isCorrect = answer.toLowerCase() === currentQuestion.correctAnswer.toLowerCase();
    setCorrectAnswers({...correctAnswers, [questionId]: isCorrect});
    
    // Update score if answer is correct
    if (isCorrect) {
      setScore(prevScore => prevScore + 1);
    }
    
    // Show feedback toast
    if (isCorrect) {
      toast.success('Correct answer!', {
        description: 'Well done!',
      });
    } else {
      toast.error('Incorrect answer!', {
        description: `The correct answer was: ${currentQuestion.correctAnswer}`,
      });
    }
    
    // Wait for a moment before moving to next question
    setTimeout(() => {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      } else {
        setIsQuizCompleted(true);
      }
    }, 2000);
  };
  
  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setCorrectAnswers({});
    setIsQuizCompleted(false);
    setScore(0);
  };
  
  const viewLeaderboard = () => {
    navigate('/leaderboard');
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold font-montserrat tracking-tight">Daily Quiz</h1>
            <p className="text-gray-500">Challenge yourself with today's questions</p>
          </div>
          {!isQuizCompleted && (
            <div className="flex items-center gap-2 bg-white/80 rounded-full px-4 py-2 shadow-sm border border-gray-100">
              <span className="font-medium">Question:</span>
              <span className="text-imperial font-bold">{currentQuestionIndex + 1}</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">{totalQuestions}</span>
            </div>
          )}
        </div>
        
        {!isQuizCompleted ? (
          <div className="space-y-4">
            <Progress value={progress} className="h-2" />
            
            <GameCard title={`Question ${currentQuestionIndex + 1}`} className="max-w-3xl mx-auto">
              <QuizQuestion
                question={currentQuestion}
                timeLimit={30}
                onAnswer={handleAnswer}
                isAnswered={!!userAnswers[currentQuestion.id]}
                isCorrect={correctAnswers[currentQuestion.id]}
                userAnswer={userAnswers[currentQuestion.id]}
              />
            </GameCard>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <div className="game-card p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="h-20 w-20 rounded-full bg-imperial/10 flex items-center justify-center">
                  <Award className="h-10 w-10 text-imperial" />
                </div>
              </div>
              
              <h2 className="text-2xl font-bold mb-2">Quiz Completed!</h2>
              <p className="text-gray-600 mb-6">You've completed today's quiz challenge</p>
              
              <div className="bg-gradient-to-r from-dutch-white/30 to-cherry-blossom/10 rounded-lg p-6 mb-8">
                <div className="text-4xl font-bold text-imperial mb-2">
                  {score} / {totalQuestions}
                </div>
                <p className="text-gray-600">
                  {score === totalQuestions 
                    ? 'Perfect score! Amazing job!' 
                    : score >= totalQuestions / 2 
                      ? 'Well done! Keep practicing!' 
                      : 'Keep trying! You\'ll do better next time!'}
                </p>
              </div>
              
              {score === totalQuestions && (
                <div className="flex justify-center mb-6 animate-pulse">
                  <div className="flex items-center gap-2 bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full">
                    <Sparkles className="h-5 w-5" />
                    <span className="font-medium">Daily streak increased!</span>
                    <CheckCircle className="h-5 w-5" />
                  </div>
                </div>
              )}
              
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button onClick={resetQuiz} variant="outline">Play Again</Button>
                <Button 
                  onClick={viewLeaderboard} 
                  className="bg-imperial hover:bg-imperial/90"
                >
                  View Leaderboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

export default DailyQuiz;
