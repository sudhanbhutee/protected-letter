import React, { useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

interface LightboxProps {
  urls: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const Lightbox: React.FC<LightboxProps> = ({ urls, currentIndex, onClose, onNext, onPrev }) => {
  const [animationClass, setAnimationClass] = useState('animate-fadeIn');
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
      if (e.key === 'Escape') handleClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onNext, onPrev, onClose]);

  const handleClose = () => {
    setAnimationClass('animate-fadeOut');
    setTimeout(onClose, 300); // Wait for animation to finish
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    const swipeThreshold = 50;
    if (touchStartX.current - touchEndX.current > swipeThreshold) {
      onNext();
    } else if (touchEndX.current - touchStartX.current > swipeThreshold) {
      onPrev();
    }
  };

  const NavButton: React.FC<{onClick: () => void; 'aria-label': string; children: React.ReactNode; className?: string}> = ({onClick, children, ...props}) => (
    <button
      onClick={onClick}
      className={`absolute top-1/2 -translate-y-1/2 p-2 bg-black/30 text-white rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white ${props.className}`}
      aria-label={props['aria-label']}
    >
      {children}
    </button>
  );

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 bg-black/80 z-50 flex items-center justify-center backdrop-blur-sm ${animationClass}`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery"
    >
      <div 
        className="relative w-full h-full flex items-center justify-center p-4 sm:p-8"
        onClick={(e) => e.stopPropagation()} // Prevent clicks inside from closing the modal
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 bg-black/30 text-white rounded-full hover:bg-black/60 transition-colors focus:outline-none focus:ring-2 focus:ring-white"
          aria-label="Close gallery"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        {/* Previous Button */}
        <NavButton onClick={onPrev} aria-label="Previous image" className="left-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
        </NavButton>

        {/* Image Display */}
        <div className="relative w-full max-w-5xl h-full max-h-[80vh]">
           <img
            key={currentIndex}
            src={urls[currentIndex]}
            alt={`Memory ${currentIndex + 1}`}
            className="w-full h-full object-contain animate-fadeIn"
          />
        </div>

        {/* Next Button */}
        <NavButton onClick={onNext} aria-label="Next image" className="right-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
        </NavButton>
      </div>
    </div>,
    document.body
  );
};

export default Lightbox;