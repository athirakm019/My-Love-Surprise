import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, Edit3 } from 'lucide-react';
import { triggerHeartExplosion } from './effects/Fireworks';

export const LoveLetter: React.FC = () => {
  const { data, setIsAdminOpen } = useSurprise();
  const [isOpen, setIsOpen] = useState(false);

  const toggleEnvelope = (e: React.MouseEvent) => {
    if (!isOpen) {
      triggerHeartExplosion(e.clientX, e.clientY);
    }
    setIsOpen(!isOpen);
  };

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto flex flex-col items-center">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-sm font-semibold text-[#E84383] mb-3">
          <Heart className="w-4 h-4 fill-[#E84383]" />
          <span>From My Heart To Yours</span>
          <Heart className="w-4 h-4 fill-[#E84383]" />
        </div>

        <h2 className="font-cursive text-5xl sm:text-7xl text-[#E84383] glow-pink-text leading-tight">
          A Secret Love Letter 💌
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-slate-700 mt-2">
          {isOpen ? "Every word is straight from my soul" : "Tap the pink envelope to unseal my feelings for you"}
        </p>
      </div>

      {/* Main Interactive Envelope Container */}
      <div className="relative w-full max-w-2xl flex flex-col items-center">
        {!isOpen ? (
          /* Sealed Envelope View */
          <div
            onClick={toggleEnvelope}
            className="group relative w-80 sm:w-96 h-56 sm:h-64 bg-gradient-to-tr from-[#FF9EC4] via-[#FFB6D5] to-[#FFD6E7] rounded-3xl shadow-2xl border-4 border-white/80 cursor-pointer flex items-center justify-center transition-all duration-300 hover:scale-105 hover:shadow-pink-300/60"
          >
            {/* Envelope flap */}
            <div className="absolute top-0 inset-x-0 h-28 border-b-[90px] border-b-transparent border-l-[160px] sm:border-l-[192px] border-l-transparent border-r-[160px] sm:border-r-[192px] border-r-transparent border-t-[100px] border-t-[#FF69A6] filter drop-shadow-md z-20 pointer-events-none" />

            {/* Glowing Heart Wax Seal */}
            <div className="relative z-30 w-16 h-16 rounded-full bg-gradient-to-tr from-[#E84383] to-[#FF4D8D] border-2 border-[#F5DFA5] shadow-xl flex items-center justify-center group-hover:scale-115 transition-transform">
              <Heart className="w-8 h-8 text-white fill-white animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-200 animate-spin" style={{ animationDuration: '3s' }} />
            </div>

            {/* Hint text */}
            <p className="absolute bottom-4 font-serif italic text-xs sm:text-sm text-pink-800 font-semibold z-30">
              💌 Tap wax seal to open 💌
            </p>
          </div>
        ) : (
          /* Unfolded Parchment Paper Letter View */
          <div className="relative w-full parchment rounded-3xl p-8 sm:p-14 border-4 border-[#F5DFA5]/70 shadow-2xl transition-all duration-700 animate-fadeIn">
            {/* Top decorative stamp & postmark */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b-2 border-dashed border-[#F5DFA5]">
              <div className="flex items-center gap-2">
                <span className="text-2xl">🌹</span>
                <span className="font-serif italic text-sm text-[#E84383] font-semibold">
                  Personal Love Note
                </span>
              </div>

              <div className="w-12 h-14 border-2 border-dashed border-[#FF69A6] rounded p-1 flex items-center justify-center bg-pink-50">
                <Heart className="w-6 h-6 text-[#E84383] fill-[#FFB6D5]" />
              </div>
            </div>

            {/* Letter Content */}
            <div className="font-handwriting text-2xl sm:text-3xl text-slate-800 leading-relaxed whitespace-pre-line space-y-4">
              {data.loveLetter}
            </div>

            {/* Signoff */}
            <div className="mt-8 text-right font-cursive text-4xl sm:text-5xl text-[#E84383]">
              {data.loveLetterSignoff}
            </div>

            {/* Close / Fold Button & Admin Edit shortcut */}
            <div className="mt-10 pt-4 border-t-2 border-dashed border-[#F5DFA5] flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2 rounded-full bg-pink-100 hover:bg-pink-200 text-[#E84383] text-sm font-semibold transition-colors shadow-sm"
              >
                Close & Seal Envelope 💌
              </button>

              <button
                onClick={() => setIsAdminOpen(true)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white hover:bg-pink-50 text-slate-600 hover:text-[#E84383] text-xs sm:text-sm font-medium border border-pink-200 transition-colors shadow-sm"
              >
                <Edit3 className="w-4 h-4" />
                <span>Edit Letter in Admin</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
