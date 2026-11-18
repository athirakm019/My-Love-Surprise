import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { triggerHeartExplosion } from './effects/Fireworks';
import { Sparkles, Heart } from 'lucide-react';

export const OpeningScreen: React.FC = () => {
  const { data, openSurprise } = useSurprise();
  const [isOpening, setIsOpening] = useState(false);
  const [isExiting, setIsExiting] = useState(false);

  const handleOpenClick = (e: React.MouseEvent) => {
    if (isOpening) return;
    setIsOpening(true);

    // Fire romantic explosion from center
    triggerHeartExplosion(window.innerWidth / 2, window.innerHeight / 2);

    // Envelope opens, then reveal website
    setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        openSurprise();
      }, 700);
    }, 1200);
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center px-4 overflow-hidden bg-gradient-to-b from-[#FFF0F6] via-[#FFD6E7] to-[#FFB6D5] transition-all duration-1000 ${
        isExiting ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100'
      }`}
    >
      {/* Background Dreamy Glow & Clouds */}
      <div className="absolute top-[-10%] left-[-10%] w-[45vw] h-[45vw] rounded-full bg-pink-200/40 blur-3xl pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] rounded-full bg-purple-200/35 blur-3xl pointer-events-none" />
      
      {/* Sparkle decorative icons in corners */}
      <Sparkles className="absolute top-12 left-10 w-8 h-8 text-[#FF69A6] animate-sparkle" />
      <Sparkles className="absolute top-20 right-12 w-6 h-6 text-[#F5DFA5] animate-sparkle" style={{ animationDelay: '0.8s' }} />
      <Sparkles className="absolute bottom-16 left-12 w-7 h-7 text-[#F5DFA5] animate-sparkle" style={{ animationDelay: '1.4s' }} />
      <Sparkles className="absolute bottom-20 right-14 w-8 h-8 text-[#FF69A6] animate-sparkle" style={{ animationDelay: '0.4s' }} />

      {/* Header Texts */}
      <div className="text-center z-20 mb-8 max-w-xl animate-float-slow">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-3 rounded-full bg-white/70 border border-pink-200 shadow-sm text-sm font-semibold text-[#E84383]">
          <Heart className="w-4 h-4 fill-[#E84383] text-[#E84383] animate-pulse" />
          <span>A Special Love Gift Just For You</span>
          <Heart className="w-4 h-4 fill-[#E84383] text-[#E84383] animate-pulse" />
        </div>

        <h1 className="font-cursive text-5xl sm:text-7xl md:text-8xl text-[#E84383] glow-pink-text leading-tight drop-shadow-sm">
          {data.heroGreeting}
        </h1>
        <p className="font-serif italic text-lg sm:text-2xl text-slate-700 mt-2 font-normal">
          {data.heroSubtitle}
        </p>
      </div>

      {/* 3D Envelope Presentation */}
      <div className="relative w-72 sm:w-84 h-48 sm:h-56 z-20 my-4 perspective-1000 group cursor-pointer" onClick={handleOpenClick}>
        {/* Glow behind envelope */}
        <div className="absolute inset-0 bg-pink-400/30 rounded-2xl blur-xl group-hover:bg-pink-400/50 transition-all duration-500" />

        {/* Envelope Base Container */}
        <div className="relative w-full h-full bg-gradient-to-tr from-[#FF94BF] to-[#FFB6D5] rounded-2xl shadow-2xl border-2 border-white/60 flex items-center justify-center overflow-hidden">
          {/* Subtle envelope fold lines */}
          <div className="absolute inset-0 border-b-[90px] border-b-transparent border-l-[144px] sm:border-l-[168px] border-l-[#FF80AB]/40 border-r-[144px] sm:border-r-[168px] border-r-[#FF80AB]/40 pointer-events-none" />
          <div className="absolute bottom-0 inset-x-0 border-t-[90px] border-t-transparent border-l-[144px] sm:border-l-[168px] border-l-[#FFA8CB]/60 border-r-[144px] sm:border-r-[168px] border-r-[#FFA8CB]/60 pointer-events-none" />

          {/* Letter Peeking Out when Opening */}
          <div
            className={`absolute inset-x-4 bg-white/95 rounded-xl shadow-md p-4 text-center border border-pink-100 transition-all duration-700 ease-out ${
              isOpening ? '-translate-y-24 opacity-100 scale-105' : 'translate-y-4 opacity-0 scale-95'
            }`}
          >
            <p className="font-cursive text-2xl text-[#E84383]">Forever & Always</p>
            <p className="text-xs text-pink-600 mt-1">Unfolding all my love for you... 💗</p>
          </div>

          {/* Envelope Flap (Top triangle) */}
          <div
            className={`absolute top-0 inset-x-0 h-28 origin-top transition-transform duration-700 ease-in-out border-b-[80px] border-b-transparent border-l-[144px] sm:border-l-[168px] border-l-transparent border-r-[144px] sm:border-r-[168px] border-r-transparent border-t-[100px] border-t-[#FF69A6] filter drop-shadow-md z-30 ${
              isOpening ? 'transform -rotate-x-180 opacity-60' : 'transform rotate-x-0'
            }`}
          >
            {/* Wax Seal in Center */}
            <div className="absolute -top-[70px] left-1/2 transform -translate-x-1/2 w-12 h-12 rounded-full bg-gradient-to-tr from-[#E84383] to-[#FF4D8D] border-2 border-[#F5DFA5] shadow-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
          </div>

          {/* Ribbon Decoration */}
          <div className="absolute inset-x-0 top-1/2 h-4 washi-tape-gold transform -translate-y-1/2 opacity-75 pointer-events-none" />
        </div>
      </div>

      {/* Glowing CTA Button */}
      <div className="z-20 mt-8">
        <button
          onClick={handleOpenClick}
          disabled={isOpening}
          className="relative group px-8 sm:px-10 py-4 sm:py-5 rounded-full font-bold text-lg sm:text-xl text-white bg-gradient-to-r from-[#FF69A6] via-[#E84383] to-[#FF69A6] bg-size-200 shadow-xl hover:shadow-pink-400/60 transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0.5 border-2 border-white/80 animate-pulse-glow"
        >
          <span className="flex items-center gap-3">
            <span className="text-xl">💌</span>
            <span className="tracking-wide uppercase font-serif drop-shadow-md">
              {isOpening ? 'OPENING YOUR LOVE SURPRISE...' : data.heroButtonText}
            </span>
            <Sparkles className="w-5 h-5 text-yellow-200 animate-spin" style={{ animationDuration: '4s' }} />
          </span>
        </button>
      </div>

      <p className="mt-6 text-sm text-pink-700/80 font-serif italic z-20">
        ✨ Tap anywhere to begin our magical journey ✨
      </p>
    </div>
  );
};
