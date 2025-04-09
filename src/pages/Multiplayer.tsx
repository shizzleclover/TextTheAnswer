
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger
} from '@/components/ui/tabs';
import MainLayout from '@/layouts/MainLayout';
import GameCard from '@/components/GameCard';
import PlayerAvatar from '@/components/PlayerAvatar';
import { 
  Users, 
  Plus, 
  Search,
  Copy, 
  Settings, 
  Trophy,
  RefreshCw,
  LogIn,
  Clock,
  Video,
  Calendar,
  Brain
} from 'lucide-react';
import { toast } from 'sonner';

// Mock data for active lobbies
const mockLobbies = [
  { 
    id: 'lobby-1', 
    name: 'Trivia Masters',
    host: 'EmmaTriviaQueen',
    players: 3,
    maxPlayers: 6,
    category: 'General Knowledge',
    isPrivate: false,
    difficulty: 'Medium'
  },
  { 
    id: 'lobby-2', 
    name: 'Science Wizards',
    host: 'PhysicsGuru',
    players: 2,
    maxPlayers: 4,
    category: 'Science',
    isPrivate: false,
    difficulty: 'Hard'
  },
  { 
    id: 'lobby-3', 
    name: 'History Buffs',
    host: 'HistoryProfessor',
    players: 5,
    maxPlayers: 8,
    category: 'History',
    isPrivate: false,
    difficulty: 'Easy'
  },
  { 
    id: 'lobby-4', 
    name: 'Movie Night Quiz',
    host: 'CinemaExpert',
    players: 4,
    maxPlayers: 6,
    category: 'Movies',
    isPrivate: false,
    difficulty: 'Medium'
  },
  { 
    id: 'lobby-5', 
    name: 'Sports Champions',
    host: 'SportsBuffGuy',
    players: 2,
    maxPlayers: 6,
    category: 'Sports',
    isPrivate: false,
    difficulty: 'Medium'
  }
];

const Multiplayer = () => {
  const [activeTab, setActiveTab] = useState('join');
  const [lobbyCode, setLobbyCode] = useState('');
  
  const handleCreateLobby = () => {
    toast.loading('Creating lobby...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Lobby created!');
    }, 1000);
  };
  
  const handleJoinWithCode = () => {
    if (!lobbyCode.trim()) {
      toast.error('Please enter a lobby code');
      return;
    }
    
    toast.loading(`Joining lobby ${lobbyCode}...`);
    
    setTimeout(() => {
      toast.dismiss();
      if (lobbyCode === 'QUIZ123') {
        toast.success('Joined lobby successfully!');
      } else {
        toast.error('Invalid lobby code');
      }
    }, 1000);
  };
  
  const handleJoinLobby = (lobbyId: string) => {
    toast.loading(`Joining lobby...`);
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Joined lobby successfully!');
    }, 1000);
  };
  
  const handleCopyLobbyCode = () => {
    navigator.clipboard.writeText('QUIZ123');
    toast.success('Lobby code copied to clipboard!');
  };
  
  const handleRefreshLobbies = () => {
    toast.loading('Refreshing lobbies...');
    
    setTimeout(() => {
      toast.dismiss();
      toast.success('Lobbies refreshed!');
    }, 1000);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold font-montserrat tracking-tight">Multiplayer Quiz</h1>
          <p className="text-gray-500">Challenge your friends or join public lobbies</p>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="join">Join Game</TabsTrigger>
            <TabsTrigger value="create">Create Game</TabsTrigger>
          </TabsList>
          
          <TabsContent value="join" className="space-y-6">
            {/* Join with Code */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
              <h2 className="text-lg font-semibold mb-4">Join with Code</h2>
              <div className="flex gap-2">
                <Input
                  placeholder="Enter lobby code (e.g. QUIZ123)"
                  value={lobbyCode}
                  onChange={(e) => setLobbyCode(e.target.value)}
                />
                <Button onClick={handleJoinWithCode} className="bg-imperial whitespace-nowrap">
                  <LogIn className="mr-2 h-4 w-4" />
                  Join
                </Button>
              </div>
            </div>
            
            {/* Browse Public Lobbies */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Public Lobbies</h2>
                <Button variant="outline" size="sm" onClick={handleRefreshLobbies}>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Refresh
                </Button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {mockLobbies.map((lobby) => (
                  <GameCard 
                    key={lobby.id}
                    title={lobby.name}
                    icon={<Users className="h-5 w-5 text-carolina-blue" />}
                    className="game-card-hover"
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <PlayerAvatar name={lobby.host} size="sm" />
                        <span className="text-sm font-medium">{lobby.host}</span>
                      </div>
                      
                      <div className="grid grid-cols-2 text-sm gap-y-2">
                        <div className="flex items-center gap-1">
                          <Users className="h-4 w-4 text-gray-500" />
                          <span>{`${lobby.players}/${lobby.maxPlayers} players`}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Brain className="h-4 w-4 text-gray-500" />
                          <span>{lobby.category}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Trophy className="h-4 w-4 text-gray-500" />
                          <span>{lobby.difficulty}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span>Starting soon</span>
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full bg-carolina-blue hover:bg-carolina-blue/90"
                        onClick={() => handleJoinLobby(lobby.id)}
                      >
                        Join Lobby
                      </Button>
                    </div>
                  </GameCard>
                ))}
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="create" className="space-y-6">
            <GameCard 
              title="Create New Lobby"
              icon={<Settings className="h-5 w-5 text-imperial" />}
            >
              <div className="space-y-6">
                <div className="grid gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Lobby Name</label>
                    <Input placeholder="My Awesome Quiz" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                      <option value="general">General Knowledge</option>
                      <option value="science">Science</option>
                      <option value="history">History</option>
                      <option value="geography">Geography</option>
                      <option value="entertainment">Entertainment</option>
                      <option value="sports">Sports</option>
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Max Players</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="2">2 players</option>
                        <option value="4">4 players</option>
                        <option value="6">6 players</option>
                        <option value="8">8 players</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-1">Difficulty</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md">
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="private-lobby" className="h-4 w-4 text-imperial" />
                    <label htmlFor="private-lobby" className="text-sm">Make lobby private (invite only)</label>
                  </div>
                </div>
                
                <div className="flex flex-col gap-4">
                  <Button onClick={handleCreateLobby} className="bg-imperial">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Lobby
                  </Button>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-md p-3 flex justify-between items-center">
                    <div className="text-sm">
                      <div className="text-gray-500">Your lobby code:</div>
                      <div className="font-mono font-medium">QUIZ123</div>
                    </div>
                    <Button variant="outline" size="sm" onClick={handleCopyLobbyCode}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </GameCard>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Multiplayer;
