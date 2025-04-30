
import React, { useState, useEffect } from 'react';
import { useGameContext } from '@/context/GameContext';

const GameTimer: React.FC = () => {
  const [elapsedTime, setElapsedTime] = useState(0);
  const { gameState, startTime } = useGameContext();
  
  useEffect(() => {
    let timerId: number;
    
    if (gameState === 'playing' && startTime) {
      // Update timer every 10ms for smooth display
      timerId = window.setInterval(() => {
        setElapsedTime(Date.now() - startTime);
      }, 10);
    } else if (gameState !== 'playing') {
      setElapsedTime(0);
    }
    
    return () => {
      if (timerId) clearInterval(timerId);
    };
  }, [gameState, startTime]);
  
  // Format time as mm:ss.ms
  const formatTime = (time: number) => {
    const totalSeconds = time / 1000;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    const milliseconds = Math.floor((totalSeconds % 1) * 100);
    
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`;
  };
  
  if (gameState !== 'playing') {
    return null;
  }
  
  return (
    <div className="w-full max-w-md mx-auto mb-2 p-2 bg-card rounded-lg border-2 border-primary">
      <div className="text-xl font-game text-center text-primary animate-glow">
        {formatTime(elapsedTime)}
      </div>
    </div>
  );
};

export default GameTimer;
