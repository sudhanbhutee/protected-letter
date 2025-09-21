import React, { useState } from 'react';

interface PasswordPromptProps {
  onUnlock: (password: string) => Promise<void>;
  errorMessage: string | null;
}

const PasswordPrompt: React.FC<PasswordPromptProps> = ({ onUnlock, errorMessage }) => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [shake, setShake] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading || !password) return;

    setIsLoading(true);
    try {
      await onUnlock(password);
      // On success, the parent component will handle unmounting this component.
    } catch (error) {
      // Error is handled by parent, which passes down `errorMessage`.
      // The parent will set the error message, causing a re-render.
      // We trigger the shake animation here.
      setShake(true);
      setTimeout(() => setShake(false), 500);
      setPassword('');
      setIsLoading(false);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className={`bg-white/80 backdrop-blur-sm shadow-2xl rounded-lg p-8 w-full max-w-sm text-center transition-transform duration-500 ${shake ? 'shake' : ''}`}>
        <div className="mb-6">
          <svg className="w-16 h-16 mx-auto text-rose-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
          </svg>
          <h2 className="text-2xl font-bold text-stone-700 mt-4">A Note is Waiting</h2>
          <p className="text-stone-500 mt-1">Please enter the password to read it.</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 pr-12 border border-stone-300 rounded-md text-center focus:ring-2 focus:ring-rose-300 focus:border-rose-300 outline-none transition"
              placeholder="Password"
              autoFocus
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute inset-y-0 right-0 flex items-center justify-center w-12 text-stone-500 hover:text-rose-400 focus:outline-none focus:text-rose-400"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a9.97 9.97 0 01-1.563 3.029m0 0l-3.59-3.59m0 0l-3.59 3.59" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              )}
            </button>
          </div>
          <button
            type="submit"
            className="w-full mt-4 bg-rose-400 text-white font-bold py-3 px-4 rounded-md hover:bg-rose-500 active:bg-rose-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-400 transition-all duration-300 transform hover:scale-105 disabled:bg-rose-300 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center"
            disabled={isLoading || !password}
          >
            {isLoading ? (
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : 'Unlock'}
          </button>
          {errorMessage && <p className="text-red-500 text-sm mt-3 break-all">{errorMessage}</p>}
        </form>
      </div>
    </div>
  );
};

export default PasswordPrompt;