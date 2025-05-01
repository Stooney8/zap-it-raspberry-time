
import React from 'react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface EmojiSelectorProps {
  selectedEmoji: string;
  onSelect: (emoji: string) => void;
}

const EMOJIS = [
  "⚡", "🤖", "👾", "🎮", "🕹️", "👽", "🤪", 
  "🥴", "😵", "🥵", "🤯", "🧠", "👻", "🤡",
  "🧙‍♂️", "🦄", "🐉", "🦹‍♀️", "🦸‍♂️", "🎯", "🧲"
];

const TOP_EMOJIS = EMOJIS.slice(0, 10);

const EmojiSelector: React.FC<EmojiSelectorProps> = ({ selectedEmoji, onSelect }) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className="w-10 h-10 p-0 rounded-full bg-background border-2 hover:bg-muted/20"
        >
          <span className="text-lg">{selectedEmoji}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-64 p-2 bg-card border-primary"
        align="center"
      >
        <div className="flex flex-wrap justify-center gap-2">
          {TOP_EMOJIS.map((emoji) => (
            <Button
              key={emoji}
              variant="ghost"
              className={cn(
                "w-10 h-10 p-0 rounded-full hover:bg-primary/20",
                selectedEmoji === emoji && "bg-primary/30 border-2 border-primary"
              )}
              onClick={() => onSelect(emoji)}
            >
              <span className="text-lg">{emoji}</span>
            </Button>
          ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default EmojiSelector;
