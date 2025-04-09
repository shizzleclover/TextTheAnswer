
import React from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Award, Trophy, Medal } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  avatar?: string;
  name: string;
  score: number;
  streak?: number;
}

interface LeaderboardTableProps {
  entries: LeaderboardEntry[];
  type?: 'daily' | 'multiplayer';
}

const LeaderboardTable = ({ entries, type = 'daily' }: LeaderboardTableProps) => {
  
  const getRankIcon = (rank: number) => {
    if (rank === 1) {
      return <Trophy className="h-5 w-5 text-yellow-500" />;
    } else if (rank === 2) {
      return <Medal className="h-5 w-5 text-gray-400" />;
    } else if (rank === 3) {
      return <Medal className="h-5 w-5 text-amber-700" />;
    }
    return <span className="font-bold text-gray-600">{rank}</span>;
  };
  
  return (
    <div className="rounded-lg border overflow-hidden bg-white/70 backdrop-blur-sm shadow">
      <Table>
        <TableHeader className="bg-gradient-to-r from-imperial/5 to-cherry-blossom/5">
          <TableRow>
            <TableHead className="w-12">Rank</TableHead>
            <TableHead>Player</TableHead>
            <TableHead className="text-right">Score</TableHead>
            {type === 'daily' && (
              <TableHead className="text-right">Streak</TableHead>
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {entries.map((entry) => (
            <TableRow 
              key={entry.rank}
              className={entry.rank <= 3 ? "bg-gradient-to-r from-yellow-50/80 to-transparent" : ""}
            >
              <TableCell className="font-medium">
                <div className="flex items-center justify-center">
                  {getRankIcon(entry.rank)}
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  {entry.avatar ? (
                    <div className="h-8 w-8 rounded-full bg-gray-200 overflow-hidden">
                      <img src={entry.avatar} alt={entry.name} className="h-full w-full object-cover" />
                    </div>
                  ) : (
                    <div className="h-8 w-8 rounded-full bg-imperial/10 flex items-center justify-center text-imperial font-medium">
                      {entry.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <span>{entry.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right font-semibold">{entry.score}</TableCell>
              {type === 'daily' && (
                <TableCell className="text-right">
                  {entry.streak ? (
                    <div className="flex items-center justify-end gap-1">
                      {entry.streak}
                      <Flame className="h-4 w-4 text-orange-500" />
                    </div>
                  ) : (
                    "-"
                  )}
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
