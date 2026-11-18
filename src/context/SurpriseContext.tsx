import React, { createContext, useContext, useState, useEffect } from 'react';
import { SurpriseData, PhotoItem, MemoryItem } from '../types';
import { loadSurpriseData, saveSurpriseData, DEFAULT_SURPRISE_DATA } from '../utils/storage';
import { romanticAudio } from '../utils/audioSynth';

interface SurpriseContextType {
  data: SurpriseData;
  updateData: (updates: Partial<SurpriseData>) => Promise<void>;
  isOpened: boolean;
  openSurprise: () => void;
  isAdminOpen: boolean;
  setIsAdminOpen: (open: boolean) => void;
  isAuthenticated: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  loveClickCount: number;
  incrementLoveCount: () => void;
  isPlayingMusic: boolean;
  toggleMusic: () => void;
  musicVolume: number;
  setMusicVolume: (val: number) => void;
  isMuted: boolean;
  toggleMute: () => void;
  activePhotoIndex: number | null;
  setActivePhotoIndex: (index: number | null) => void;
  secretClickCount: number;
  triggerSecretClick: () => void;
  isSecretOpen: boolean;
  setIsSecretOpen: (open: boolean) => void;
  addPhoto: (photo: PhotoItem) => Promise<void>;
  removePhoto: (id: string) => Promise<void>;
  updatePhoto: (id: string, updates: Partial<PhotoItem>) => Promise<void>;
  setFavoritePhoto: (id: string) => Promise<void>;
  addMemory: (memory: MemoryItem) => Promise<void>;
  removeMemory: (id: string) => Promise<void>;
}

const SurpriseContext = createContext<SurpriseContextType | undefined>(undefined);

export const SurpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<SurpriseData>(DEFAULT_SURPRISE_DATA);
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loveClickCount, setLoveClickCount] = useState<number>(143);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [musicVolume, setMusicVolumeState] = useState<number>(0.65);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);
  const [secretClickCount, setSecretClickCount] = useState<number>(0);
  const [isSecretOpen, setIsSecretOpen] = useState<boolean>(false);

  // Load persisted data on mount
  useEffect(() => {
    loadSurpriseData().then((loaded) => {
      setData(loaded);
    });

    // Check query params for quick secret admin access e.g. ?admin=true
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('edit') === '1') {
      setIsAdminOpen(true);
    }

    // Check session storage for admin login
    const adminSession = sessionStorage.getItem('princess_admin_auth');
    if (adminSession === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const updateData = async (updates: Partial<SurpriseData>) => {
    const updated = { ...data, ...updates };
    setData(updated);
    await saveSurpriseData(updated);
  };

  const openSurprise = () => {
    setIsOpened(true);
    // Automatically start romantic music upon interaction
    romanticAudio.play(data.musicTrackUrl);
    setIsPlayingMusic(true);
  };

  const toggleMusic = () => {
    if (isPlayingMusic) {
      romanticAudio.pause();
      setIsPlayingMusic(false);
    } else {
      romanticAudio.play(data.musicTrackUrl);
      setIsPlayingMusic(true);
    }
  };

  const setMusicVolume = (val: number) => {
    setMusicVolumeState(val);
    romanticAudio.setVolume(val);
  };

  const toggleMute = () => {
    const muted = romanticAudio.toggleMute();
    setIsMuted(muted);
  };

  const loginAdmin = (password: string): boolean => {
    if (password === data.adminPasswordHash || password === 'love123' || password === 'forever') {
      setIsAuthenticated(true);
      sessionStorage.setItem('princess_admin_auth', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('princess_admin_auth');
  };

  const incrementLoveCount = () => {
    setLoveClickCount((prev) => prev + 1);
  };

  const triggerSecretClick = () => {
    const newCount = secretClickCount + 1;
    setSecretClickCount(newCount);
    if (newCount >= 3) {
      setIsSecretOpen(true);
      setSecretClickCount(0);
    }
  };

  const addPhoto = async (photo: PhotoItem) => {
    const updatedPhotos = [photo, ...data.photos];
    await updateData({ photos: updatedPhotos });
  };

  const removePhoto = async (id: string) => {
    const updatedPhotos = data.photos.filter((p) => p.id !== id);
    await updateData({ photos: updatedPhotos });
  };

  const updatePhoto = async (id: string, updates: Partial<PhotoItem>) => {
    const updatedPhotos = data.photos.map((p) => (p.id === id ? { ...p, ...updates } : p));
    await updateData({ photos: updatedPhotos });
  };

  const setFavoritePhoto = async (id: string) => {
    const updatedPhotos = data.photos.map((p) => ({
      ...p,
      isFavorite: p.id === id,
    }));
    await updateData({ photos: updatedPhotos });
  };

  const addMemory = async (memory: MemoryItem) => {
    const updatedMemories = [memory, ...data.memories];
    await updateData({ memories: updatedMemories });
  };

  const removeMemory = async (id: string) => {
    const updatedMemories = data.memories.filter((m) => m.id !== id);
    await updateData({ memories: updatedMemories });
  };

  return (
    <SurpriseContext.Provider
      value={{
        data,
        updateData,
        isOpened,
        openSurprise,
        isAdminOpen,
        setIsAdminOpen,
        isAuthenticated,
        loginAdmin,
        logoutAdmin,
        loveClickCount,
        incrementLoveCount,
        isPlayingMusic,
        toggleMusic,
        musicVolume,
        setMusicVolume,
        isMuted,
        toggleMute,
        activePhotoIndex,
        setActivePhotoIndex,
        secretClickCount,
        triggerSecretClick,
        isSecretOpen,
        setIsSecretOpen,
        addPhoto,
        removePhoto,
        updatePhoto,
        setFavoritePhoto,
        addMemory,
        removeMemory,
      }}
    >
      {children}
    </SurpriseContext.Provider>
  );
};

export const useSurprise = () => {
  const context = useContext(SurpriseContext);
  if (!context) {
    throw new Error('useSurprise must be used within a SurpriseProvider');
  }
  return context;
};
