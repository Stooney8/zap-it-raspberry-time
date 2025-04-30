
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import OnScreenKeyboard from './OnScreenKeyboard';
import { useGameContext } from '@/context/GameContext';
import { cn } from '@/lib/utils';

const PlayerRegistration: React.FC = () => {
  const { playerName, setPlayerName, startGame, currentMessage } = useGameContext();
  const [localPlayerName, setLocalPlayerName] = useState('');
  const [showKeyboard, setShowKeyboard] = useState(false);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalPlayerName(e.target.value);
  };
  
  const handleKeyPress = (key: string) => {
    if (key === 'BACKSPACE') {
      setLocalPlayerName(prev => prev.slice(0, -1));
    } else {
      setLocalPlayerName(prev => prev + key);
    }
  };
  
  const handleSubmit = () => {
    if (localPlayerName.trim()) {
      setPlayerName(localPlayerName.trim());
      setShowKeyboard(false);
      startGame();
    }
  };
  
  const handleFocus = () => {
    setShowKeyboard(true);
  };
  
  return (
    <Card className="w-full max-w-xl mx-auto border-primary bg-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-center font-game text-xl text-primary">
          Buzz Wire Challenge
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <p className="font-game text-sm mb-6">{currentMessage}</p>
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-destructive/20 flex items-center justify-center animate-pulse-custom">
            <div className="w-16 h-16 rounded-full bg-destructive/40 flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-destructive"></div>
            </div>
          </div>
        </div>
        
        <div className="space-y-4">
          <div 
            className={cn(
              "relative border-2 rounded-lg overflow-hidden transition-all",
              showKeyboard ? "border-primary" : "border-border"
            )}
          >
            <Input
              id="playerName"
              value={localPlayerName}
              onChange={handleInputChange}
              onFocus={handleFocus}
              placeholder="Enter your name to play"
              className="py-6 text-lg font-game border-0 focus-visible:ring-0"
              maxLength={20}
            />
          </div>
          
          {showKeyboard && (
            <div className="mt-4">
              <OnScreenKeyboard 
                onKeyPress={handleKeyPress}
                onSubmit={handleSubmit}
              />
            </div>
          )}
          
          <Button
            onClick={handleSubmit}
            disabled={!localPlayerName.trim()}
            className="w-full py-6 font-game bg-primary text-primary-foreground hover:bg-primary/80"
          >
            START GAME
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlayerRegistration;
