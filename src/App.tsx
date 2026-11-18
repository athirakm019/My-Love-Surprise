import React from 'react';
import { useSurprise } from './context/SurpriseContext';
import { OpeningScreen } from './components/OpeningScreen';
import { BigILoveYou } from './components/BigILoveYou';
import { PhotoGallery } from './components/PhotoGallery';
import { MemoryWall } from './components/MemoryWall';
import { LoveLetter } from './components/LoveLetter';
import { UnlimitedLoveButton } from './components/UnlimitedLoveButton';
import { FinalSurprise } from './components/FinalSurprise';
import { MusicPlayer } from './components/MusicPlayer';
import { SecretSurprise } from './components/SecretSurprise';
import { PhotoLightbox } from './components/PhotoLightbox';
import { AdminModal } from './components/admin/AdminModal';
import { FloatingHearts } from './components/effects/FloatingHearts';
import { FallingPetals } from './components/effects/FallingPetals';
import { Lock, Heart, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const { isOpened, setIsAdminOpen } = useSurprise();

  return (
    <div className="min-h-screen relative text-slate-800 bg-[#FFF9FB] overflow-x-hidden selection:bg-[#FFB6D5] selection:text-[#E84383]">
      {/* Ambient Particle and Petal Layers */}
      <FloatingHearts />
      <FallingPetals />

      {/* Opening Surprise Screen (displays until "OPEN YOUR SURPRISE 💌" is clicked) */}
      {!isOpened && <OpeningScreen />}

      {/* Main Love Universe Content */}
      <main className="relative z-20">
        {/* Section 1: Massive I LOVE YOU Surprise */}
        <BigILoveYou />

        {/* Section 2: Personal Boyfriend Photo Gallery */}
        <PhotoGallery />

        {/* Section 3: Romantic Memory Scrapbook Wall */}
        <MemoryWall />

        {/* Section 4: Wax-Sealed Animated Love Letter */}
        <LoveLetter />

        {/* Section 5: Unlimited Love Explosions Button */}
        <UnlimitedLoveButton />

        {/* Section 6: Grand Finale - Favourite Photo, Fireworks & Forever Quotes */}
        <FinalSurprise />

        {/* Romantic Footer with Discrete Admin Trigger */}
        <footer className="relative py-12 px-4 text-center border-t border-pink-100 bg-white/60 backdrop-blur-sm">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Heart className="w-4 h-4 text-[#FF69A6] fill-[#FF69A6]" />
            <span className="font-handwriting text-2xl text-[#E84383] font-bold">
              Forever & Always Yours
            </span>
            <Heart className="w-4 h-4 text-[#FF69A6] fill-[#FF69A6]" />
          </div>
          <p className="font-serif italic text-xs text-slate-500 max-w-sm mx-auto">
            A digital love kingdom built with endless love, happy tears, and infinite devotion.
          </p>

          {/* Discreet Admin Lock Button */}
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="inline-flex items-center gap-1.5 text-[11px] text-pink-300 hover:text-[#E84383] transition-colors p-1"
              title="Princess Admin Customization"
            >
              <Lock className="w-3 h-3" />
              <span>Customize Surprise</span>
            </button>
          </div>
        </footer>
      </main>

      {/* Floating Utilities */}
      <MusicPlayer />
      <SecretSurprise />
      <PhotoLightbox />
      <AdminModal />
    </div>
  );
};

export default App;
