
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/layouts/MainLayout';
import GameCard from '@/components/GameCard';
import ProgressCard from '@/components/ProgressCard';
import { Calendar, Users, Trophy, Brain, Clock, CheckCircle } from 'lucide-react';
import { toast } from 'sonner';

const Dashboard = () => {
  const handleSubscribe = () => {
    toast.loading('Preparing subscription options...');
    
    setTimeout(() => {
      toast.dismiss();
      toast('Subscribe to Premium', {
        description: 'Unlock all features and remove ads!',
        action: {
          label: 'View Plans',
          onClick: () => console.log('View plans clicked'),
        },
      });
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-8">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold font-montserrat tracking-tight">Welcome back, Player!</h1>
          <p className="text-gray-500">Here's your quiz journey overview</p>
        </div>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ProgressCard 
            title="Daily Quiz Streak" 
            value={7} 
            total={30} 
            type="streak" 
          />
          <ProgressCard 
            title="Total Score" 
            value={1250} 
            total={5000} 
            type="score" 
          />
          <ProgressCard 
            title="Leaderboard Rank" 
            value={42} 
            total={500} 
            type="rank" 
          />
        </div>
        
        {/* Main Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link to="/daily-quiz">
            <GameCard 
              title="Daily Quiz"
              icon={<Calendar className="h-5 w-5 text-imperial" />}
              footer={
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-gray-500">Today's challenge awaits</div>
                  <Button size="sm" className="bg-imperial">Start Quiz</Button>
                </div>
              }
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-imperial/10 to-cherry-blossom/20 flex items-center justify-center">
                    <Brain className="h-8 w-8 text-imperial" />
                  </div>
                  <div>
                    <h3 className="font-semibold">New questions every day</h3>
                    <p className="text-sm text-gray-600">Test your knowledge with daily challenges</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-imperial" />
                    <span>10 questions</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-imperial" />
                    <span>Earn streaks</span>
                  </div>
                </div>
              </div>
            </GameCard>
          </Link>
          
          <Link to="/multiplayer">
            <GameCard 
              title="Multiplayer Quiz"
              icon={<Users className="h-5 w-5 text-yinmn-blue" />}
              footer={
                <div className="flex items-center justify-between w-full">
                  <div className="text-sm text-gray-500">36 active players</div>
                  <Button size="sm" className="bg-yinmn-blue hover:bg-yinmn-blue/90">Join Game</Button>
                </div>
              }
            >
              <div className="flex flex-col gap-3">
                <div className="flex gap-3">
                  <div className="h-16 w-16 rounded-lg bg-gradient-to-br from-carolina-blue/10 to-yinmn-blue/20 flex items-center justify-center">
                    <Users className="h-8 w-8 text-yinmn-blue" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Challenge your friends</h3>
                    <p className="text-sm text-gray-600">Compete in real-time multiplayer quizzes</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-yinmn-blue" />
                    <span>Real-time play</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Trophy className="h-4 w-4 text-yinmn-blue" />
                    <span>Win rewards</span>
                  </div>
                </div>
              </div>
            </GameCard>
          </Link>
        </div>
        
        {/* Premium Banner */}
        <div className="rounded-xl bg-gradient-to-r from-imperial/90 to-cherry-blossom p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h3 className="text-xl font-bold mb-2">Upgrade to Premium</h3>
              <p className="text-white/90">Get unlimited access to all quizzes and remove ads.</p>
            </div>
            <Button onClick={handleSubscribe} variant="secondary" size="lg" className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
