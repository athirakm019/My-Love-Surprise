export interface PhotoItem {
  id: string;
  url: string;
  caption: string;
  date?: string;
  isFavorite?: boolean;
  aspectRatio?: 'square' | 'portrait' | 'landscape';
}

export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  description: string;
  photoUrl?: string;
  sticker?: string;
}

export interface SurpriseData {
  heroGreeting: string;
  heroSubtitle: string;
  heroButtonText: string;
  bigLoveTitle: string;
  bigLoveSubtitle: string;
  galleryTitle: string;
  gallerySubtitle: string;
  memoryTitle: string;
  memorySubtitle: string;
  loveLetter: string;
  loveLetterSignoff: string;
  unlimitedLoveMessage: string;
  finalQuotes: string[];
  secretSurpriseMessage: string;
  adminPasswordHash: string;
  musicTrackUrl: string;
  photos: PhotoItem[];
  memories: MemoryItem[];
}
