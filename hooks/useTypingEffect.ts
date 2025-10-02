import { useState, useEffect } from 'react';
import { isContentSeen, markContentAsSeen, getBrowserFingerprint } from '../services/userTrackingService';

export const useTypingEffect = (
  text: string, 
  speed: number = 50,
  onComplete?: () => void,
  contentId?: string // Optional content ID for tracking
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const id = await getBrowserFingerprint();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    // Wait until userId and text are available
    if (!userId || !text) return;

    // If content has been seen before, skip the animation entirely.
    if (contentId && isContentSeen(contentId, userId)) {
      setDisplayedText(text);
      onComplete?.();
      return;
    }

    let timeoutId: number;
    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < text.length) {
        setDisplayedText((prev) => prev + text.charAt(currentIndex));
        currentIndex++;
        timeoutId = window.setTimeout(typeCharacter, speed);
      } else {
        // Animation is complete
        onComplete?.();
        if (contentId) {
          markContentAsSeen(contentId, userId);
        }
      }
    };
    
    // Reset display text and start the typing animation
    setDisplayedText('');
    // Start with a timeout to allow the reset to render
    timeoutId = window.setTimeout(typeCharacter, speed);

    // Cleanup function to clear the timeout when the component unmounts
    // or when dependencies change, preventing memory leaks.
    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [text, speed, onComplete, contentId, userId]);

  return displayedText;
};