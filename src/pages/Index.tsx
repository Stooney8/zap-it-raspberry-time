
import React from 'react';
import { GameProvider, useGameContext } from '@/context/GameContext';
import PlayerRegistration from '@/components/PlayerRegistration';
import WireGame from '@/components/WireGame';
import GameTimer from '@/components/GameTimer';
import GameMessage from '@/components/GameMessage';
import GameResults from '@/components/GameResults';
import { Button } from '@/components/ui/button';

const GameScreen = () => {
  const { gameState } = useGameContext();
  
  return (
    <div className="container py-4 px-2 flex flex-col min-h-screen">
      <h1 className="text-2xl font-game text-primary text-center mb-4">Buzz Wire Challenge</h1>
      
      <div className="flex-grow flex flex-col justify-center">
        {gameState === 'start' && <PlayerRegistration />}
        
        {gameState === 'playing' && (
          <>
            <GameTimer />
            <GameMessage />
            <WireGame />
          </>
        )}
        
        {gameState === 'finished' && <GameResults />}
      </div>
      
      <div className="mt-4 text-center">
        <Button 
          variant="outline" 
          className="font-game text-xs"
          onClick={() => {
            const audio = new Audio('/button-click.mp3');
            audio.play().catch(err => console.error('Error playing sound:', err));
            window.location.href = '/hardware';
          }}
        >
          Hardware Setup
        </Button>
      </div>
    </div>
  );
};

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <GameProvider>
        <GameScreen />
      </GameProvider>
    </div>
  );
};

export default Index;
