import React, { useState, useCallback, useMemo } from 'react';
import PhotoGallery from './PhotoGallery';
import JournalTextEntry from './JournalTextEntry';
import Lightbox from './Lightbox';
import type { JournalEntry } from '../types';

interface LetterViewProps {
  entries: JournalEntry[];
}

const LetterView: React.FC<LetterViewProps> = ({ entries }) => {
  const [completedEntryIds, setCompletedEntryIds] = useState(new Set<string>());
  const [revealedPhotoIds, setRevealedPhotoIds] = useState(new Set<string>());
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const handleAnimationComplete = useCallback((id: string) => {
    setCompletedEntryIds(prev => new Set(prev).add(id));
  }, []);

  const handleRevealPhotos = useCallback((id: string) => {
    setRevealedPhotoIds(prev => new Set(prev).add(id));
  }, []);

  const visiblePhotos = useMemo(() => {
    return entries
      .filter(entry => {
        if (entry.type !== 'photos') return false;
        // An entry is visible if it's been explicitly revealed, or if it doesn't have a trigger (i.e., should be visible by default).
        const revealingEntry = entries.find(e => (e.type === 'letter' || e.type === 'note') && e.revealsPhotos === entry.id);
        return revealedPhotoIds.has(entry.id) || !revealingEntry;
      })
      .flatMap(entry => (entry.type === 'photos' ? entry.items : []));
  }, [entries, revealedPhotoIds]);

  const visiblePhotoUrls = useMemo(() => visiblePhotos.map(p => p.url), [visiblePhotos]);

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);
  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % visiblePhotoUrls.length);
  };
  const goToPrevious = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + visiblePhotoUrls.length - 1) % visiblePhotoUrls.length);
  };

  const groupedEntries = useMemo(() => {
    return entries.reduce<Record<string, JournalEntry[]>>((acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = [];
      acc[entry.date].push(entry);
      return acc;
    }, {});
  }, [entries]);

  const animatableEntryIds = useMemo(() =>
    entries.filter(e => e.type === 'letter' || e.type === 'note').map(e => e.id),
    [entries]
  );
  
  const lastCompletedAnimatable = [...animatableEntryIds].reverse().find(id => completedEntryIds.has(id));
  const nextAnimatableIndex = animatableEntryIds.findIndex(id => id === lastCompletedAnimatable) + 1;
  
  const currentAnimatingId = animatableEntryIds[nextAnimatableIndex] ?? (completedEntryIds.size === 0 ? animatableEntryIds[0] : null);

  let photoIndexOffset = 0;
  let animatableEntryIndex = -1;

  return (
    <>
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
          <img src="https://svgshare.com/i/15uC.svg" alt="stain" style={{position:'absolute',top:'10%',left:'8%',width:'120px',opacity:0.13,zIndex:2,pointerEvents:'none'}} />
          <img src="https://svgshare.com/i/15uC.svg" alt="stain" style={{position:'absolute',bottom:'12%',right:'10%',width:'90px',opacity:0.11,zIndex:2,pointerEvents:'none'}} />
          <div
            className="font-caveat text-[1.7rem] sm:text-3xl text-stone-800 leading-relaxed vintage-typing"
            style={{
              color: '#5b4636',
              textShadow: '0 1px 0 #f5ecd7, 0 2px 2px #d2b48c',
              zIndex: 3,
              position: 'relative',
              width: '100%',
              paddingBottom: '32px',
            }}
          >
            {Object.entries(groupedEntries).map(([date, entriesOnDate]) => {
              const isDateVisible = entriesOnDate.some(entry => 
                completedEntryIds.has(entry.id) || 
                entry.id === currentAnimatingId ||
                (entry.type === 'photos' && revealedPhotoIds.has(entry.id))
              );

              if (!isDateVisible) {
                return null;
              }

              const dateHeader = (
                <div key={date} className="mt-6 mb-4 border-b border-stone-300/70 pb-2">
                  <p className="text-lg font-semibold text-stone-600">{new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              );
              
              const content = entriesOnDate.map((entry) => {
                if (entry.type === 'letter' || entry.type === 'note') {
                  animatableEntryIndex++;
                  const myIndex = animatableEntryIndex;
                  const canAnimate = myIndex === 0 || completedEntryIds.has(animatableEntryIds[myIndex - 1]);

                  if (!canAnimate) return null;

                  return (
                    <JournalTextEntry
                      key={entry.id}
                      entry={entry}
                      onAnimationComplete={handleAnimationComplete}
                      onRevealPhotos={handleRevealPhotos}
                    />
                  );
                }
                
                if (entry.type === 'photos') {
                  const revealingEntry = entries.find(e => (e.type === 'letter' || e.type === 'note') && e.revealsPhotos === entry.id);
                  const isRevealed = revealedPhotoIds.has(entry.id) || !revealingEntry;
                  if (!isRevealed) return null;

                  const gallery = (
                    <PhotoGallery 
                      key={entry.id}
                      items={entry.items}
                      onPhotoClick={openLightbox}
                      baseIndex={photoIndexOffset}
                    />
                  );
                  photoIndexOffset += entry.items.length;
                  return gallery;
                }
                return null;
              });

              return [dateHeader, ...content];
            })}
          </div>
        </div>
      </div>
      {lightboxIndex !== null && (
        <Lightbox
          urls={visiblePhotoUrls}
          currentIndex={lightboxIndex}
          onClose={closeLightbox}
          onNext={goToNext}
          onPrev={goToPrevious}
        />
      )}
    </>
  );
};

export default LetterView;