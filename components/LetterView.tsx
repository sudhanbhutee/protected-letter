import React, { useState, useCallback, useMemo } from 'react';
import PhotoGallery from './PhotoGallery';
import JournalTextEntry from './JournalTextEntry';
import type { JournalEntry } from '../types';

interface LetterViewProps {
  entries: JournalEntry[];
}

const LetterView: React.FC<LetterViewProps> = ({ entries }) => {
  const [completedEntryIds, setCompletedEntryIds] = useState(new Set<string>());
  const [revealedPhotoIds, setRevealedPhotoIds] = useState(new Set<string>());

  const handleAnimationComplete = useCallback((id: string) => {
    setCompletedEntryIds(prev => new Set(prev).add(id));
  }, []);

  const handleRevealPhotos = useCallback((id: string) => {
    setRevealedPhotoIds(prev => new Set(prev).add(id));
  }, []);

  const groupedEntries = useMemo(() => {
    return entries.reduce<Record<string, JournalEntry[]>>((acc, entry) => {
      if (!acc[entry.date]) acc[entry.date] = [];
      acc[entry.date].push(entry);
      return acc;
    }, {});
  }, [entries]);

  const allPhotos = useMemo(() =>
    entries
      .filter((entry): entry is Extract<JournalEntry, { type: 'photos' }> => entry.type === 'photos')
      .flatMap(entry => entry.items),
    [entries]
  );

  const animatableEntryIds = useMemo(() =>
    entries.filter(e => e.type === 'letter' || e.type === 'note').map(e => e.id),
    [entries]
  );
  
  // FIX: Replaced .findLast() with a compatible alternative for broader JS environment support.
  const lastCompletedAnimatable = [...animatableEntryIds].reverse().find(id => completedEntryIds.has(id));
  const nextAnimatableIndex = animatableEntryIds.findIndex(id => id === lastCompletedAnimatable) + 1;
  
  // The entry currently animating is the one after the last completed one,
  // or the very first one if no entries are completed yet.
  const currentAnimatingId = animatableEntryIds[nextAnimatableIndex] ?? (completedEntryIds.size === 0 ? animatableEntryIds[0] : null);

  let photoIndexOffset = 0;
  let animatableEntryIndex = -1;

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
            // A date header and its content are only visible if at least one entry for that date is active.
            // An entry is active if it's completed, currently animating, or a revealed photo gallery.
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
                // Find the entry that reveals this photo gallery
                const revealingEntry = entries.find(e => (e.type === 'letter' || e.type === 'note') && e.revealsPhotos === entry.id);
                // Photos are revealed either by clicking a button OR if there's no prompt for them (for backwards compatibility/default show)
                const isRevealed = revealedPhotoIds.has(entry.id) || !revealingEntry;
                if (!isRevealed) return null;

                const gallery = (
                  <PhotoGallery 
                    key={entry.id}
                    items={entry.items}
                    allPhotoUrlsForLightbox={allPhotos.map(p => p.url)}
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
  );
};

export default LetterView;
