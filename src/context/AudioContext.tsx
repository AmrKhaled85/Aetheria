import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioNode, setAudioNode] = useState<{ stop: () => void } | null>(null);

  const toggleAudio = () => {
    if (isPlaying) {
      if (audioNode) {
        audioNode.stop();
        setAudioNode(null);
      }
      setIsPlaying(false);
    } else {
      try {
        // Synthesize soft ocean ambient wave drone with Web Audio API
        const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof window.AudioContext }).webkitAudioContext)();
        
        // Pink noise generator for ocean wave sound
        const bufferSize = ctx.sampleRate * 2;
        const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.04;
          b6 = white * 0.115926;
        }

        const whiteNoise = ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Filter for soft ocean feel
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 350;

        // Gain LFO for slow ocean waves rhythm
        const gainNode = ctx.createGain();
        gainNode.gain.value = 0.06;

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);

        whiteNoise.start();

        setAudioNode({
          stop: () => {
            try {
              whiteNoise.stop();
              ctx.close();
            } catch {
              // ignore
            }
          }
        });
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio init failed:', err);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (audioNode) {
        audioNode.stop();
      }
    };
  }, [audioNode]);

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};
