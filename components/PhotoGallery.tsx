import React, { useState } from 'react';
import Lightbox from './Lightbox';

interface PhotoGalleryProps {
  urls: string[];
}

const PhotoGallery = React.forwardRef<HTMLDivElement, PhotoGalleryProps>(({ urls }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openLightbox = (index: number) => setCurrentImageIndex(index);
  const closeLightbox = () => setCurrentImageIndex(null);
  
  const goToNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + 1) % urls.length));
  };
  
  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + urls.length - 1) % urls.length));
  };

  const isLightboxOpen = currentImageIndex !== null;

  return (
    <>
      <div ref={ref} className="mt-12 border-t border-stone-300 pt-8">
        <h3 className="font-caveat text-3xl text-rose-500 mb-6 text-center">
          A few memories...
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {urls.map((url, index) => (
            <div
              key={url}
              className="rounded-lg overflow-hidden shadow-md stagger-fade-in cursor-pointer group"
              style={{ animationDelay: `${index * 150}ms` }}
              onClick={() => openLightbox(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(index)}
              aria-label={`View Memory ${index + 1} in full screen`}
            >
              <img 
                src={url} 
                alt={`Memory ${index + 1}`} 
                className="w-full h-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105" 
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          urls={urls}
          currentIndex={currentImageIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      )}
    </>
  );
});

export default PhotoGallery;