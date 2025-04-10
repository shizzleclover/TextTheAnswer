
// Mock Questions
export const mockQuestions = [
  {
    id: '1',
    question: 'What is the capital of France?',
    options: ['London', 'Berlin', 'Paris', 'Madrid'],
    correctAnswer: 'Paris',
    explanation: 'Paris has been the capital of France since 508 CE.'
  },
  {
    id: '2',
    question: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    explanation: 'Mars appears reddish due to iron oxide (rust) on its surface.'
  },
  {
    id: '3',
    question: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Leonardo da Vinci', 'Pablo Picasso', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci',
    explanation: 'The Mona Lisa was painted by Leonardo da Vinci between 1503-1519.'
  },
  {
    id: '4',
    question: 'What is the largest ocean on Earth?',
    options: ['Atlantic Ocean', 'Indian Ocean', 'Pacific Ocean', 'Arctic Ocean'],
    correctAnswer: 'Pacific Ocean',
    explanation: 'The Pacific Ocean is the largest and deepest ocean on Earth.'
  },
  {
    id: '5',
    question: 'Which element has the chemical symbol Au?',
    options: ['Silver', 'Gold', 'Copper', 'Aluminum'],
    correctAnswer: 'Gold',
    explanation: 'Au comes from the Latin word for gold, "aurum".'
  }
];

// Mock Leaderboard Data
export const mockLeaderboard = [
  { rank: 1, name: "Emma Watson", score: 980, streak: 12 },
  { rank: 2, name: "James Smith", score: 920, streak: 8 },
  { rank: 3, name: "Olivia Brown", score: 850, streak: 6 },
  { rank: 4, name: "William Davis", score: 780, streak: 5 },
  { rank: 5, name: "Sophia Wilson", score: 750, streak: 4 },
  { rank: 6, name: "Lucas Moore", score: 720, streak: 3 },
  { rank: 7, name: "Isabella Taylor", score: 690, streak: 3 },
  { rank: 8, name: "Mason Anderson", score: 650, streak: 2 },
  { rank: 9, name: "Ava Thomas", score: 620, streak: 2 },
  { rank: 10, name: "Noah White", score: 600, streak: 1 }
];

// Mock Lobbies
export const mockLobbies = {
  public: [
    {
      id: 'pub-1',
      name: 'Trivia Masters',
      host: 'Emma123',
      players: 3,
      maxPlayers: 6,
      category: 'General Knowledge',
      difficulty: 'Medium',
      status: 'waiting'
    },
    {
      id: 'pub-2',
      name: 'Science Quiz',
      host: 'DrBrain',
      players: 4,
      maxPlayers: 8,
      category: 'Science',
      difficulty: 'Hard',
      status: 'in-progress'
    }
  ],
  private: [
    {
      id: 'priv-1',
      name: 'Friends Only',
      host: 'John_D',
      players: 2,
      maxPlayers: 4,
      category: 'Mixed',
      difficulty: 'Easy',
      code: 'QUIZ123'
    }
  ]
};

// Mock User Stats
export const mockUserStats = {
  dailyStreak: 5,
  totalScore: 1250,
  gamesPlayed: 15,
  accuracy: 78,
  rank: 42,
  level: 7
};
