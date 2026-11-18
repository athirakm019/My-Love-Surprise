import React, { useState } from 'react';
import { useSurprise } from '../context/SurpriseContext';
import { Play, Pause, Volume2, VolumeX, Music, Heart, ChevronDown, ChevronUp } from 'lucide-react';

export const MusicPlayer: React.FC = () => {
  const { isPlayingMusic, toggleMusic, musicVolume, setMusicVolume, isMuted, toggleMute } = useSurprise();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-5 left-5 z-40 select-none">
      {/* Minimized Pill on Mobile / Default state */}
      {!isExpanded ? (
        <div
          onClick={() => setIsExpanded(true)}
          className="flex items-center gap-2.5 px-3.5 py-2 rounded-full glass-pink shadow-lg hover:shadow-pink-300/60 border border-pink-200/90 cursor-pointer transition-all duration-300 transform hover:scale-105"
        >
          {/* Rotating Heart Record */}
          <div
            className={`w-7 h-7 rounded-full bg-gradient-to-tr from-[#FF69A6] to-[#E84383] flex items-center justify-center text-white shadow-sm ${
              isPlayingMusic ? 'animate-spin' : ''
            }`}
            style={{ animationDuration: '4s' }}
          >
            <Music className="w-3.5 h-3.5" />
          </div>

          <div className="flex flex-col pr-1">
            <span className="text-xs font-bold text-[#E84383] font-serif leading-none">
              Romantic Melody
            </span>
            <span className="text-[10px] text-pink-600 leading-tight mt-0.5">
              {isPlayingMusic ? 'Playing ♪' : 'Paused'}
            </span>
          </div>

          <ChevronUp className="w-4 h-4 text-pink-600" />
        </div>
      ) : (
        /* Expanded Floating Card */
        <div className="glass-card p-4 rounded-3xl w-72 shadow-2xl border-2 border-pink-200 animate-fadeIn">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-pink-100">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#E84383] fill-[#E84383] animate-pulse" />
              <span className="font-serif font-bold text-sm text-[#E84383]">
                Our Romantic Soundtrack
              </span>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="p-1 rounded-full hover:bg-pink-100 text-pink-600 transition-colors"
            >
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Player controls */}
          <div className="flex items-center justify-center gap-4 py-4">
            {/* Play / Pause button */}
            <button
              onClick={toggleMusic}
              className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#FF69A6] to-[#E84383] text-white flex items-center justify-center shadow-md hover:shadow-pink-400/50 transition-all transform hover:scale-110 active:scale-95"
              title={isPlayingMusic ? 'Pause music' : 'Play music'}
            >
              {isPlayingMusic ? (
                <Pause className="w-5 h-5 fill-white" />
              ) : (
                <Play className="w-5 h-5 fill-white ml-0.5" />
              )}
            </button>

            {/* Mute button */}
            <button
              onClick={toggleMute}
              className="p-2.5 rounded-full bg-pink-100/80 hover:bg-pink-200 text-[#E84383] transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex items-center gap-2 px-2">
            <Volume2 className="w-3.5 h-3.5 text-pink-500" />
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : musicVolume}
              onChange={(e) => setMusicVolume(parseFloat(e.target.value))}
              className="w-full accent-[#E84383] h-1.5 bg-pink-200 rounded-lg cursor-pointer"
            />
          </div>

          <p className="text-[11px] text-center text-pink-600/80 font-serif italic mt-3">
            Piano melody playing softly in background ✨
          </p>
        </div>
      )}
    </div>
  );
};
