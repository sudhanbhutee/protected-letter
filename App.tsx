import React, { useState, useCallback } from 'react';
import PasswordPrompt from './components/PasswordPrompt';
import LetterView from './components/LetterView';
import { getLetter } from './services/letterService';
import type { JournalEntry } from './types';

const App: React.FC = () => {
  const [letterContent, setLetterContent] = useState<JournalEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUnlock = useCallback(async (password: string) => {
    setError(null);
    try {
      const content = await getLetter(password);
      setLetterContent(content);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError("An unknown error occurred.");
      }
      // Re-throw the error so the child component knows the submission failed
      throw e;
    }
  }, []);

  const isAuthenticated = letterContent !== null;

  return (
    <div className="bg-gradient-to-br from-stone-100 to-rose-100 min-h-screen w-full flex items-center justify-center p-4 transition-colors duration-500">
      <div className="relative w-full max-w-2xl h-[70vh] max-h-[800px] flex items-center justify-center">
        {!isAuthenticated && (
          <PasswordPrompt
            onUnlock={handleUnlock}
            errorMessage={error}
          />
        )}
        
        <div 
          className={`transition-opacity duration-1000 w-full h-full ${isAuthenticated ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          // Use `aria-hidden` to improve accessibility by hiding the content from screen readers when not visible.
          aria-hidden={!isAuthenticated}
        >
          {isAuthenticated && <LetterView entries={letterContent} />}
        </div>
      </div>
    </div>
  );
};

export default App;