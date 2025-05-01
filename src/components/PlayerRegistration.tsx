
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useGameContext } from '@/context/GameContext';
import { cn } from '@/lib/utils';
import OnScreenKeyboard from '@/components/OnScreenKeyboard';

const PlayerRegistration: React.FC = () => {
  const { playerName, setPlayerName, playerEmoji, startGame, currentMessage } = useGameContext();
  const [localPlayerName, setLocalPlayerName] = useState('');
  const [isReady, setIsReady] = useState(false);
  
  // Auto-start game after a delay when player is ready
  useEffect(() => {
    let timer: number;
    if (isReady && localPlayerName) {
      timer = window.setTimeout(() => {
        setPlayerName(localPlayerName);
        startGame();
        playStartSound();
      }, 3000);
    }
    
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isReady, localPlayerName]);
  
  const handleReadyClick = () => {
    if (localPlayerName.trim()) {
      setIsReady(true);
      playReadySound();
    }
  };
  
  const playReadySound = () => {
    const audio = new Audio('/ready-sound.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };
  
  const playStartSound = () => {
    const audio = new Audio('/start-sound.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPlayerName(e.target.value);
  };
  
  const handleKeyPress = (key: string) => {
    if (key === 'BACKSPACE') {
      setLocalPlayerName(prev => prev.slice(0, -1));
    } else {
      setLocalPlayerName(prev => prev.length < 20 ? prev + key : prev);
    }
  };
  
  const handleSubmit = () => {
    if (localPlayerName.trim()) {
      handleReadyClick();
    }
  };
  
  return (
    <Card className="w-full max-w-md mx-auto border-primary bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-center font-game text-xl text-primary">
          Buzz Wire Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-4">
          <p className="font-game text-sm mb-4">{currentMessage}</p>
          <div className={cn(
            "w-20 h-20 mx-auto mb-3 rounded-full flex items-center justify-center transition-all duration-500",
            isReady ? "bg-accent/60 animate-pulse" : "bg-destructive/20 animate-pulse-custom"
          )}>
            <div className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-500",
              isReady ? "bg-accent/80" : "bg-destructive/40"
            )}>
              <div className={cn(
                "w-7 h-7 rounded-full transition-all duration-500 flex items-center justify-center",
                isReady ? "bg-accent" : "bg-destructive"
              )}>
                <span className="text-lg">{playerEmoji}</span>
              </div>
            </div>
          </div>
          {isReady && (
            <p className="font-game text-accent animate-pulse">Get ready to play!</p>
          )}
        </div>
        
        <div className="space-y-3">
          <div className="relative border-2 rounded-lg overflow-hidden border-border">
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-lg">
              {playerEmoji}
            </div>
            <Input
              id="playerName"
              value={localPlayerName}
              onChange={handleInputChange}
              placeholder="Enter your name to play"
              className="py-5 pl-10 text-lg font-game border-0 focus-visible:ring-0"
              maxLength={20}
              disabled={isReady}
            />
          </div>
          
          {!isReady && (
            <>
              <OnScreenKeyboard 
                onKeyPress={handleKeyPress} 
                onSubmit={handleSubmit} 
              />
              
              <Button
                onClick={handleReadyClick}
                disabled={!localPlayerName.trim()}
                className="w-full py-5 font-game bg-primary text-primary-foreground hover:bg-primary/80"
              >
                READY TO PLAY
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerRegistration;
