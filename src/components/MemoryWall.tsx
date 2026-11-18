import React from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Calendar, Bookmark, PlusCircle } from 'lucide-react';

export const MemoryWall: React.FC = () => {
  const { data, setIsAdminOpen } = useSurprise();

  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-[#FFF0F6] via-[#FFEAF3] to-[#FFF5F8]">
      {/* Scrapbook Container */}
      <div className="max-w-6xl mx-auto rounded-3xl scrapbook-paper p-6 sm:p-12 shadow-xl border-4 border-pink-200/90 relative overflow-hidden">
        {/* Decorative corner ribbons */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-pink-300/40 rounded-full blur-xl" />
        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-purple-300/30 rounded-full blur-xl" />

        {/* Section Header */}
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-pink-300 text-sm font-semibold text-[#E84383] mb-3 shadow-sm">
            <Bookmark className="w-4 h-4 text-[#FF69A6]" />
            <span>Our Fairytale Chapters</span>
            <Bookmark className="w-4 h-4 text-[#FF69A6]" />
          </div>

          <h2 className="font-cursive text-5xl sm:text-7xl text-[#E84383] glow-pink-text leading-tight">
            {data.memoryTitle}
          </h2>
          <p className="font-serif italic text-lg sm:text-xl text-slate-700 mt-2 max-w-2xl mx-auto">
            {data.memorySubtitle}
          </p>

          <div className="mt-4 flex justify-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#E84383] text-xs sm:text-sm font-semibold transition-colors border border-pink-200 shadow-sm"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Add Special Memory</span>
            </button>
          </div>
        </div>

        {/* Memories Grid - Scrapbook Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {data.memories.map((mem, index) => {
            const rotValues = ['-rotate-1', 'rotate-2', '-rotate-2', 'rotate-1'];
            const rot = rotValues[index % rotValues.length];

            return (
              <div
                key={mem.id}
                className={`relative bg-[#FFFDF9] p-5 rounded-2xl shadow-lg border-2 border-pink-100 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] transform ${rot}`}
              >
                {/* Scrapbook Pin / Sticker Accent */}
                <div className="absolute -top-3 left-6 z-20 text-2xl filter drop-shadow">
                  {mem.sticker || '🎀'}
                </div>

                {/* Golden Washi tape on top right */}
                <div className="absolute -top-2 right-6 w-16 h-4 washi-tape-gold rounded-sm z-20" />

                {/* Photo if provided */}
                {mem.photoUrl && (
                  <div className="relative overflow-hidden rounded-xl border border-pink-100 mb-4 bg-pink-50/50">
                    <img
                      src={mem.photoUrl}
                      alt={mem.title}
                      className="w-full h-48 object-cover rounded-lg"
                      loading="lazy"
                    />
                  </div>
                )}

                {/* Date Tag */}
                <div className="flex items-center gap-1.5 text-xs font-semibold text-[#E84383] bg-pink-50 px-2.5 py-1 rounded-full w-fit mb-2">
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{mem.date}</span>
                </div>

                {/* Title */}
                <h3 className="font-serif font-bold text-xl text-slate-800 mb-2">
                  {mem.title}
                </h3>

                {/* Handwritten Description */}
                <p className="font-handwriting text-xl text-slate-700 leading-relaxed">
                  "{mem.description}"
                </p>

                {/* Little cute corner heart */}
                <div className="flex justify-end mt-4">
                  <Heart className="w-4 h-4 text-[#FFB6D5] fill-[#FFB6D5]" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
