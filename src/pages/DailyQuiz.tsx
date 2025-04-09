
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import QuizQuestion from '@/components/QuizQuestion';
import GameCard from '@/components/GameCard';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ArrowRight, Award, CheckCircle, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
import { quizService, QuizQuestion as QuizQuestionType } from '@/services/quizService';

const DailyQuiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<QuizQuestionType[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchQuizQuestions = async () => {
      setIsLoading(true);
      try {
        const response = await quizService.getDailyQuiz();
        
        if (response.error) {
          setError(response.error);
          toast.error('Failed to load quiz', {
            description: response.error
          });
        } else if (response.data) {
          setQuestions(response.data);
        }
      } catch (err) {
        setError('Failed to load quiz questions');
        toast.error('Error', {
          description: 'Failed to load quiz questions'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchQuizQuestions();
  }, []);
  
  const currentQuestion = questions[currentQuestionIndex];
  const totalQuestions = questions.length;
  const progress = totalQuestions > 0 ? ((currentQuestionIndex + 1) / totalQuestions) * 100 : 0;
  
  const handleAnswer = async (answer: string) => {
    if (!currentQuestion) return;
    
    const questionId = currentQuestion.id;
    const newUserAnswers = { ...userAnswers, [questionId]: answer };
    setUserAnswers(newUserAnswers);
    
    try {
      const response = await quizService.submitAnswer({
        questionId,
        answer
      });
      
      if (response.error) {
        toast.error('Error submitting answer', {
          description: response.error
        });
        return;
      }
      
      const isCorrect = response.data?.correct || false;
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
          description: `The correct answer was: ${response.data?.correctAnswer || currentQuestion.correctAnswer}`,
        });
      }
      
      // Wait for a moment before moving to next question
      setTimeout(() => {
        if (currentQuestionIndex < totalQuestions - 1) {
          setCurrentQuestionIndex(prevIndex => prevIndex + 1);
        } else {
          setIsQuizCompleted(true);
          
          // In a real app, we'd submit all answers here for final score
          // quizService.submitQuiz(Object.entries(newUserAnswers).map(([id, answer]) => ({ 
          //   questionId: id, answer 
          // })));
        }
      }, 2000);
      
    } catch (err) {
      toast.error('Failed to submit answer');
    }
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

  // Show loading state
  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-3xl font-bold font-montserrat tracking-tight mb-4">Daily Quiz</h1>
          <p className="text-gray-500 mb-6">Loading today's questions...</p>
          <div className="w-full max-w-md">
            <Progress value={100} className="h-2" />
          </div>
        </div>
      </MainLayout>
    );
  }

  // Show error state
  if (error || questions.length === 0) {
    return (
      <MainLayout>
        <div className="flex flex-col items-center justify-center py-12">
          <h1 className="text-3xl font-bold font-montserrat tracking-tight mb-4">Daily Quiz</h1>
          <p className="text-red-500 mb-6">Failed to load today's quiz questions</p>
          <Button onClick={() => window.location.reload()} className="bg-imperial">Try Again</Button>
        </div>
      </MainLayout>
    );
  }

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
              {currentQuestion && (
                <QuizQuestion
                  question={currentQuestion}
                  timeLimit={30}
                  onAnswer={handleAnswer}
                  isAnswered={!!userAnswers[currentQuestion.id]}
                  isCorrect={correctAnswers[currentQuestion.id]}
                  userAnswer={userAnswers[currentQuestion.id]}
                />
              )}
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
