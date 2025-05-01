
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Player = {
  name: string;
  time: number;
  errors: number;
  emoji: string;
};

type GameState = 'start' | 'playing' | 'finished';

interface GameContextType {
  playerName: string;
  setPlayerName: (name: string) => void;
  playerEmoji: string;
  setPlayerEmoji: (emoji: string) => void;
  players: Player[];
  gameState: GameState;
  startTime: number | null;
  endTime: number | null;
  errorCount: number;
  startGame: () => void;
  endGame: () => void;
  resetGame: () => void;
  addError: () => void;
  funnyMessages: {
    start: string[];
    error: string[];
    finish: string[];
  };
  currentMessage: string;
  setCurrentMessage: (message: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const funnyStartMessages = [
  "Ready to get buzzed? Not that kind!",
  "Steady hands win prizes... and avoid electric shocks!",
  "The wire is your enemy, the loop is your friend!",
  "Don't be shocking, be amazing!",
  "No coffee before this game. I repeat: NO COFFEE!",
];

const funnyErrorMessages = [
  "BZZZZT! That's not a massage chair!",
  "Ouch! Did someone order fried player?",
  "ZAP! Are you trying to power the Pi with your finger?",
  "Shocking performance! Literally!",
  "That's not how you charge your batteries!",
  "You've got the touch! Unfortunately.",
  "Your future as a surgeon is... questionable.",
  "Is your hand made of magnets?!",
];

const funnyFinishMessages = [
  "You survived! Your finger might need therapy though.",
  "Congratulations on not being completely electrocuted!",
  "You're officially less shaky than a caffeine addict!",
  "Medal of honor for your poor finger!",
  "The wire fears YOU now!",
];

// List of fun emojis for players
const funnyEmojis = [
  "⚡", "🤖", "👾", "🎮", "🕹️", "👽", "🤪", 
  "🥴", "😵", "🥵", "🤯", "🧠", "👻", "🤡",
  "🧙‍♂️", "🦄", "🐉", "🦹‍♀️", "🦸‍♂️", "🎯", "🧲"
];

interface GameProviderProps {
  children: ReactNode;
}

export const GameProvider: React.FC<GameProviderProps> = ({ children }) => {
  const [playerName, setPlayerName] = useState<string>('');
  const [playerEmoji, setPlayerEmoji] = useState<string>(
    funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)]
  );
  const [players, setPlayers] = useState<Player[]>([]);
  const [gameState, setGameState] = useState<GameState>('start');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [errorCount, setErrorCount] = useState<number>(0);
  const [currentMessage, setCurrentMessage] = useState<string>(funnyStartMessages[0]);

  // Load players from local storage when component mounts
  useEffect(() => {
    const storedPlayers = localStorage.getItem('buzzWirePlayers');
    if (storedPlayers) {
      try {
        setPlayers(JSON.parse(storedPlayers));
      } catch (e) {
        console.error('Error parsing stored players', e);
        setPlayers([]);
      }
    }
  }, []);

  // Save players to local storage when they change
  useEffect(() => {
    if (players.length > 0) {
      localStorage.setItem('buzzWirePlayers', JSON.stringify(players));
    }
  }, [players]);

  const startGame = () => {
    if (playerName.trim()) {
      setGameState('playing');
      setStartTime(Date.now());
      setEndTime(null);
      setErrorCount(0);
      const randomMessage = funnyStartMessages[Math.floor(Math.random() * funnyStartMessages.length)];
      setCurrentMessage(randomMessage);
    }
  };

  const endGame = () => {
    if (gameState === 'playing') {
      const now = Date.now();
      setEndTime(now);
      setGameState('finished');
      
      if (startTime) {
        const newPlayer: Player = {
          name: playerName,
          time: now - startTime,
          errors: errorCount,
          emoji: playerEmoji,
        };
        setPlayers(prevPlayers => {
          // Sort players by time (ascending) and then by errors (ascending)
          const updatedPlayers = [...prevPlayers, newPlayer].sort((a, b) => {
            if (a.time !== b.time) return a.time - b.time;
            return a.errors - b.errors;
          });
          
          // Keep only top 10 players
          return updatedPlayers.slice(0, 10);
        });
      }
      
      const randomMessage = funnyFinishMessages[Math.floor(Math.random() * funnyFinishMessages.length)];
      setCurrentMessage(randomMessage);
    }
  };

  const resetGame = () => {
    setGameState('start');
    setStartTime(null);
    setEndTime(null);
    setErrorCount(0);
    // Set a new random emoji for next player
    setPlayerEmoji(funnyEmojis[Math.floor(Math.random() * funnyEmojis.length)]);
    const randomMessage = funnyStartMessages[Math.floor(Math.random() * funnyStartMessages.length)];
    setCurrentMessage(randomMessage);
  };

  const addError = () => {
    if (gameState === 'playing') {
      setErrorCount(prev => prev + 1);
      const randomMessage = funnyErrorMessages[Math.floor(Math.random() * funnyErrorMessages.length)];
      setCurrentMessage(randomMessage);
    }
  };

  const funnyMessages = {
    start: funnyStartMessages,
    error: funnyErrorMessages,
    finish: funnyFinishMessages,
  };

  return (
    <GameContext.Provider
      value={{
        playerName,
        setPlayerName,
        playerEmoji,
        setPlayerEmoji,
        players,
        gameState,
        startTime,
        endTime,
        errorCount,
        startGame,
        endGame,
        resetGame,
        addError,
        funnyMessages,
        currentMessage,
        setCurrentMessage,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = (): GameContextType => {
  const context = useContext(GameContext);
  
  if (context === undefined) {
    throw new Error('useGameContext must be used within a GameProvider');
  }
  
  return context;
};
