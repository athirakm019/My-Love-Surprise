import React, { useEffect, useState } from 'react';

interface Particle {
  id: number;
  emoji: string;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

const EMOJIS = ['💗', '💖', '💕', '✨', '🌸', '🦋', '🌹', '🤍', '⭐', '🥰'];

export const FloatingHearts: React.FC = () => {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate an ambient collection of floating emojis
    const items: Particle[] = Array.from({ length: 24 }).map((_, i) => ({
      id: i,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      left: Math.random() * 96 + 2, // between 2% and 98%
      size: Math.floor(Math.random() * 18) + 16, // 16px to 34px
      duration: Math.floor(Math.random() * 8) + 9, // 9s to 17s
      delay: Math.random() * 8, // 0 to 8s
      opacity: Math.random() * 0.5 + 0.35,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-10">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none animate-float-particle"
          style={{
            left: `${p.left}%`,
            bottom: '-40px',
            fontSize: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            filter: 'drop-shadow(0 2px 8px rgba(255, 105, 166, 0.4))',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
};
