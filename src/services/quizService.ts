
import { mockQuestions, mockLeaderboard, mockLobbies, mockUserStats } from './mockData';

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
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
  getDailyQuiz: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
    return { data: mockQuestions };
  },

  submitAnswer: async (submission: QuizSubmission) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    const question = mockQuestions.find(q => q.id === submission.questionId);
    const correct = question?.correctAnswer === submission.answer;
    return {
      data: {
        correct,
        correctAnswer: question?.correctAnswer || '',
        explanation: question?.explanation
      }
    };
  },

  submitQuiz: async (submissions: QuizSubmission[]) => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    const correctAnswers = submissions.filter(sub => {
      const question = mockQuestions.find(q => q.id === sub.questionId);
      return question?.correctAnswer === sub.answer;
    });

    return {
      data: {
        correct: correctAnswers.length === submissions.length,
        score: correctAnswers.length * 100,
        totalQuestions: submissions.length,
        streakIncreased: correctAnswers.length >= submissions.length * 0.7
      }
    };
  },

  getDailyLeaderboard: async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { data: mockLeaderboard };
  },

  getLobbies: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { data: mockLobbies };
  },

  getUserStats: async () => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { data: mockUserStats };
  }
};
