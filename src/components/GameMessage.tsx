
import React from 'react';
import { useGameContext } from '@/context/GameContext';

const GameMessage: React.FC = () => {
  const { gameState, currentMessage } = useGameContext();
  
  if (gameState !== 'playing') {
    return null;
  }
  
  return (
    <div className="w-full max-w-md mx-auto mb-4">
      <div className="p-3 bg-card rounded-lg border border-secondary">
        <p className="text-sm font-game text-center">{currentMessage}</p>
      </div>
    </div>
  );
};

export default GameMessage;
