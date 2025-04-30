
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface OnScreenKeyboardProps {
  onKeyPress: (key: string) => void;
  onSubmit: () => void;
}

const OnScreenKeyboard: React.FC<OnScreenKeyboardProps> = ({ onKeyPress, onSubmit }) => {
  const [isShiftActive, setIsShiftActive] = useState(false);
  
  // Keyboard layout optimized for vertical screen
  const keys = [
    ['1', '2', '3', '4', '5'],
    ['6', '7', '8', '9', '0'],
    ['q', 'w', 'e', 'r', 't'],
    ['y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g'],
    ['h', 'j', 'k', 'l', 'z'],
    ['x', 'c', 'v', 'b', 'n'],
    ['m'],
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
    <div className="w-full max-w-md p-1 bg-card rounded-lg shadow-lg border-2 border-primary">
      {keys.map((row, rowIndex) => (
        <div key={`row-${rowIndex}`} className="flex justify-center mb-1">
          {row.map((key) => (
            <Button
              key={key}
              variant="outline"
              onClick={() => handleKeyPress(key)}
              className={cn(
                "h-9 w-9 m-0.5 font-game text-sm uppercase",
                isShiftActive ? "bg-secondary/20" : ""
              )}
            >
              {isShiftActive ? key.toUpperCase() : key}
            </Button>
          ))}
        </div>
      ))}
      <div className="flex justify-center mb-1">
        <Button
          variant="outline"
          onClick={handleShift}
          className={cn(
            "h-9 px-2 m-0.5 font-game text-xs",
            isShiftActive ? "bg-secondary text-secondary-foreground" : ""
          )}
        >
          SHIFT
        </Button>
        <Button
          variant="outline"
          onClick={handleSpace}
          className="h-9 px-6 m-0.5 font-game text-xs"
        >
          SPACE
        </Button>
        <Button
          variant="outline"
          onClick={handleBackspace}
          className="h-9 px-2 m-0.5 font-game text-xs"
        >
          DEL
        </Button>
      </div>
      <Button
        variant="default"
        onClick={onSubmit}
        className="h-9 w-full m-0.5 font-game text-xs bg-accent text-accent-foreground hover:bg-accent/80"
      >
        ENTER
      </Button>
    </div>
  );
};

export default OnScreenKeyboard;
