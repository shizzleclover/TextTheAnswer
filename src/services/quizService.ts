
import { apiRequest } from './api';

export interface QuizQuestion {
  id: string;
  question: string;
  correctAnswer: string;
  explanation?: string;
}

export interface QuizSubmission {
  questionId: string;
  answer: string;
}

export interface QuizResult {
  correct: boolean;
  score: number;
  totalQuestions: number;
  streakIncreased?: boolean;
}

export interface LeaderboardEntry {
  rank: number;
  name: string;
  score: number;
  streak?: number;
}

export const quizService = {
  // Get daily quiz questions
  getDailyQuiz: async () => {
    return await apiRequest<QuizQuestion[]>('/quiz/daily');
  },
  
  // Submit answer for daily quiz
  submitAnswer: async (submission: QuizSubmission) => {
    return await apiRequest<{
      correct: boolean;
      correctAnswer: string;
    }>('/quiz/daily/submit', 'POST', submission);
  },
  
  // Submit complete quiz
  submitQuiz: async (submissions: QuizSubmission[]) => {
    return await apiRequest<QuizResult>('/quiz/daily/submit', 'POST', { submissions });
  },
  
  // Get daily quiz leaderboard
  getDailyLeaderboard: async () => {
    return await apiRequest<LeaderboardEntry[]>('/quiz/daily/leaderboard');
  }
};
