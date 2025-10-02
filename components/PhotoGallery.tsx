import React from 'react';
import type { Photo } from '../types';

interface PhotoGalleryProps {
  items: Photo[];
  baseIndex: number;
  onPhotoClick: (index: number) => void;
}

const PhotoGallery = React.forwardRef<HTMLDivElement, PhotoGalleryProps>(({ items, baseIndex, onPhotoClick }, ref) => {
  return (
    <div ref={ref} className="mt-4 mb-8 animate-fadeIn">
      <div className="sm:columns-2 sm:gap-6 space-y-6">
        {items.map(({ url, description }, photoIndex) => {
          const isVideo = url.endsWith('.mp4');
          return (
            <div
              key={url}
              className="photo-item p-2 pb-4 bg-white/80 shadow-lg rounded-md break-inside-avoid"
            >
              <div
                className="overflow-hidden cursor-pointer group"
                onClick={() => onPhotoClick(baseIndex + photoIndex)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onPhotoClick(baseIndex + photoIndex)}
                aria-label={`View media in full screen`}
              >
                {isVideo ? (
                  <video
                    src={url}
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105 rounded-sm"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={url}
                    alt={description || `Memory photo`}
                    className="w-full h-full object-cover aspect-[4/3] transition-transform duration-300 group-hover:scale-105 rounded-sm"
                    loading="lazy"
                  />
                )}
              </div>
              {description && (
                <p className="font-caveat text-xl text-center text-stone-700 mt-3">{description}</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default PhotoGallery;