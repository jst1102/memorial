import { useState, useEffect } from 'react';

export const useAudio = (url: string) => {
  const [audio] = useState(new Audio(url));
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  useEffect(() => {
    audio.addEventListener('ended', () => {
      audio.currentTime = 0;
      audio.play();
    });

    return () => {
      audio.removeEventListener('ended', () => {});
      audio.pause();
    };
  }, [audio]);

  return { isPlaying, togglePlay };
};