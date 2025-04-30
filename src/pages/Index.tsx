
import React from 'react';
import { GameProvider, useGameContext } from '@/context/GameContext';
import PlayerRegistration from '@/components/PlayerRegistration';
import WireGame from '@/components/WireGame';
import GameTimer from '@/components/GameTimer';
import GameMessage from '@/components/GameMessage';
import GameResults from '@/components/GameResults';

const GameScreen = () => {
  const { gameState } = useGameContext();
  
  return (
    <div className="container py-8 px-4">
      <h1 className="text-3xl font-game text-primary text-center mb-8">Buzz Wire Challenge</h1>
      
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
