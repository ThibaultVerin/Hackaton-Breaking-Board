import React from 'react';
import BackgroundSound from './audio/BackgroundSound.mp3';

export const SoundEffectContext = React.createContext();
export function SoundEffectContextProvider({ children }) {
  const backgroundAudio = () => {
    backgroundAudio.play(BackgroundSound);
    backgroundAudio.volume = 0.5;
  };

  return (
    <SoundEffectContext.Provider
      value={{
        backgroundAudio,
      }}
    >
      {children}
    </SoundEffectContext.Provider>
  );
}
