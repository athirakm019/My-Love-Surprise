import React from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, Star } from 'lucide-react';
import { triggerHeartExplosion } from './effects/Fireworks';

const LOVE_EMOJIS = ['❤️', '💗', '💕', '💖', '💘', '💝', '🥰', '😘', '💋', '🌹', '🦋'];

export const BigILoveYou: React.FC = () => {
  const { data } = useSurprise();

  const handleInteractiveClick = (e: React.MouseEvent) => {
    triggerHeartExplosion(e.clientX, e.clientY);
  };

  return (
    <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FFE4EF] to-[#FFF0F6]">
      {/* Decorative Dreamy Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-gradient-to-tr from-[#FFB6D5]/40 to-[#FFD6E7]/50 rounded-full blur-3xl pointer-events-none" />

      {/* Decorative Crown & Crest */}
      <div className="relative z-20 mb-6 flex items-center justify-center gap-3">
        <span className="w-12 sm:w-20 h-0.5 bg-gradient-to-r from-transparent to-[#FF69A6]" />
        <div className="relative flex items-center justify-center p-3 rounded-full bg-white/80 border border-pink-200 shadow-md">
          <Heart className="w-7 h-7 text-[#E84383] fill-[#E84383] animate-heartbeat" />
          <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-[#F5DFA5] animate-sparkle" />
        </div>
        <span className="w-12 sm:w-20 h-0.5 bg-gradient-to-l from-transparent to-[#FF69A6]" />
      </div>

      {/* Main Massive Title */}
      <div className="relative z-20 max-w-4xl mx-auto cursor-pointer" onClick={handleInteractiveClick}>
        <h1 className="font-cursive text-6xl sm:text-8xl md:text-9xl text-[#E84383] glow-pink-text leading-tight tracking-wide drop-shadow-md transition-transform hover:scale-105 duration-300">
          {data.bigLoveTitle}
        </h1>

        {/* Elegant Subtitle */}
        <p className="mt-6 font-serif italic text-xl sm:text-2xl md:text-3xl text-slate-700 max-w-2xl mx-auto leading-relaxed font-medium">
          {data.bigLoveSubtitle}
        </p>

        {/* Floating Love Emojis Cluster */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 select-none">
          {LOVE_EMOJIS.map((emoji, index) => (
            <span
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                triggerHeartExplosion(e.clientX, e.clientY);
              }}
              className="text-2xl sm:text-3xl p-2 rounded-full bg-white/60 hover:bg-white shadow-sm border border-pink-200/50 cursor-pointer transition-all duration-300 hover:scale-135 hover:-translate-y-2 active:scale-95 animate-sway"
              style={{
                animationDelay: `${index * 0.25}s`,
                animationDuration: `${2.8 + (index % 3) * 0.5}s`,
              }}
              title="Send love"
            >
              {emoji}
            </span>
          ))}
        </div>
      </div>

      {/* Romantic Quote Ribbon */}
      <div className="relative z-20 mt-14 px-6 py-3 rounded-full bg-white/75 border border-pink-200/80 shadow-md backdrop-blur-md flex items-center gap-2">
        <Star className="w-4 h-4 text-[#F5DFA5] fill-[#F5DFA5] animate-spin" style={{ animationDuration: '6s' }} />
        <span className="font-handwriting text-xl sm:text-2xl text-[#E84383] font-semibold">
          Every second with you is a fairytale come true 👑🌸
        </span>
        <Star className="w-4 h-4 text-[#F5DFA5] fill-[#F5DFA5] animate-spin" style={{ animationDuration: '6s' }} />
      </div>

      {/* Romantic Scroll Down Indicator */}
      <div className="relative z-20 mt-16 flex flex-col items-center gap-2 text-pink-600/80 animate-bounce">
        <span className="text-xs uppercase tracking-widest font-semibold">Scroll to explore my love</span>
        <span className="text-lg">↓</span>
      </div>
    </section>
  );
};
