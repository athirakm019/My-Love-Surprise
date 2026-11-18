import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, Smile } from 'lucide-react';
import { triggerHeartExplosion } from './effects/Fireworks';

interface FloatingIcon {
  id: number;
  x: number;
  y: number;
  emoji: string;
}

const BURST_EMOJIS = ['💋', '💖', '💗', '🌹', '🦋', '🥰', '😘', '✨', '💐', '💕'];

export const UnlimitedLoveButton: React.FC = () => {
  const { data, loveClickCount, incrementLoveCount } = useSurprise();
  const [floatingIcons, setFloatingIcons] = useState<FloatingIcon[]>([]);
  const [showCelebrationMessage, setShowCelebrationMessage] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    incrementLoveCount();

    // Trigger canvas confetti explosion
    triggerHeartExplosion(e.clientX, e.clientY);

    // Show celebration banner
    setShowCelebrationMessage(true);

    // Spawn floating flying kisses and emojis
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const newIcons: FloatingIcon[] = Array.from({ length: 12 }).map((_, i) => ({
      id: Date.now() + i,
      x: centerX + (Math.random() - 0.5) * 160,
      y: centerY + (Math.random() - 0.5) * 80,
      emoji: BURST_EMOJIS[Math.floor(Math.random() * BURST_EMOJIS.length)],
    }));

    setFloatingIcons((prev) => [...prev, ...newIcons]);

    // Clean up floating icons
    setTimeout(() => {
      setFloatingIcons((prev) => prev.filter((item) => !newIcons.includes(item)));
    }, 2000);
  };

  return (
    <section className="relative py-20 px-4 flex flex-col items-center justify-center text-center overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute w-96 h-96 bg-gradient-to-r from-pink-300/40 to-rose-300/40 rounded-full blur-3xl pointer-events-none" />

      {/* Counter Badge */}
      <div className="relative z-20 mb-6 inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white/90 border-2 border-pink-200 shadow-md">
        <Heart className="w-5 h-5 text-[#E84383] fill-[#E84383] animate-pulse" />
        <span className="font-serif font-bold text-lg sm:text-xl text-[#E84383]">
          {loveClickCount} Kisses & Hugs Sent
        </span>
        <Smile className="w-5 h-5 text-[#F5DFA5]" />
      </div>

      {/* Big Glowing Heart Button */}
      <button
        onClick={handleClick}
        className="group relative z-20 px-8 sm:px-14 py-6 sm:py-8 rounded-full bg-gradient-to-r from-[#FF69A6] via-[#E84383] to-[#FF4D8D] text-white shadow-2xl hover:shadow-pink-400/80 transition-all duration-300 transform hover:scale-108 active:scale-95 border-4 border-white animate-heartbeat cursor-pointer"
      >
        <span className="flex items-center justify-center gap-3 sm:gap-4 font-serif font-extrabold text-xl sm:text-3xl tracking-wide uppercase drop-shadow-md">
          <Heart className="w-7 sm:w-9 h-7 sm:h-9 fill-white text-white group-hover:scale-125 transition-transform" />
          <span>CLICK HERE FOR UNLIMITED LOVE 💗</span>
          <Sparkles className="w-6 sm:w-8 h-6 sm:h-8 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
        </span>
      </button>

      {/* Floating Kisses / Emojis Animation */}
      {floatingIcons.map((icon) => (
        <span
          key={icon.id}
          className="fixed pointer-events-none z-50 text-3xl sm:text-4xl animate-bounce"
          style={{
            left: `${icon.x}px`,
            top: `${icon.y}px`,
            animation: 'floatParticle 2s ease-out forwards',
          }}
        >
          {icon.emoji}
        </span>
      ))}

      {/* Celebratory Banner Message */}
      <div
        className={`relative z-20 mt-8 max-w-md px-6 py-3.5 rounded-2xl bg-white/95 border-2 border-pink-300 shadow-xl transition-all duration-500 transform ${
          showCelebrationMessage
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-95 -translate-y-2 pointer-events-none'
        }`}
      >
        <p className="font-handwriting text-2xl sm:text-3xl text-[#E84383] font-bold">
          {data.unlimitedLoveMessage}
        </p>
      </div>

      <p className="mt-4 text-xs sm:text-sm text-pink-700 font-serif italic z-20">
        ✨ You can never click this too many times ✨
      </p>
    </section>
  );
};
