
import React from 'react';
import { useGameContext } from '@/context/GameContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Leaderboard: React.FC = () => {
  const { players, resetGame } = useGameContext();

  // Format time for display (mm:ss.ms)
  const formatTime = (time: number) => {
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="w-full max-w-3xl mx-auto bg-card border-primary">
      <CardHeader className="pb-2">
        <CardTitle className="text-center font-game text-primary">Leaderboard</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md overflow-hidden">
          <table className="w-full border-collapse">
            <thead className="bg-muted">
              <tr>
                <th className="px-4 py-2 text-left font-game text-sm">#</th>
                <th className="px-4 py-2 text-left font-game text-sm">Player</th>
                <th className="px-4 py-2 text-left font-game text-sm">Time</th>
                <th className="px-4 py-2 text-left font-game text-sm">Errors</th>
              </tr>
            </thead>
            <tbody>
              {players.length > 0 ? (
                players.map((player, index) => (
                  <tr 
                    key={`${player.name}-${index}`} 
                    className={
                      index === 0 
                        ? "bg-accent bg-opacity-20" 
                        : index % 2 === 0 
                          ? "bg-muted bg-opacity-10" 
                          : ""
                    }
                  >
                    <td className="px-4 py-2 font-game text-xs">
                      {index + 1}
                    </td>
                    <td className="px-4 py-2 font-game text-xs">
                      {player.name}
                    </td>
                    <td className="px-4 py-2 font-game text-xs">
                      {formatTime(player.time)}
                    </td>
                    <td className="px-4 py-2 font-game text-xs">
                      {player.errors}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-4 py-4 text-center font-game text-sm">
                    No players yet. Be the first!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        <div className="mt-6 flex justify-center">
          <Button 
            onClick={resetGame}
            variant="default" 
            className="font-game bg-primary text-primary-foreground hover:bg-primary/80"
          >
            Play Again
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Leaderboard;
