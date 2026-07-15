import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface SettingsState {
  
  bookmarkedHadiths: string[];
  toggleHadithBookmark: (id: string) => void;
  lastReadHadith: string | null;
  setLastReadHadith: (id: string | null) => void;

  bookmarkedAyahs: { surah: number; surahName: string; ayah: number; text: string }[];
  toggleAyahBookmark: (bookmark: { surah: number; surahName: string; ayah: number; text: string }) => void;
  favoriteAzkar: string[];
  toggleFavoriteZikr: (id: string) => void;
  completedAzkar: string[];
  toggleCompletedZikr: (id: string) => void;
  clearCompletedAzkar: () => void;
  theme: 'light' | 'dark' | 'system' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'system' | 'auto') => void;
  quranFontSize: number;
  setQuranFontSize: (size: number) => void;
  quranFontFamily: string;
  setQuranFontFamily: (font: string) => void;
  qariId: string;
  setQariId: (id: string) => void;
  downloadedReciters: string[];
  addDownloadedReciter: (id: string) => void;
  removeDownloadedReciter: (id: string) => void;
  
  tasbeehGoal: number;
  setTasbeehGoal: (goal: number) => void;
  tasbeehZikr: string;
  setTasbeehZikr: (zikr: string) => void;
  customAzkar: string[];
  addCustomZikr: (zikr: string) => void;
  tasbeehStats: {
    today: number;
    week: number;
    month: number;
    total: number;
    lastDate: string;
    sessions: number;
  };
  incrementTasbeehStats: () => void;
  tasbeehSettings: {
    sound: boolean;
    vibration: boolean;
    animations: boolean;
    material: string;
  };
  updateTasbeehSettings: (settings: Partial<SettingsState['tasbeehSettings']>) => void;
  tasbeehCount: number;
  setTasbeehCount: (count: number) => void;
  
  khatmaProgress: number;
  setKhatmaProgress: (progress: number) => void;
  hapticFeedback: boolean;
  setHapticFeedback: (enabled: boolean) => void;
  lastRead: { surah: number; ayah: number } | null;
  completedSurahs: number[];
  toggleSurahCompleted: (surah: number) => void;
  setLastRead: (lastRead: { surah: number; ayah: number } | null) => void;
  notificationsEnabled: boolean;
  setNotificationsEnabled: (enabled: boolean) => void;
  morningAzkarTime: string;
  setMorningAzkarTime: (time: string) => void;
  eveningAzkarTime: string;
  setEveningAzkarTime: (time: string) => void;
}

export const useStore = create<SettingsState>()(
  persist(
    (set) => ({
      theme: 'system',
      setTheme: (theme) => set({ theme }),
      quranFontSize: 24,
      setQuranFontSize: (size) => set({ quranFontSize: size }),
      quranFontFamily: 'Amiri',
      setQuranFontFamily: (font) => set({ quranFontFamily: font }),
      qariId: 'ar.alafasy',
      setQariId: (id) => set({ qariId: id }),
      downloadedReciters: [],
      addDownloadedReciter: (id) => set((state) => ({ downloadedReciters: [...new Set([...state.downloadedReciters, id])] })),
      removeDownloadedReciter: (id) => set((state) => ({ downloadedReciters: state.downloadedReciters.filter(r => r !== id) })),
      
      tasbeehGoal: 100,
      setTasbeehGoal: (goal) => set({ tasbeehGoal: goal }),
      tasbeehZikr: 'سُبْحَانَ اللَّهِ',
      setTasbeehZikr: (zikr) => set({ tasbeehZikr: zikr }),
      customAzkar: [],
      addCustomZikr: (zikr) => set((state) => ({ customAzkar: [...state.customAzkar, zikr] })),
      tasbeehStats: { today: 0, week: 0, month: 0, total: 0, lastDate: new Date().toISOString().split('T')[0], sessions: 0 },
      incrementTasbeehStats: () => set((state) => {
        const todayStr = new Date().toISOString().split('T')[0];
        const isNewDay = state.tasbeehStats.lastDate !== todayStr;
        return {
          tasbeehStats: {
            ...state.tasbeehStats,
            today: isNewDay ? 1 : state.tasbeehStats.today + 1,
            week: isNewDay ? 1 : state.tasbeehStats.week + 1, // Simplified week
            month: isNewDay ? 1 : state.tasbeehStats.month + 1, // Simplified month
            total: state.tasbeehStats.total + 1,
            lastDate: todayStr,
          }
        };
      }),
      tasbeehSettings: {
        sound: true,
        vibration: true,
        animations: true,
        material: 'wood',
      },
      updateTasbeehSettings: (settings) => set((state) => ({ tasbeehSettings: { ...state.tasbeehSettings, ...settings } })),
      tasbeehCount: 0,
      setTasbeehCount: (count) => set({ tasbeehCount: count }),
      
      khatmaProgress: 0,
      setKhatmaProgress: (progress) => set({ khatmaProgress: progress }),
      hapticFeedback: true,
      setHapticFeedback: (enabled) => set({ hapticFeedback: enabled }),
      lastRead: null,
      
      
      bookmarkedHadiths: [],
      toggleHadithBookmark: (id) => set((state) => ({ bookmarkedHadiths: state.bookmarkedHadiths.includes(id) ? state.bookmarkedHadiths.filter(h => h !== id) : [...state.bookmarkedHadiths, id] })),
      lastReadHadith: null,
      setLastReadHadith: (id) => set({ lastReadHadith: id }),

      bookmarkedAyahs: [],
      toggleAyahBookmark: (bookmark) => set((state) => {
        const exists = state.bookmarkedAyahs.find(b => b.surah === bookmark.surah && b.ayah === bookmark.ayah);
        if (exists) {
          return { bookmarkedAyahs: state.bookmarkedAyahs.filter(b => !(b.surah === bookmark.surah && b.ayah === bookmark.ayah)) };
        } else {
          return { bookmarkedAyahs: [...state.bookmarkedAyahs, bookmark] };
        }
      }),
      favoriteAzkar: [],
      toggleFavoriteZikr: (id) => set((state) => ({ favoriteAzkar: state.favoriteAzkar.includes(id) ? state.favoriteAzkar.filter(a => a !== id) : [...state.favoriteAzkar, id] })),
      completedAzkar: [],
      toggleCompletedZikr: (id) => set((state) => ({ completedAzkar: state.completedAzkar.includes(id) ? state.completedAzkar.filter(a => a !== id) : [...state.completedAzkar, id] })),
      clearCompletedAzkar: () => set({ completedAzkar: [] }),
      completedSurahs: [],
      toggleSurahCompleted: (surah) => set((state) => ({ completedSurahs: (state.completedSurahs || []).includes(surah) ? (state.completedSurahs || []).filter(s => s !== surah) : [...(state.completedSurahs || []), surah] })),
      setLastRead: (lastRead) => set({ lastRead }),
      notificationsEnabled: false,
      setNotificationsEnabled: (enabled) => set({ notificationsEnabled: enabled }),
      morningAzkarTime: '06:00',
      setMorningAzkarTime: (time) => set({ morningAzkarTime: time }),
      eveningAzkarTime: '17:00',
      setEveningAzkarTime: (time) => set({ eveningAzkarTime: time }),
    }),
    {
      name: 'noor-al-quran-storage',
    }
  )
);
