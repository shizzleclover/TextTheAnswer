
import React, { useState, useEffect } from 'react';
import MainLayout from '@/layouts/MainLayout';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { quizService, LeaderboardEntry } from '@/services/quizService';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';

const LeaderBoard = () => {
  const [activeTab, setActiveTab] = useState<string>('daily');
  const [dailyLeaderboard, setDailyLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await quizService.getDailyLeaderboard();
        
        if (response.error) {
          setError(response.error);
          toast.error('Failed to load leaderboard', {
            description: response.error
          });
        } else if (response.data) {
          setDailyLeaderboard(response.data);
        }
      } catch (err) {
        setError('Failed to load leaderboard data');
        toast.error('Error', {
          description: 'Failed to load leaderboard data'
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    if (activeTab === 'daily') {
      fetchLeaderboard();
    }
  }, [activeTab]);
  
  // Mock data for multiplayer leaderboard since we don't have an endpoint for it yet
  const mockMultiplayerLeaderboard = [
    { rank: 1, name: "James Johnson", score: 1250 },
    { rank: 2, name: "Olivia Smith", score: 1100 },
    { rank: 3, name: "William Williams", score: 950 },
    { rank: 4, name: "Ava Brown", score: 900 },
    { rank: 5, name: "Benjamin Jones", score: 850 },
    { rank: 6, name: "Mia Davis", score: 800 },
    { rank: 7, name: "Mason Wilson", score: 750 },
    { rank: 8, name: "Isabella Taylor", score: 700 },
    { rank: 9, name: "Ethan Moore", score: 650 },
    { rank: 10, name: "Sofia Anderson", score: 600 },
  ];
  
  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-montserrat tracking-tight">Leaderboards</h1>
          <p className="text-gray-500">See where you rank among other players</p>
        </div>
        
        <Tabs defaultValue="daily" onValueChange={setActiveTab} value={activeTab}>
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="daily">Daily Quiz</TabsTrigger>
            <TabsTrigger value="multiplayer">Multiplayer</TabsTrigger>
          </TabsList>
          
          <div className="mt-6">
            <TabsContent value="daily" className="space-y-6">
              <div className="bg-gradient-to-r from-white/80 to-cherry-blossom/10 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Daily Quiz Challenge</h2>
                <p className="text-gray-600">Today's top performers based on quiz scores and streaks.</p>
              </div>
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-imperial" />
                </div>
              ) : error ? (
                <div className="text-center py-12">
                  <p className="text-red-500 mb-2">Failed to load leaderboard data</p>
                  <button 
                    onClick={() => setActiveTab('daily')} 
                    className="text-imperial underline"
                  >
                    Try again
                  </button>
                </div>
              ) : (
                <LeaderboardTable entries={dailyLeaderboard} type="daily" />
              )}
            </TabsContent>
            
            <TabsContent value="multiplayer" className="space-y-6">
              <div className="bg-gradient-to-r from-white/80 to-carolina-blue/10 p-6 rounded-xl border border-gray-100 shadow-sm">
                <h2 className="text-xl font-semibold mb-2">Multiplayer Rankings</h2>
                <p className="text-gray-600">Overall rankings based on multiplayer game performance.</p>
              </div>
              
              <LeaderboardTable entries={mockMultiplayerLeaderboard} type="multiplayer" />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default LeaderBoard;
