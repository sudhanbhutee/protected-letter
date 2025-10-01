import React, { useState, useCallback, useEffect } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import type { JournalEntry } from '../types';

interface JournalTextEntryProps {
  entry: Extract<JournalEntry, { type: 'letter' | 'note' }>;
  onAnimationComplete: (id: string) => void;
  onRevealPhotos: (id: string) => void;
}

const JournalTextEntry: React.FC<JournalTextEntryProps> = ({ entry, onAnimationComplete, onRevealPhotos }) => {
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setIsAnimationDone(true);
    onAnimationComplete(entry.id);
  }, [entry.id, onAnimationComplete]);
  
  const displayedText = useTypingEffect(entry.content, 50, handleTypingComplete, entry.id);

  const showRevealButton = isAnimationDone && entry.revealsPhotos;

  return (
    <div className="whitespace-pre-wrap mb-4">
      {displayedText}
      {!isAnimationDone && <span className="animate-pulse">|</span>}
      {showRevealButton && (
        <button
          onClick={() => onRevealPhotos(entry.revealsPhotos!)}
          className="stagger-fade-in block mt-4 ml-auto mr-auto px-4 py-2 text-sm font-semibold text-stone-600 bg-stone-200/50 rounded-full border border-stone-300/70 hover:bg-stone-200/90 transition-all duration-300 shadow-sm"
        >
          ✨ Click to see
        </button>
      )}
    </div>
  );
};

export default JournalTextEntry;
