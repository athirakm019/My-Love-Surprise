import React, { useEffect } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { X, ChevronLeft, ChevronRight, Heart, Calendar } from 'lucide-react';

export const PhotoLightbox: React.FC = () => {
  const { data, activePhotoIndex, setActivePhotoIndex } = useSurprise();

  const isOpen = activePhotoIndex !== null;
  const currentPhoto = isOpen && data.photos[activePhotoIndex] ? data.photos[activePhotoIndex] : null;

  const handleClose = () => setActivePhotoIndex(null);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const prev = (activePhotoIndex - 1 + data.photos.length) % data.photos.length;
    setActivePhotoIndex(prev);
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activePhotoIndex === null) return;
    const next = (activePhotoIndex + 1) % data.photos.length;
    setActivePhotoIndex(next);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') handleClose();
      if (e.key === 'ArrowLeft' && activePhotoIndex !== null) {
        setActivePhotoIndex((activePhotoIndex - 1 + data.photos.length) % data.photos.length);
      }
      if (e.key === 'ArrowRight' && activePhotoIndex !== null) {
        setActivePhotoIndex((activePhotoIndex + 1) % data.photos.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activePhotoIndex, data.photos.length]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={handleClose}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-4 inset-x-4 sm:inset-x-8 flex items-center justify-between text-white z-50">
        <div className="flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-semibold">
          <Heart className="w-4 h-4 text-[#FF69A6] fill-[#FF69A6]" />
          <span>
            {activePhotoIndex + 1} / {data.photos.length}
          </span>
        </div>

        <button
          onClick={handleClose}
          className="p-2 sm:p-3 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all transform hover:rotate-90 duration-300"
          title="Close viewer"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Prev Navigation Button */}
      {data.photos.length > 1 && (
        <button
          onClick={handlePrev}
          className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all transform hover:scale-110 active:scale-95 z-50"
          title="Previous photo"
        >
          <ChevronLeft className="w-6 sm:w-8 h-6 sm:h-8" />
        </button>
      )}

      {/* Next Navigation Button */}
      {data.photos.length > 1 && (
        <button
          onClick={handleNext}
          className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-white/20 hover:bg-white/40 text-white transition-all transform hover:scale-110 active:scale-95 z-50"
          title="Next photo"
        >
          <ChevronRight className="w-6 sm:w-8 h-6 sm:h-8" />
        </button>
      )}

      {/* Center Image and Polaroid Card Frame */}
      <div
        className="relative max-w-4xl max-h-[85vh] flex flex-col items-center justify-center bg-white p-3 sm:p-5 rounded-2xl shadow-2xl border-4 border-pink-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative overflow-hidden rounded-xl max-h-[65vh] flex items-center justify-center bg-pink-50">
          <img
            src={currentPhoto.url}
            alt={currentPhoto.caption || "Boyfriend picture"}
            className="max-h-[65vh] w-auto max-w-full object-contain rounded-lg shadow-inner"
          />
        </div>

        {/* Caption & Date Section */}
        <div className="w-full text-center mt-3 px-2">
          <p className="font-handwriting text-2xl sm:text-3xl text-[#E84383] font-semibold">
            {currentPhoto.caption}
          </p>
          {currentPhoto.date && (
            <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-pink-700 font-medium mt-1">
              <Calendar className="w-3.5 h-3.5" />
              <span>{currentPhoto.date}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
