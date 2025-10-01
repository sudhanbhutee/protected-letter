import React, { useState } from 'react';
import Lightbox from './Lightbox';
import type { Photo } from '../types';

interface PhotoGalleryProps {
  items: Photo[];
  allPhotoUrlsForLightbox: string[];
  baseIndex: number;
}

const PhotoGallery = React.forwardRef<HTMLDivElement, PhotoGalleryProps>(({ items, allPhotoUrlsForLightbox, baseIndex }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);

  const openLightbox = (photoIndex: number) => {
    setCurrentImageIndex(baseIndex + photoIndex);
  };
  const closeLightbox = () => setCurrentImageIndex(null);

  const goToNext = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + 1) % allPhotoUrlsForLightbox.length));
  };

  const goToPrevious = () => {
    setCurrentImageIndex(prevIndex => (prevIndex === null ? 0 : (prevIndex + allPhotoUrlsForLightbox.length - 1) % allPhotoUrlsForLightbox.length));
  };

  const isLightboxOpen = currentImageIndex !== null;

  return (
    <>
      <div ref={ref} className="mt-4 mb-8 animate-fadeIn">
        <div className="sm:columns-2 sm:gap-6 space-y-6">
          {items.map(({ url, description }, photoIndex) => (
            <div
              key={url}
              className="photo-item p-2 pb-4 bg-white/80 shadow-lg rounded-md break-inside-avoid"
            >
              <div
                className="overflow-hidden cursor-pointer group"
                onClick={() => openLightbox(photoIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && openLightbox(photoIndex)}
                aria-label={`View photo in full screen`}
              >
                <img 
                  src={url} 
                  alt={description || `Memory photo`} 
                  className="w-full h-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105 rounded-sm" 
                  loading="lazy"
                />
              </div>
              {description && (
                <p className="font-caveat text-xl text-center text-stone-700 mt-3">{description}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {isLightboxOpen && (
        <Lightbox
          urls={allPhotoUrlsForLightbox}
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