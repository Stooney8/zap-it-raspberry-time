
import React, { useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/GameContext';
import Leaderboard from './Leaderboard';

const GameResults: React.FC = () => {
  const { 
    playerName, 
    startTime, 
    endTime,
    errorCount, 
    resetGame,
    currentMessage 
  } = useGameContext();
  
  // Calculate total time
  const totalTime = startTime && endTime ? endTime - startTime : 0;
  
  // Format time for display
  const formatTime = (time: number) => {
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  useEffect(() => {
    // Play completion sound when results are shown
    playCompletionSound();
  }, []);
  
  const playCompletionSound = () => {
    const audio = new Audio('/completion-sound.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };

  const handlePlayAgain = () => {
    const audio = new Audio('/button-click.mp3');
    audio.play()
      .then(() => {
        setTimeout(() => {
          resetGame();
        }, 300);
      })
      .catch(err => {
        console.error('Error playing sound:', err);
        resetGame();
      });
  };

  return (
    <div className="w-full max-w-3xl mx-auto space-y-6">
      <Card className="border-primary bg-card">
        <CardHeader>
          <CardTitle className="text-center font-game text-primary">Game Completed!</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-lg font-game text-secondary mb-4">{currentMessage}</p>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <span className="font-game text-sm">Player:</span>
              <span className="font-game text-sm text-primary">{playerName}</span>
            </div>
            
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <span className="font-game text-sm">Time:</span>
              <span className="font-game text-sm text-primary">{formatTime(totalTime)}</span>
            </div>
            
            <div className="flex justify-between items-center bg-muted p-4 rounded-lg">
              <span className="font-game text-sm">Errors:</span>
              <span className="font-game text-sm text-destructive">{errorCount}</span>
            </div>
            
            <Button
              onClick={handlePlayAgain}
              className="w-full py-6 font-game bg-accent text-accent-foreground hover:bg-accent/80"
            >
              PLAY AGAIN
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Leaderboard />
    </div>
  );
};

export default GameResults;
