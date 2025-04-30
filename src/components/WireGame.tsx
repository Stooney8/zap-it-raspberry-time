
import React, { useState, useRef, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { useGameContext } from '@/context/GameContext';

const WireGame: React.FC = () => {
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const wireRef = useRef<HTMLDivElement>(null);
  const loopRef = useRef<HTMLDivElement>(null);
  const [isLoopMoving, setIsLoopMoving] = useState(false);
  const [loopPosition, setLoopPosition] = useState({ x: 50, y: 50 });
  const [pathCompleted, setPathCompleted] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  
  const { toast } = useToast();
  const { 
    gameState, 
    addError, 
    endGame,
    errorCount
  } = useGameContext();

  const handleMouseDown = (e: React.MouseEvent) => {
    if (gameState !== 'playing' || isFinished) return;
    
    e.preventDefault();
    setIsLoopMoving(true);
    
    // Calculate initial position
    updateLoopPosition(e);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (gameState !== 'playing' || isFinished) return;
    
    e.preventDefault();
    setIsLoopMoving(true);
    
    // Calculate initial position
    if (e.touches[0]) {
      updateLoopPositionTouch(e.touches[0]);
    }
  };

  const updateLoopPosition = (e: React.MouseEvent) => {
    if (!gameContainerRef.current || !loopRef.current) return;
    
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((e.clientY - containerRect.top) / containerRect.height) * 100;
    
    // Constrain within game area
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));
    
    setLoopPosition({ x: clampedX, y: clampedY });
    checkCollision();
    updateProgress(clampedX);
  };

  const updateLoopPositionTouch = (touch: React.Touch) => {
    if (!gameContainerRef.current || !loopRef.current) return;
    
    const containerRect = gameContainerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - containerRect.left) / containerRect.width) * 100;
    const y = ((touch.clientY - containerRect.top) / containerRect.height) * 100;
    
    // Constrain within game area
    const clampedX = Math.max(5, Math.min(95, x));
    const clampedY = Math.max(5, Math.min(95, y));
    
    setLoopPosition({ x: clampedX, y: clampedY });
    checkCollision();
    updateProgress(clampedX);
  };

  const updateProgress = (x: number) => {
    // Update progress based on horizontal position
    const progress = Math.min(100, Math.max(0, ((x - 10) / 80) * 100));
    setPathCompleted(progress);
    
    // Check if the player reached the end
    if (progress >= 99 && !isFinished) {
      setIsFinished(true);
      toast({
        title: "You've completed the challenge!",
        description: "Amazing work! Check out your time and ranking.",
        variant: "success"
      });
      endGame();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isLoopMoving && gameState === 'playing' && !isFinished) {
      e.preventDefault();
      updateLoopPosition(e as unknown as React.MouseEvent);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isLoopMoving && gameState === 'playing' && !isFinished && e.touches[0]) {
      e.preventDefault();
      updateLoopPositionTouch(e.touches[0] as unknown as React.Touch);
    }
  };

  const handleMouseUp = () => {
    setIsLoopMoving(false);
  };

  const handleTouchEnd = () => {
    setIsLoopMoving(false);
  };

  const checkCollision = () => {
    if (!wireRef.current || !loopRef.current) return;
    
    const wireRect = wireRef.current.getBoundingClientRect();
    const loopRect = loopRef.current.getBoundingClientRect();
    
    // Simple collision detection - needs to be adjusted based on actual wire path
    const loopCenterY = loopRect.top + (loopRect.height / 2);
    
    // Create a margin of error around the "wire" path
    const wireTop = wireRect.top + (wireRect.height * 0.3);
    const wireBottom = wireRect.top + (wireRect.height * 0.7);
    
    // If loop's center goes outside the safe zone, count as error
    if (loopCenterY < wireTop || loopCenterY > wireBottom) {
      // Add error and trigger buzz animation
      addError();
      
      if (loopRef.current) {
        loopRef.current.classList.add('animate-buzzing');
        setTimeout(() => {
          if (loopRef.current) {
            loopRef.current.classList.remove('animate-buzzing');
          }
        }, 500);
      }
      
      // Show error toast
      toast({
        title: "Bzzzzt!",
        description: "Steady hands! You touched the wire!",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    if (gameState === 'playing') {
      // Add event listeners for mouse/touch movement
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.addEventListener("touchmove", handleTouchMove, { passive: false });
      document.addEventListener("touchend", handleTouchEnd);
      
      // Reset game state
      setIsFinished(false);
      setPathCompleted(0);
      setLoopPosition({ x: 10, y: 50 });
    }
    
    // Clean up event listeners
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("touchmove", handleTouchMove);
      document.removeEventListener("touchend", handleTouchEnd);
    };
  }, [gameState, isLoopMoving]);

  const handleMouseMove = (e: MouseEvent) => {
    if (isLoopMoving && gameState === 'playing' && !isFinished) {
      e.preventDefault();
      updateLoopPosition(e as unknown as React.MouseEvent);
    }
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (isLoopMoving && gameState === 'playing' && !isFinished && e.touches[0]) {
      e.preventDefault();
      updateLoopPositionTouch(e.touches[0] as unknown as React.Touch);
    }
  };

  const handleMouseUp = () => {
    setIsLoopMoving(false);
  };

  const handleTouchEnd = () => {
    setIsLoopMoving(false);
  };

  if (gameState !== 'playing') {
    return null;
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="mb-4 flex justify-between items-center">
        <div className="text-primary font-game text-sm">
          Progress: {Math.floor(pathCompleted)}%
        </div>
        <div className="text-destructive font-game text-sm">
          Errors: {errorCount}
        </div>
      </div>
      
      <div 
        ref={gameContainerRef} 
        className="relative w-full h-64 bg-card rounded-lg border-2 border-primary overflow-hidden"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Game wire - this would be more complex in a real game */}
        <div 
          ref={wireRef}
          className="absolute top-0 left-0 w-full h-full flex items-center"
        >
          <div className="h-6 w-full bg-secondary opacity-30"></div>
          <div className="absolute top-1/2 left-0 transform -translate-y-1/2 h-1 w-full bg-secondary"></div>
        </div>
        
        {/* Loop that player moves */}
        <div
          ref={loopRef}
          className="absolute w-12 h-12 rounded-full border-4 border-primary bg-transparent transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
          style={{ 
            left: `${loopPosition.x}%`, 
            top: `${loopPosition.y}%`,
            boxShadow: '0 0 10px rgba(255, 255, 0, 0.7)'
          }}
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse-custom"></div>
        </div>
        
        {/* Start indicator */}
        <div className="absolute left-[10%] top-1/2 transform -translate-y-1/2 w-4 h-16 bg-accent rounded-md">
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-game text-accent">START</span>
        </div>
        
        {/* End indicator */}
        <div className="absolute right-[10%] top-1/2 transform -translate-y-1/2 w-4 h-16 bg-accent rounded-md">
          <span className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-xs font-game text-accent">FINISH</span>
        </div>
      </div>
      
      <div className="mt-4">
        <Button
          onClick={() => endGame()}
          variant="destructive"
          className="w-full font-game"
        >
          GIVE UP
        </Button>
      </div>
    </div>
  );
};

export default WireGame;
