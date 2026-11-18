import React, { useState } from 'react';
import { useSurprise } from '../../context/SurpriseContext';
import { fileToDataUrl, exportGiftPackage, importGiftPackage } from '../../utils/storage';
import { PhotoItem, MemoryItem } from '../../types';
import {
  X,
  Lock,
  Unlock,
  Upload,
  Trash2,
  Star,
  Plus,
  Download,
  FileText,
  Image as ImageIcon,
  Heart,
  Save,
  CheckCircle,
  Eye,
  Sliders
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    data,
    updateData,
    isAdminOpen,
    setIsAdminOpen,
    isAuthenticated,
    loginAdmin,
    logoutAdmin,
    addPhoto,
    removePhoto,
    updatePhoto,
    setFavoritePhoto,
    addMemory,
    removeMemory,
  } = useSurprise();

  const [passwordInput, setPasswordInput] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const [activeTab, setActiveTab] = useState<'photos' | 'memories' | 'letter' | 'quotes' | 'backup'>('photos');
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Form states for adding memory
  const [newMemTitle, setNewMemTitle] = useState('');
  const [newMemDate, setNewMemDate] = useState('');
  const [newMemDesc, setNewMemDesc] = useState('');
  const [newMemSticker, setNewMemSticker] = useState('🎀');
  const [newMemPhoto, setNewMemPhoto] = useState<string>('');

  // Editable text states
  const [letterContent, setLetterContent] = useState(data.loveLetter);
  const [letterSignoff, setLetterSignoff] = useState(data.loveLetterSignoff);
  const [heroGreeting, setHeroGreeting] = useState(data.heroGreeting);
  const [heroSubtitle, setHeroSubtitle] = useState(data.heroSubtitle);
  const [bigLoveTitle, setBigLoveTitle] = useState(data.bigLoveTitle);
  const [bigLoveSubtitle, setBigLoveSubtitle] = useState(data.bigLoveSubtitle);
  const [galleryTitle, setGalleryTitle] = useState(data.galleryTitle);
  const [gallerySubtitle, setGallerySubtitle] = useState(data.gallerySubtitle);
  const [finalQuote1, setFinalQuote1] = useState(data.finalQuotes[0] || '');
  const [finalQuote2, setFinalQuote2] = useState(data.finalQuotes[1] || '');
  const [finalQuote3, setFinalQuote3] = useState(data.finalQuotes[2] || '');
  const [secretMsg, setSecretMsg] = useState(data.secretSurpriseMessage);
  const [newAdminPass, setNewAdminPass] = useState('');

  if (!isAdminOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (loginAdmin(passwordInput)) {
      setPasswordError(false);
      setPasswordInput('');
    } else {
      setPasswordError(true);
    }
  };

  // Handle Photo File Uploads (up to 30+ pictures)
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setIsSaving(true);
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      try {
        const dataUrl = await fileToDataUrl(file);
        const newPhoto: PhotoItem = {
          id: `photo-${Date.now()}-${i}`,
          url: dataUrl,
          caption: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' '),
          date: 'Special Moment',
          isFavorite: data.photos.length === 0 && i === 0,
          aspectRatio: 'portrait',
        };
        await addPhoto(newPhoto);
      } catch (err) {
        console.error('Error uploading photo:', err);
      }
    }
    setIsSaving(false);
    triggerSaveSuccess();
  };

  const handleMemoryPhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await fileToDataUrl(file);
    setNewMemPhoto(url);
  };

  const handleCreateMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemTitle.trim()) return;

    const memory: MemoryItem = {
      id: `mem-${Date.now()}`,
      title: newMemTitle,
      date: newMemDate || 'Beautiful Day',
      description: newMemDesc,
      photoUrl: newMemPhoto || undefined,
      sticker: newMemSticker || '🎀',
    };

    await addMemory(memory);
    setNewMemTitle('');
    setNewMemDate('');
    setNewMemDesc('');
    setNewMemPhoto('');
    triggerSaveSuccess();
  };

  const handleSaveTextChanges = async () => {
    setIsSaving(true);
    await updateData({
      loveLetter: letterContent,
      loveLetterSignoff: letterSignoff,
      heroGreeting,
      heroSubtitle,
      bigLoveTitle,
      bigLoveSubtitle,
      galleryTitle,
      gallerySubtitle,
      finalQuotes: [finalQuote1, finalQuote2, finalQuote3],
      secretSurpriseMessage: secretMsg,
      ...(newAdminPass.trim() ? { adminPasswordHash: newAdminPass.trim() } : {}),
    });
    setIsSaving(false);
    triggerSaveSuccess();
  };

  const handleImportJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const imported = await importGiftPackage(file);
      await updateData(imported);
      triggerSaveSuccess();
    } catch (err) {
      alert('Error importing file. Please ensure it is a valid surprise backup JSON.');
    }
  };

  const triggerSaveSuccess = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl max-h-[92vh] bg-white rounded-3xl shadow-2xl border-4 border-pink-300 flex flex-col overflow-hidden">
        
        {/* Top Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FFD6E7] via-[#FFB6D5] to-[#FFD6E7] border-b border-pink-200 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#E84383] shadow-sm">
              <Sliders className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#E84383] leading-none">
                Princess Customization Studio 👑
              </h3>
              <p className="text-xs text-slate-600 mt-0.5">
                Private area to personalize pictures & messages before sharing
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAdminOpen(false)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-pink-50 text-xs font-semibold text-[#E84383] border border-pink-200 shadow-sm"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Preview As Boyfriend</span>
              </button>
            )}

            <button
              onClick={() => setIsAdminOpen(false)}
              className="p-1.5 rounded-full hover:bg-white/50 text-slate-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Password Gate if not logged in */}
        {!isAuthenticated ? (
          <div className="p-8 sm:p-12 flex flex-col items-center justify-center text-center max-w-md mx-auto my-auto">
            <div className="w-16 h-16 rounded-full bg-pink-100 flex items-center justify-center text-[#E84383] mb-4">
              <Lock className="w-8 h-8" />
            </div>
            <h4 className="font-serif font-bold text-xl text-slate-800">
              Admin Password Required
            </h4>
            <p className="text-sm text-slate-600 mt-1 mb-6">
              Enter password to edit boyfriend pictures, love letter, and surprise memories.
            </p>

            <form onSubmit={handleLogin} className="w-full space-y-4">
              <input
                type="password"
                placeholder="Enter password (default: love123)"
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className={`w-full px-4 py-3 rounded-xl border-2 text-center text-slate-800 text-sm focus:outline-none transition-colors ${
                  passwordError
                    ? 'border-red-400 bg-red-50'
                    : 'border-pink-200 focus:border-[#E84383]'
                }`}
              />

              {passwordError && (
                <p className="text-xs text-red-500 font-semibold">
                  Incorrect password. (Default is: love123)
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-[#FF69A6] to-[#E84383] text-white font-bold text-sm shadow-md hover:shadow-pink-300 transition-all"
              >
                Unlock Customization Studio 💖
              </button>
            </form>
          </div>
        ) : (
          /* Main Authenticated Customization Studio */
          <div className="flex-1 flex flex-col overflow-hidden">
            {/* Tabs Navigation */}
            <div className="flex border-b border-pink-100 bg-pink-50/60 overflow-x-auto text-xs sm:text-sm font-semibold text-slate-600">
              <button
                onClick={() => setActiveTab('photos')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'photos'
                    ? 'border-[#E84383] text-[#E84383] bg-white'
                    : 'border-transparent hover:text-[#E84383]'
                }`}
              >
                <ImageIcon className="w-4 h-4" />
                <span>Photos ({data.photos.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('memories')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'memories'
                    ? 'border-[#E84383] text-[#E84383] bg-white'
                    : 'border-transparent hover:text-[#E84383]'
                }`}
              >
                <Heart className="w-4 h-4" />
                <span>Memory Scrapbook ({data.memories.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('letter')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'letter'
                    ? 'border-[#E84383] text-[#E84383] bg-white'
                    : 'border-transparent hover:text-[#E84383]'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Love Letter</span>
              </button>

              <button
                onClick={() => setActiveTab('quotes')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'quotes'
                    ? 'border-[#E84383] text-[#E84383] bg-white'
                    : 'border-transparent hover:text-[#E84383]'
                }`}
              >
                <Star className="w-4 h-4" />
                <span>Titles & Finale Quotes</span>
              </button>

              <button
                onClick={() => setActiveTab('backup')}
                className={`flex items-center gap-2 px-5 py-3 border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === 'backup'
                    ? 'border-[#E84383] text-[#E84383] bg-white'
                    : 'border-transparent hover:text-[#E84383]'
                }`}
              >
                <Download className="w-4 h-4" />
                <span>Backup & Security</span>
              </button>
            </div>

            {/* Tab Contents (Scrollable) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-slate-50/50">
              {/* TAB 1: PHOTOS */}
              {activeTab === 'photos' && (
                <div className="space-y-6">
                  {/* Upload Dropzone */}
                  <div className="border-2 border-dashed border-pink-300 rounded-2xl p-6 sm:p-8 bg-pink-50/50 text-center hover:bg-pink-50 transition-colors">
                    <Upload className="w-10 h-10 text-[#E84383] mx-auto mb-2" />
                    <p className="font-serif font-bold text-slate-800 text-base">
                      Upload Boyfriend Photos
                    </p>
                    <p className="text-xs text-slate-500 mt-1 mb-4">
                      Supports JPG, JPEG, PNG, WEBP. Upload at least 30+ pictures for a rich gallery.
                    </p>
                    <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E84383] text-white font-semibold text-sm cursor-pointer hover:bg-[#FF69A6] transition-colors shadow-md">
                      <Upload className="w-4 h-4" />
                      <span>Select Photos from Computer / Phone</span>
                      <input
                        type="file"
                        multiple
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        className="hidden"
                        onChange={handlePhotoUpload}
                      />
                    </label>
                  </div>

                  {/* Photos List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {data.photos.map((photo) => (
                      <div
                        key={photo.id}
                        className={`bg-white p-3 rounded-xl border-2 shadow-sm flex flex-col justify-between ${
                          photo.isFavorite ? 'border-amber-400 bg-amber-50/20' : 'border-pink-100'
                        }`}
                      >
                        <div className="relative h-44 rounded-lg overflow-hidden bg-slate-100 mb-2">
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="w-full h-full object-cover"
                          />
                          {photo.isFavorite && (
                            <span className="absolute top-2 left-2 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow">
                              👑 Favourite for Finale
                            </span>
                          )}
                        </div>

                        {/* Caption input */}
                        <div className="space-y-1.5 mb-3">
                          <label className="text-[11px] font-bold text-slate-600">Caption:</label>
                          <input
                            type="text"
                            value={photo.caption}
                            onChange={(e) => updatePhoto(photo.id, { caption: e.target.value })}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-pink-200 text-xs text-slate-800 focus:outline-none focus:border-[#E84383]"
                            placeholder="Add cute caption..."
                          />
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                          <button
                            onClick={() => setFavoritePhoto(photo.id)}
                            className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded transition-colors ${
                              photo.isFavorite
                                ? 'text-amber-600 bg-amber-100'
                                : 'text-slate-500 hover:text-amber-600'
                            }`}
                            title="Choose as favorite photo in final glowing heart"
                          >
                            <Star className="w-3.5 h-3.5" />
                            <span>{photo.isFavorite ? 'Favourite' : 'Set as Finale'}</span>
                          </button>

                          <button
                            onClick={() => removePhoto(photo.id)}
                            className="text-slate-400 hover:text-red-500 p-1 rounded transition-colors"
                            title="Delete photo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 2: MEMORIES */}
              {activeTab === 'memories' && (
                <div className="space-y-6">
                  {/* Create Memory Form */}
                  <form
                    onSubmit={handleCreateMemory}
                    className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm space-y-4"
                  >
                    <h4 className="font-serif font-bold text-base text-[#E84383]">
                      Add New Scrapbook Memory 💞
                    </h4>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Memory Title:
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Our First Date 🌸"
                          value={newMemTitle}
                          onChange={(e) => setNewMemTitle(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Date / Milestone:
                        </label>
                        <input
                          type="text"
                          placeholder="e.g. October 14th"
                          value={newMemDate}
                          onChange={(e) => setNewMemDate(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-600 mb-1">
                          Sticker:
                        </label>
                        <select
                          value={newMemSticker}
                          onChange={(e) => setNewMemSticker(e.target.value)}
                          className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                        >
                          <option value="🎀">🎀 Ribbon</option>
                          <option value="💖">💖 Sparkle Heart</option>
                          <option value="🌸">🌸 Cherry Blossom</option>
                          <option value="💌">💌 Love Letter</option>
                          <option value="✨">✨ Magic Sparkles</option>
                          <option value="🧸">🧸 Teddy Bear</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 mb-1">
                        Personal Story / Note:
                      </label>
                      <textarea
                        rows={2}
                        placeholder="Write what happened and how special you felt..."
                        value={newMemDesc}
                        onChange={(e) => setNewMemDesc(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="inline-flex items-center gap-2 text-xs font-semibold text-[#E84383] cursor-pointer hover:underline">
                        <Upload className="w-3.5 h-3.5" />
                        <span>{newMemPhoto ? 'Photo Attached ✓' : 'Attach Photo for Memory'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleMemoryPhotoUpload}
                        />
                      </label>

                      <button
                        type="submit"
                        className="px-5 py-2 rounded-full bg-[#E84383] text-white text-xs font-bold hover:bg-[#FF69A6] transition-colors"
                      >
                        + Add Memory Card
                      </button>
                    </div>
                  </form>

                  {/* Existing Memories */}
                  <div className="space-y-3">
                    {data.memories.map((mem) => (
                      <div
                        key={mem.id}
                        className="bg-white p-4 rounded-xl border border-pink-100 shadow-sm flex items-start justify-between gap-4"
                      >
                        <div className="flex gap-3">
                          <span className="text-2xl">{mem.sticker}</span>
                          <div>
                            <h5 className="font-serif font-bold text-sm text-slate-800">
                              {mem.title}
                            </h5>
                            <span className="text-[11px] text-[#E84383] font-semibold">
                              {mem.date}
                            </span>
                            <p className="text-xs text-slate-600 mt-1 italic">
                              "{mem.description}"
                            </p>
                          </div>
                        </div>

                        <button
                          onClick={() => removeMemory(mem.id)}
                          className="text-slate-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: LOVE LETTER */}
              {activeTab === 'letter' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Love Letter Content:
                    </label>
                    <textarea
                      rows={12}
                      value={letterContent}
                      onChange={(e) => setLetterContent(e.target.value)}
                      className="w-full p-4 font-serif text-sm rounded-2xl border border-pink-200 focus:outline-none focus:border-[#E84383] bg-white leading-relaxed"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Sign-off Phrase:
                    </label>
                    <input
                      type="text"
                      value={letterSignoff}
                      onChange={(e) => setLetterSignoff(e.target.value)}
                      className="w-full px-4 py-2 text-sm rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                    />
                  </div>

                  <button
                    onClick={handleSaveTextChanges}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E84383] text-white font-bold text-sm shadow hover:bg-[#FF69A6] transition-colors"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Love Letter Changes</span>
                  </button>
                </div>
              )}

              {/* TAB 4: TITLES & FINALE QUOTES */}
              {activeTab === 'quotes' && (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Hero Greeting (Opening Screen):
                      </label>
                      <input
                        type="text"
                        value={heroGreeting}
                        onChange={(e) => setHeroGreeting(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">
                        Big Love Title:
                      </label>
                      <input
                        type="text"
                        value={bigLoveTitle}
                        onChange={(e) => setBigLoveTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Big Love Subtitle:
                    </label>
                    <input
                      type="text"
                      value={bigLoveSubtitle}
                      onChange={(e) => setBigLoveSubtitle(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                    />
                  </div>

                  <div className="border-t border-pink-200 pt-4 space-y-3">
                    <h5 className="font-serif font-bold text-sm text-[#E84383]">
                      Final Grand Section Quotes
                    </h5>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Quote 1:</label>
                      <input
                        type="text"
                        value={finalQuote1}
                        onChange={(e) => setFinalQuote1(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Quote 2:</label>
                      <input
                        type="text"
                        value={finalQuote2}
                        onChange={(e) => setFinalQuote2(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-slate-500 mb-0.5">Quote 3:</label>
                      <input
                        type="text"
                        value={finalQuote3}
                        onChange={(e) => setFinalQuote3(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                    </div>
                  </div>

                  <div className="border-t border-pink-200 pt-4">
                    <label className="block text-xs font-bold text-slate-700 mb-1">
                      Secret Easter Egg Surprise Message:
                    </label>
                    <input
                      type="text"
                      value={secretMsg}
                      onChange={(e) => setSecretMsg(e.target.value)}
                      className="w-full px-3 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                    />
                  </div>

                  <button
                    onClick={handleSaveTextChanges}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#E84383] text-white font-bold text-sm shadow hover:bg-[#FF69A6] transition-colors mt-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save All Quote Changes</span>
                  </button>
                </div>
              )}

              {/* TAB 5: BACKUP & SECURITY */}
              {activeTab === 'backup' && (
                <div className="space-y-6">
                  {/* Export Gift Package */}
                  <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm">
                    <h4 className="font-serif font-bold text-base text-[#E84383] mb-1">
                      Export Surprise Gift Package (JSON)
                    </h4>
                    <p className="text-xs text-slate-600 mb-4">
                      Download all your uploaded photos, love letters, and customized memories as a single file. You can keep this safe or upload it when deploying!
                    </p>
                    <button
                      onClick={() => exportGiftPackage(data)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#FF69A6] to-[#E84383] text-white font-semibold text-sm shadow hover:shadow-pink-300 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Gift Package (.json)</span>
                    </button>
                  </div>

                  {/* Import Gift Package */}
                  <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm">
                    <h4 className="font-serif font-bold text-base text-[#E84383] mb-1">
                      Restore / Import Gift Package
                    </h4>
                    <p className="text-xs text-slate-600 mb-4">
                      Upload a previously exported surprise backup file to restore all photos and settings.
                    </p>
                    <label className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-pink-100 hover:bg-pink-200 text-[#E84383] font-semibold text-sm cursor-pointer transition-colors border border-pink-200">
                      <Upload className="w-4 h-4" />
                      <span>Choose .json File to Import</span>
                      <input
                        type="file"
                        accept=".json,application/json"
                        className="hidden"
                        onChange={handleImportJson}
                      />
                    </label>
                  </div>

                  {/* Change Password */}
                  <div className="bg-white p-5 rounded-2xl border border-pink-200 shadow-sm space-y-3">
                    <h4 className="font-serif font-bold text-base text-[#E84383]">
                      Change Admin Password
                    </h4>
                    <div className="flex gap-3">
                      <input
                        type="password"
                        placeholder="New password"
                        value={newAdminPass}
                        onChange={(e) => setNewAdminPass(e.target.value)}
                        className="px-4 py-2 text-xs rounded-xl border border-pink-200 focus:outline-none focus:border-[#E84383]"
                      />
                      <button
                        onClick={handleSaveTextChanges}
                        className="px-5 py-2 rounded-xl bg-slate-800 text-white text-xs font-semibold hover:bg-slate-700"
                      >
                        Update Password
                      </button>
                    </div>
                  </div>

                  {/* Logout */}
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={logoutAdmin}
                      className="text-xs text-slate-500 hover:text-red-500 font-semibold"
                    >
                      Lock Admin Session
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Status Bar */}
            <div className="px-6 py-3 bg-white border-t border-pink-100 flex items-center justify-between">
              <span className="text-xs text-slate-500">
                {isSaving ? 'Saving changes...' : 'All edits are saved to browser storage'}
              </span>

              {saveSuccess && (
                <div className="inline-flex items-center gap-1.5 text-xs text-emerald-600 font-semibold animate-fadeIn">
                  <CheckCircle className="w-4 h-4" />
                  <span>Changes saved successfully! 💗</span>
                </div>
              )}

              <button
                onClick={() => setIsAdminOpen(false)}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#FF69A6] to-[#E84383] text-white font-bold text-xs shadow-md"
              >
                Close & View Website
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
