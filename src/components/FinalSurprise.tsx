import React, { useEffect } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, Star } from 'lucide-react';
import { triggerPinkFireworks } from './effects/Fireworks';

export const FinalSurprise: React.FC = () => {
  const { data } = useSurprise();

  // Find the designated favourite picture, or fall back to the first photo
  const favoritePhoto = data.photos.find((p) => p.isFavorite) || data.photos[0];

  useEffect(() => {
    // Subtle initial fireworks trigger when scrolled into view
    const timer = setTimeout(() => {
      triggerPinkFireworks();
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCelebrateClick = () => {
    triggerPinkFireworks();
  };

  return (
    <section className="relative min-h-screen py-24 px-4 flex flex-col items-center justify-center text-center overflow-hidden bg-gradient-to-b from-[#FFF5F8] via-[#FFD6E7] to-[#FFB6D5]">
      {/* Decorative Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/60 via-pink-100/40 to-transparent pointer-events-none" />

      {/* Floating Crown / Stars */}
      <div className="relative z-20 flex items-center justify-center gap-3 mb-6">
        <Star className="w-5 h-5 text-[#F5DFA5] fill-[#F5DFA5] animate-spin" style={{ animationDuration: '5s' }} />
        <span className="font-handwriting text-3xl sm:text-4xl text-[#E84383] font-bold">
          My Prince Forever 👑
        </span>
        <Star className="w-5 h-5 text-[#F5DFA5] fill-[#F5DFA5] animate-spin" style={{ animationDuration: '5s' }} />
      </div>

      {/* Boyfriend's Favourite Photo in Glowing Heart / Pearl Frame */}
      {favoritePhoto && (
        <div className="relative z-20 my-6 group cursor-pointer" onClick={handleCelebrateClick}>
          {/* Pulsing ambient glow behind */}
          <div className="absolute inset-0 bg-[#FF69A6]/40 rounded-full blur-2xl group-hover:bg-[#FF69A6]/60 transition-all duration-500 scale-110" />

          {/* Heart Frame Presentation */}
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full p-2.5 bg-gradient-to-tr from-[#F5DFA5] via-[#FF69A6] to-[#E84383] shadow-2xl flex items-center justify-center animate-heartbeat">
            <div className="w-full h-full rounded-full overflow-hidden border-4 border-white bg-pink-100 relative">
              <img
                src={favoritePhoto.url}
                alt={favoritePhoto.caption || "My favourite person"}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </div>

            {/* Glowing Corner Heart Crest */}
            <div className="absolute -bottom-2 right-4 w-12 h-12 rounded-full bg-gradient-to-tr from-[#E84383] to-[#FF4D8D] border-2 border-white shadow-lg flex items-center justify-center">
              <Heart className="w-6 h-6 text-white fill-white animate-pulse" />
            </div>
          </div>

          <p className="font-handwriting text-2xl text-[#E84383] font-semibold mt-4">
            {favoritePhoto.caption}
          </p>
        </div>
      )}

      {/* Cascading Grand Quotes */}
      <div className="relative z-20 max-w-4xl mx-auto space-y-6 mt-6 px-4">
        {/* Quote 1 */}
        <div className="p-4 rounded-3xl bg-white/60 backdrop-blur-sm border border-pink-200/80 shadow-sm animate-float-slow">
          <p className="font-serif font-bold text-2xl sm:text-4xl md:text-5xl text-[#E84383] tracking-wide glow-pink-text">
            {data.finalQuotes[0] || "YOU ARE MY TODAY, MY TOMORROW AND MY FOREVER. 💗"}
          </p>
        </div>

        {/* Quote 2 */}
        <div className="p-4 rounded-3xl bg-white/60 backdrop-blur-sm border border-pink-200/80 shadow-sm animate-float-medium">
          <p className="font-handwriting text-2xl sm:text-4xl text-slate-800 font-bold">
            {data.finalQuotes[1] || "If I could choose again, I would still choose YOU. ❤️"}
          </p>
        </div>

        {/* Quote 3 */}
        <div className="p-5 rounded-3xl bg-gradient-to-r from-pink-500/10 via-rose-500/15 to-pink-500/10 backdrop-blur-sm border-2 border-pink-300 shadow-md">
          <p className="font-cursive text-4xl sm:text-6xl md:text-7xl text-[#E84383] leading-tight glow-pink-text font-bold">
            {data.finalQuotes[2] || "I LOVE YOU MORE THAN WORDS CAN EVER EXPLAIN! 🥹💋"}
          </p>
        </div>
      </div>

      {/* Celebrate Fireworks Button */}
      <div className="relative z-20 mt-12">
        <button
          onClick={handleCelebrateClick}
          className="px-8 sm:px-12 py-4 rounded-full bg-gradient-to-r from-[#FF69A6] via-[#E84383] to-[#FF69A6] text-white font-serif font-bold text-lg sm:text-xl shadow-xl hover:shadow-pink-400/70 border-2 border-white/80 transition-all transform hover:scale-105 active:scale-95"
        >
          <span className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-yellow-200" />
            <span>Launch Pink Fireworks 🎆💗</span>
            <Sparkles className="w-5 h-5 text-yellow-200" />
          </span>
        </button>
      </div>

      {/* Romantic Footer Note */}
      <div className="relative z-20 mt-16 text-center text-sm font-serif italic text-pink-800/80">
        <p>Made with all the love in the universe, just for you. 🌸</p>
      </div>
    </section>
  );
};
