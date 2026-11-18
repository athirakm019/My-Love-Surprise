import { SurpriseData, PhotoItem, MemoryItem } from '../types';

const DB_NAME = 'MyLoveSurpriseDB';
const DB_VERSION = 1;
const STORE_NAME = 'surpriseStore';
const DATA_KEY = 'surpriseData';
const LOCAL_STORAGE_KEY = 'my_love_surprise_data';

// High-quality romantic sample photo SVGs for instant beautiful display before user uploads photos
const createCuteHeartSvg = (color: string, label: string) => `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="600" height="750" viewBox="0 0 600 750"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" stop-color="%23FFD6E7"/><stop offset="50%" stop-color="${encodeURIComponent(color)}"/><stop offset="100%" stop-color="%23FFB6D5"/></linearGradient></defs><rect width="600" height="750" fill="url(%23g)"/><circle cx="300" cy="320" r="140" fill="%23FFFFFF" opacity="0.3"/><path d="M300,430 C300,430 180,340 180,250 C180,195 225,160 270,180 C300,195 300,210 300,210 C300,210 300,195 330,180 C375,160 420,195 420,250 C420,340 300,430 300,430 Z" fill="%23FFFFFF" opacity="0.9"/><text x="300" y="520" font-family="sans-serif" font-weight="bold" font-size="28" fill="%23E84383" text-anchor="middle">${encodeURIComponent(label)}</text><text x="300" y="560" font-family="sans-serif" font-size="18" fill="%23FF69A6" text-anchor="middle">Click edit icon to upload real photos 📸</text></svg>`;

export const DEFAULT_SURPRISE_DATA: SurpriseData = {
  heroGreeting: "HEY MY LOVE... 💗",
  heroSubtitle: "I have a little surprise for you...",
  heroButtonText: "OPEN YOUR SURPRISE 💌",
  bigLoveTitle: "I LOVE YOU SO MUCH ❤️",
  bigLoveSubtitle: "You are my favourite person, my happiness and my forever. 🥹💗",
  galleryTitle: "MY FAVOURITE HUMAN 💗",
  gallerySubtitle: "Every picture of you holds a special place in my heart.",
  memoryTitle: "MY BEAUTIFUL MEMORIES WITH YOU 💞",
  memorySubtitle: "A scrapbook of the sweetest moments we have shared together",
  loveLetter: `My sweetest love,

I don't know where to begin because words will never be enough to explain how much you mean to me.

You are the reason behind so many of my smiles. Every little moment with you becomes a beautiful memory that I want to keep forever.

I love your smile, your presence, your little habits and everything that makes you YOU.

I wish to make millions of memories with you, laugh with you, grow with you and stay beside you through every chapter of life.

You are my favourite person, my happiness and my forever.

I LOVE YOU SO MUCH! ❤️🥹`,
  loveLetterSignoff: "Forever yours. 💗",
  unlimitedLoveMessage: "Sending you unlimited hugs, kisses and love! 😘💋",
  finalQuotes: [
    "YOU ARE MY TODAY, MY TOMORROW AND MY FOREVER. 💗",
    "If I could choose again, I would still choose YOU. ❤️",
    "I LOVE YOU MORE THAN WORDS CAN EVER EXPLAIN! 🥹💋"
  ],
  secretSurpriseMessage: "Guess what? I fall in love with you a little more every single day. 💗",
  adminPasswordHash: "love123", // Default password, can be changed in Admin
  musicTrackUrl: "", // Defaults to romantic piano synthesizer
  photos: [
    {
      id: "photo-1",
      url: createCuteHeartSvg("#FF69A6", "Your Handsome Smile ✨"),
      caption: "That gentle smile that brightens my darkest days 🥹",
      date: "Forever & Always",
      isFavorite: true,
      aspectRatio: "portrait"
    },
    {
      id: "photo-2",
      url: createCuteHeartSvg("#E84383", "My Safe Place 🤍"),
      caption: "In your warm embrace is where I feel most at home",
      date: "Sweet Memory",
      isFavorite: false,
      aspectRatio: "square"
    },
    {
      id: "photo-3",
      url: createCuteHeartSvg("#FFB6D5", "Our Fun Adventures 🌸"),
      caption: "Every ordinary day turns magical when I'm with you",
      date: "Unforgettable",
      isFavorite: false,
      aspectRatio: "landscape"
    },
    {
      id: "photo-4",
      url: createCuteHeartSvg("#E6D5FF", "Your Gorgeous Eyes 💫"),
      caption: "I could look into your eyes forever and never get tired",
      date: "Pure Magic",
      isFavorite: false,
      aspectRatio: "portrait"
    },
    {
      id: "photo-5",
      url: createCuteHeartSvg("#FF69A6", "My Dream Boy 👑"),
      caption: "Thank you for being the prince of my fairytale",
      date: "My Everything",
      isFavorite: false,
      aspectRatio: "square"
    },
    {
      id: "photo-6",
      url: createCuteHeartSvg("#FFD6E7", "Endless Laughs Together 🥰"),
      caption: "The sound of your laugh is my favourite soundtrack in the world",
      date: "Precious Moment",
      isFavorite: false,
      aspectRatio: "portrait"
    }
  ],
  memories: [
    {
      id: "mem-1",
      title: "The Day We First Met 💫",
      date: "The Start of Forever",
      description: "My heart knew right from that first conversation that you were someone truly special.",
      sticker: "🎀",
      photoUrl: createCuteHeartSvg("#FFB6D5", "Our First Spark ✨")
    },
    {
      id: "mem-2",
      title: "Our Late Night Talks 🌙",
      date: "Midnight Whispers",
      description: "Talking for hours about our dreams, laughing until our stomachs hurt, feeling so close.",
      sticker: "💌",
      photoUrl: createCuteHeartSvg("#E6D5FF", "Late Night Calls 🌌")
    },
    {
      id: "mem-3",
      title: "The Day I Realized I Loved You ❤️",
      date: "A Day to Remember",
      description: "Looking at you and feeling a peace so deep, knowing you are the one I want forever.",
      sticker: "💖",
      photoUrl: createCuteHeartSvg("#E84383", "When I Fell in Love 🌹")
    }
  ]
};

// Open IndexedDB database
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (!window.indexedDB) {
      reject(new Error("IndexedDB is not supported"));
      return;
    }
    const request = window.indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    request.onupgradeneeded = (e) => {
      const db = (e.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

// Save complete surprise state to IndexedDB + LocalStorage fallback
export async function saveSurpriseData(data: SurpriseData): Promise<void> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);
    store.put(data, DATA_KEY);
    await new Promise((resolve, reject) => {
      tx.oncomplete = () => resolve(null);
      tx.onerror = () => reject(tx.error);
    });
  } catch (err) {
    console.warn("IndexedDB save failed, falling back to LocalStorage:", err);
  }

  // Also save lightweight metadata to localStorage
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.warn("LocalStorage save quota exceeded:", err);
  }
}

// Load complete surprise state from IndexedDB or LocalStorage
export async function loadSurpriseData(): Promise<SurpriseData> {
  try {
    const db = await openDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const request = store.get(DATA_KEY);
    const result = await new Promise<SurpriseData | undefined>((resolve, reject) => {
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });

    if (result && typeof result === 'object' && result.photos) {
      return { ...DEFAULT_SURPRISE_DATA, ...result };
    }
  } catch (err) {
    console.warn("IndexedDB load failed, trying LocalStorage:", err);
  }

  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...DEFAULT_SURPRISE_DATA, ...parsed };
    }
  } catch (err) {
    console.error("LocalStorage parse error:", err);
  }

  return DEFAULT_SURPRISE_DATA;
}

// Convert a File to base64 Data URL
export function fileToDataUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

// Export the entire surprise gift as a downloadable JSON file
export function exportGiftPackage(data: SurpriseData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `my-love-surprise-gift-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Import a gift package JSON file
export function importGiftPackage(file: File): Promise<SurpriseData> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = JSON.parse(text) as SurpriseData;
        if (!parsed.photos || !parsed.bigLoveTitle) {
          throw new Error("Invalid gift file format");
        }
        resolve({ ...DEFAULT_SURPRISE_DATA, ...parsed });
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = () => reject(reader.error);
    reader.readAsText(file);
  });
}
