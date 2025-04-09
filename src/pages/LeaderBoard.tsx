
import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import LeaderboardTable from '@/components/LeaderboardTable';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Mock data
const mockDailyLeaderboard = [
  { rank: 1, name: "Emma Johnson", score: 100, streak: 15 },
  { rank: 2, name: "Oliver Smith", score: 95, streak: 12 },
  { rank: 3, name: "Noah Williams", score: 90, streak: 20 },
  { rank: 4, name: "Charlotte Brown", score: 85, streak: 7 },
  { rank: 5, name: "Elijah Jones", score: 80, streak: 10 },
  { rank: 6, name: "Amelia Davis", score: 75, streak: 5 },
  { rank: 7, name: "Liam Wilson", score: 70, streak: 3 },
  { rank: 8, name: "Sophia Taylor", score: 65, streak: 8 },
  { rank: 9, name: "Lucas Moore", score: 60, streak: 2 },
  { rank: 10, name: "Isabella Anderson", score: 55, streak: 1 },
];

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

const Leaderboard = () => {
  const [activeTab, setActiveTab] = useState<string>('daily');
  
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
              
              <LeaderboardTable entries={mockDailyLeaderboard} type="daily" />
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

export default Leaderboard;
