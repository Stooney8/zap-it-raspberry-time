
import React, { useEffect, useRef } from 'react';
import { useGameContext } from '@/context/GameContext';

const GameMessage: React.FC = () => {
  const { gameState, currentMessage } = useGameContext();
  const prevMessageRef = useRef<string>('');
  
  useEffect(() => {
    // Play sound when message changes during gameplay
    if (gameState === 'playing' && prevMessageRef.current !== currentMessage) {
      const isBuzzMessage = currentMessage.includes("BZZZZT") || 
                           currentMessage.includes("Ouch") || 
                           currentMessage.includes("ZAP");
      
      if (isBuzzMessage) {
        playErrorSound();
      }
      
      prevMessageRef.current = currentMessage;
    }
  }, [gameState, currentMessage]);
  
  const playErrorSound = () => {
    const audio = new Audio('/error-sound.mp3');
    audio.play().catch(err => console.error('Error playing sound:', err));
  };
  
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
