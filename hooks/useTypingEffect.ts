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
    // Fetch and set the browser fingerprint once
    const fetchUserId = async () => {
      const id = await getBrowserFingerprint();
      setUserId(id);
    };
    fetchUserId();
  }, []);

  useEffect(() => {
    if (!userId) return; // Wait until userId is available

    let isCancelled = false; // Prevent state updates if the component unmounts

    const handleTypingEffect = async () => {
      if (!text) return;

      setDisplayedText(''); // Reset on text change
      let i = 0;

      // Check if the content is already seen
      if (contentId && isContentSeen(contentId, userId)) {
        setDisplayedText(text); // Skip animation for seen content
        onComplete?.();
        return;
      }

      const intervalId = setInterval(() => {
        if (isCancelled) {
          clearInterval(intervalId);
          return;
        }

        setDisplayedText((prev) => prev + text.charAt(i));
        i++;
        if (i >= text.length) {
          clearInterval(intervalId);
          onComplete?.();

          // Mark content as seen
          if (contentId) {
            markContentAsSeen(contentId, userId);
          }
        }
      }, speed);

      return () => clearInterval(intervalId);
    };

    handleTypingEffect();

    return () => {
      isCancelled = true;
    };
  }, [text, speed, onComplete, contentId, userId]);

  return displayedText;
};