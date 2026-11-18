import React from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, X } from 'lucide-react';
import { triggerHeartExplosion } from './effects/Fireworks';

export const SecretSurprise: React.FC = () => {
  const { data, triggerSecretClick, isSecretOpen, setIsSecretOpen, secretClickCount } = useSurprise();

  const handleSecretTrigger = (e: React.MouseEvent) => {
    e.stopPropagation();
    triggerHeartExplosion(e.clientX, e.clientY);
    triggerSecretClick();
  };

  return (
    <>
      {/* Subtle Floating Secret Heart Icon */}
      <div className="fixed bottom-5 right-5 z-40 select-none">
        <button
          onClick={handleSecretTrigger}
          className="relative group p-3 rounded-full glass-pink shadow-md hover:shadow-pink-300/80 border border-pink-200/90 transition-all duration-300 transform hover:scale-120 active:scale-95 cursor-pointer"
          title="A secret little sparkle..."
        >
          <Heart className="w-5 h-5 text-[#FF69A6] group-hover:text-[#E84383] group-hover:fill-[#FF69A6] transition-colors" />
          <Sparkles className="absolute -top-1 -right-1 w-3.5 h-3.5 text-[#F5DFA5] animate-sparkle" />
          
          {/* Subtle indicator of progress if clicked once or twice */}
          {secretClickCount > 0 && (
            <span className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-[#E84383] text-white text-[10px] font-bold flex items-center justify-center">
              {secretClickCount}
            </span>
          )}
        </button>
      </div>

      {/* Secret Popup Modal */}
      {isSecretOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn"
          onClick={() => setIsSecretOpen(false)}
        >
          <div
            className="relative max-w-md w-full bg-gradient-to-b from-white via-pink-50 to-[#FFEAF3] p-8 sm:p-10 rounded-3xl shadow-2xl border-4 border-pink-300 text-center animate-scaleUp"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={() => setIsSecretOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-pink-100 text-pink-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Glowing Heart Icon */}
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-tr from-[#FF69A6] to-[#E84383] flex items-center justify-center shadow-lg border-4 border-white animate-heartbeat">
              <Heart className="w-10 h-10 text-white fill-white" />
            </div>

            <span className="text-xs font-bold uppercase tracking-widest text-pink-500 font-serif">
              Secret Easter Egg Unlocked ✨
            </span>

            {/* Secret Message */}
            <p className="mt-4 font-handwriting text-3xl sm:text-4xl text-[#E84383] font-bold leading-snug">
              "{data.secretSurpriseMessage}"
            </p>

            <p className="mt-4 font-serif italic text-sm text-slate-600">
              You found my hidden note! You are the most precious person in my whole life.
            </p>

            {/* Sweet Action Button */}
            <div className="mt-8">
              <button
                onClick={() => {
                  triggerHeartExplosion();
                  setIsSecretOpen(false);
                }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-[#FF69A6] to-[#E84383] text-white font-serif font-bold text-base shadow-lg hover:shadow-pink-400/50 transition-all transform hover:scale-105 active:scale-95"
              >
                Awww, I love you too! 🥹💗
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
