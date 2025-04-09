
import React from 'react';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import GameCard from '@/components/GameCard';
import PlayerAvatar from '@/components/PlayerAvatar';
import { 
  Settings, 
  Trophy, 
  Medal, 
  Star, 
  Calendar, 
  Users, 
  Clock, 
  Shield,
  Check,
  X,
  Award,
  Brain
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';

const mockAchievements = [
  {
    id: '1',
    name: 'Quiz Master',
    description: 'Complete 50 daily quizzes',
    progress: 65,
    isCompleted: true,
    icon: <Award className="h-6 w-6" />
  },
  {
    id: '2',
    name: 'Perfect Streak',
    description: 'Achieve a 14-day streak',
    progress: 70,
    isCompleted: true,
    icon: <Calendar className="h-6 w-6" />
  },
  {
    id: '3',
    name: 'Multiplayer Champion',
    description: 'Win 25 multiplayer games',
    progress: 40,
    isCompleted: false,
    icon: <Trophy className="h-6 w-6" />
  },
  {
    id: '4',
    name: 'Knowledge Seeker',
    description: 'Answer 1000 questions correctly',
    progress: 30,
    isCompleted: false,
    icon: <Brain className="h-6 w-6" />
  }
];

// Mock stats data
const mockStats = {
  dailyQuizzes: 32,
  correctAnswers: 287,
  totalAnswers: 320,
  winRate: 68,
  multiplayerGames: 15,
  bestStreak: 12
};

const Profile = () => {
  const { toast } = useToast();
  
  const handleEditProfile = () => {
    toast({
      title: 'Edit Profile',
      description: 'Profile editing is not available in the demo.',
    });
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row justify-between gap-6">
          <div className="flex items-center gap-4">
            <PlayerAvatar name="John Doe" size="lg" status="online" />
            
            <div>
              <h1 className="text-3xl font-bold font-montserrat tracking-tight">John Doe</h1>
              <div className="flex items-center gap-2 text-gray-500">
                <span>@johndoe</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <Trophy className="h-4 w-4 text-yellow-500" />
                  <span>Level 7</span>
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3">
            <Button variant="outline" className="flex gap-2" onClick={handleEditProfile}>
              <Settings className="h-4 w-4" />
              Edit Profile
            </Button>
            <Button className="bg-imperial hover:bg-imperial/90">
              Premium Member
            </Button>
          </div>
        </div>
        
        {/* User Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <GameCard 
            title="Daily Quiz Stats"
            icon={<Calendar className="h-5 w-5 text-imperial" />}
            className="h-full"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Quizzes Taken</div>
                  <div className="text-2xl font-semibold">{mockStats.dailyQuizzes}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Best Streak</div>
                  <div className="text-2xl font-semibold">{mockStats.bestStreak} days</div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Accuracy</span>
                  <span className="font-medium">{Math.round((mockStats.correctAnswers / mockStats.totalAnswers) * 100)}%</span>
                </div>
                <Progress value={(mockStats.correctAnswers / mockStats.totalAnswers) * 100} className="h-2" />
              </div>
            </div>
          </GameCard>
          
          <GameCard 
            title="Multiplayer Stats"
            icon={<Users className="h-5 w-5 text-carolina-blue" />}
            className="h-full"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-500">Games Played</div>
                  <div className="text-2xl font-semibold">{mockStats.multiplayerGames}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500">Win Rate</div>
                  <div className="text-2xl font-semibold">{mockStats.winRate}%</div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Win Rate</span>
                  <span className="font-medium">{mockStats.winRate}%</span>
                </div>
                <Progress value={mockStats.winRate} className="h-2" />
              </div>
            </div>
          </GameCard>
          
          <GameCard 
            title="Overall Rank"
            icon={<Medal className="h-5 w-5 text-yellow-500" />}
            className="h-full"
          >
            <div className="flex flex-col items-center py-4">
              <div className="text-5xl font-bold text-yinmn-blue mb-2">#42</div>
              <div className="text-gray-600">Among all players</div>
              
              <div className="mt-4 w-full bg-gray-100 rounded-full h-1.5">
                <div className="bg-yinmn-blue h-1.5 rounded-full w-3/4"></div>
              </div>
              <div className="text-xs text-gray-500 mt-1">Top 25%</div>
            </div>
          </GameCard>
        </div>
        
        {/* Achievements */}
        <div>
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            Achievements
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {mockAchievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`bg-white border rounded-xl p-4 flex gap-4 ${
                  achievement.isCompleted 
                    ? 'border-yellow-200 bg-yellow-50/50' 
                    : 'border-gray-200'
                }`}
              >
                <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                  achievement.isCompleted
                    ? 'bg-yellow-100 text-yellow-600' 
                    : 'bg-gray-100 text-gray-500'
                }`}>
                  {achievement.icon}
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{achievement.name}</h3>
                    {achievement.isCompleted && (
                      <div className="bg-yellow-500/10 text-yellow-600 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                        <Check className="h-3 w-3" />
                        <span>Completed</span>
                      </div>
                    )}
                  </div>
                  
                  <p className="text-sm text-gray-600 mb-2">{achievement.description}</p>
                  
                  <div>
                    <div className="flex justify-between text-xs mb-1">
                      <span>Progress</span>
                      <span>{achievement.progress}%</span>
                    </div>
                    <Progress 
                      value={achievement.progress} 
                      className="h-1.5" 
                      indicatorClassName={achievement.isCompleted ? "bg-yellow-500" : undefined}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
