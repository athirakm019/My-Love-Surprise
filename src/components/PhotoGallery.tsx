import React from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Heart, Sparkles, Image as ImageIcon, PlusCircle } from 'lucide-react';

export const PhotoGallery: React.FC = () => {
  const { data, setActivePhotoIndex, setIsAdminOpen } = useSurprise();

  return (
    <section id="gallery" className="relative py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Decorative Floating Sparkles */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-100/80 border border-pink-200 text-sm font-semibold text-[#E84383] mb-3">
          <Sparkles className="w-4 h-4 text-[#FF69A6]" />
          <span>His Personal Collection</span>
          <Sparkles className="w-4 h-4 text-[#FF69A6]" />
        </div>

        <h2 className="font-cursive text-5xl sm:text-7xl text-[#E84383] glow-pink-text leading-tight">
          {data.galleryTitle}
        </h2>
        <p className="font-serif italic text-lg sm:text-xl text-slate-700 mt-2 max-w-xl mx-auto">
          {data.gallerySubtitle}
        </p>

        {/* Romantic Decorative Ribbon */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent to-[#FF69A6]" />
          <Heart className="w-5 h-5 text-[#FF69A6] fill-[#FFB6D5]" />
          <div className="w-16 h-0.5 bg-gradient-to-l from-transparent to-[#FF69A6]" />
        </div>
      </div>

      {/* Gallery Photo Count & Customization Notice */}
      <div className="flex items-center justify-between mb-8 pb-3 border-b border-pink-100">
        <div className="flex items-center gap-2 text-sm text-pink-700 font-semibold">
          <ImageIcon className="w-4 h-4" />
          <span>{data.photos.length} Precious Moments Captured</span>
        </div>

        <button
          onClick={() => setIsAdminOpen(true)}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full bg-pink-50 hover:bg-pink-100 text-[#E84383] border border-pink-200 transition-colors shadow-sm"
          title="Upload real photos in Admin Mode"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Manage Photos</span>
        </button>
      </div>

      {/* Masonry Grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
        {data.photos.map((photo, index) => {
          // Romantic random tilt for authentic scrapbook polaroid effect
          const tiltAngles = ['-rotate-1', 'rotate-1', '-rotate-2', 'rotate-2', 'rotate-0'];
          const tilt = tiltAngles[index % tiltAngles.length];

          return (
            <div
              key={photo.id}
              onClick={() => setActivePhotoIndex(index)}
              className={`break-inside-avoid group relative bg-white p-3.5 pb-5 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2.5 hover:rotate-0 cursor-pointer border border-pink-200/90 ${tilt}`}
            >
              {/* Washi Tape Accent at Top */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-5 washi-tape-pink rounded-sm opacity-85 z-20" />

              {/* Favourite Star Badge */}
              {photo.isFavorite && (
                <div className="absolute top-2 right-2 z-20 flex items-center gap-1 px-2.5 py-1 rounded-full bg-gradient-to-r from-[#F5DFA5] to-[#FFD700] text-pink-900 text-xs font-bold shadow-md">
                  <span>👑 Favourite</span>
                </div>
              )}

              {/* Photo Image Container */}
              <div className="relative overflow-hidden rounded-xl bg-pink-50 border border-pink-100/60 aspect-auto">
                <img
                  src={photo.url}
                  alt={photo.caption}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Subtle Pink Princess Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#E84383]/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-semibold px-3 py-1 rounded-full bg-black/30 backdrop-blur-sm flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 fill-pink-400 text-pink-400" /> Tap to view full size
                  </span>
                </div>
              </div>

              {/* Polaroid Caption & Date */}
              <div className="mt-3.5 px-1 text-center">
                <p className="font-handwriting text-xl sm:text-2xl text-[#E84383] font-semibold leading-tight group-hover:text-[#FF69A6] transition-colors">
                  {photo.caption}
                </p>
                {photo.date && (
                  <p className="font-serif italic text-xs text-slate-500 mt-1">
                    {photo.date}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
