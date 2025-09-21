import React, { useState, useCallback } from 'react';
import { useTypingEffect } from '../hooks/useTypingEffect';
import { PHOTO_URLS } from '../constants';
import PhotoGallery from './PhotoGallery';

interface LetterViewProps {
  content: string;
}

const LetterView: React.FC<LetterViewProps> = ({ content }) => {
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [showGallery, setShowGallery] = useState(false);
  
  // Use useCallback to memoize the onComplete callback.
  // This prevents it from being recreated on every render, which was causing
  // the useTypingEffect hook to reset its interval constantly.
  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
  }, []); // Empty dependency array means this function is created once.

  const displayedText = useTypingEffect(content, 50, handleTypingComplete);

  const triggerPhrase = "Do you wanna see?";

  const renderContent = () => {
    // When typing is not complete, show the animated text with a cursor.
    if (!isTypingComplete) {
      return (
        <>
          {displayedText}
          <span className="animate-pulse">|</span>
        </>
      );
    }

    // When typing is complete, find the trigger phrase and make it clickable.
    const parts = content.split(triggerPhrase);
    
    // Failsafe in case the trigger phrase is not found in the letter content.
    if (parts.length < 2) {
      return content;
    }

    return (
      <>
        {parts[0]}
        <span
          className="cursor-pointer text-rose-500 hover:underline font-bold transition-colors"
          onClick={() => setShowGallery(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && setShowGallery(true)}
          aria-label="Click to view photos"
        >
          {triggerPhrase}
        </span>
        {parts[1]}
      </>
    );
  };

  return (
    <div
      className="flex items-center justify-center w-full h-full min-h-[70vh]"
      style={{
        background: 'linear-gradient(135deg, #f5ecd7 0%, #e9d8b4 100%)',
      }}
    >
      <div
        className="vintage-paper relative overflow-y-auto"
        style={{
          width: '650px',
          minHeight: '900px',
          maxHeight: '90vh',
          margin: 'auto',
          padding: '64px 48px',
          background: `url('https://www.textures4photoshop.com/tex/thumbs/vintage-paper-texture-free-download-1095.jpg') center/cover, #fdf6e3`,
          borderRadius: '16px',
          boxShadow: '0 12px 48px 0 rgba(60, 40, 20, 0.22)',
          border: '2px solid #c2a77c',
          filter: 'sepia(0.18) contrast(1.08)',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Subtle stains for extra vintage effect */}
        <img src="https://svgshare.com/i/15uC.svg" alt="stain" style={{position:'absolute',top:'10%',left:'8%',width:'120px',opacity:0.13,zIndex:2,pointerEvents:'none'}} />
        <img src="https://svgshare.com/i/15uC.svg" alt="stain" style={{position:'absolute',bottom:'12%',right:'10%',width:'90px',opacity:0.11,zIndex:2,pointerEvents:'none'}} />
        <div
          className="font-caveat text-[1.7rem] sm:text-3xl text-stone-800 leading-relaxed whitespace-pre-wrap vintage-typing"
          style={{
            color: '#5b4636',
            textShadow: '0 1px 0 #f5ecd7, 0 2px 2px #d2b48c',
            zIndex: 3,
            position: 'relative',
            minHeight: '700px',
            width: '100%',
            paddingBottom: '32px',
          }}
        >
          {renderContent()}
        </div>
        {showGallery && <PhotoGallery urls={PHOTO_URLS} />}
      </div>
    </div>
  );
};

export default LetterView;