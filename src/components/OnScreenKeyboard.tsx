
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onKeyPress, onSubmit }) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  
  const keys = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];
  
  const handleKeyPress = (key: string) => {
    onKeyPress(isShiftActive ? key.toUpperCase() : key);
    if (isShiftActive) setIsShiftActive(false);
  };
  
  const handleShift = () => {
    setIsShiftActive(!isShiftActive);
  };
  
  const handleBackspace = () => {
    onKeyPress('BACKSPACE');
  };
  
  const handleSpace = () => {
    onKeyPress(' ');
  };
  
  return (
    <div className="w-full max-w-xl p-2 bg-card rounded-lg shadow-lg border-2 border-primary">
      {keys.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center mb-2">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleKeyPress(key)}
              className={cn(
                "h-12 w-12 m-1 font-game text-lg uppercase",
                isShiftActive ? "bg-secondary/20" : ""
              )}
            >
              {isShiftActive ? key.toUpperCase() : key}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center mb-2">
        <Button
          variant="outline"
          onClick={handleShift}
          className={cn(
            "h-12 px-4 m-1 font-game",
            isShiftActive ? "bg-secondary text-secondary-foreground" : ""
          )}
        >
          SHIFT
        </Button>
        <Button
          variant="outline"
          onClick={handleSpace}
          className="h-12 px-8 m-1 font-game"
        >
          SPACE
        </Button>
        <Button
          variant="outline"
          onClick={handleBackspace}
          className="h-12 px-4 m-1 font-game"
        >
          DEL
        </Button>
        <Button
          variant="default"
          onClick={onSubmit}
          className="h-12 px-4 m-1 font-game bg-accent text-accent-foreground hover:bg-accent/80"
        >
          ENTER
        </Button>
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
