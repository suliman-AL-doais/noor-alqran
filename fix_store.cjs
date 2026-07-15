const fs = require('fs');
let store = fs.readFileSync('src/store/useStore.ts', 'utf8');

const interfaceAdd = `
  bookmarkedAyahs: { surah: number; surahName: string; ayah: number; text: string }[];
  toggleAyahBookmark: (bookmark: { surah: number; surahName: string; ayah: number; text: string }) => void;
`;

store = store.replace('interface SettingsState {', 'interface SettingsState {' + interfaceAdd);

const implAdd = `
      bookmarkedAyahs: [],
      toggleAyahBookmark: (bookmark) => set((state) => {
        const exists = state.bookmarkedAyahs.find(b => b.surah === bookmark.surah && b.ayah === bookmark.ayah);
        if (exists) {
          return { bookmarkedAyahs: state.bookmarkedAyahs.filter(b => !(b.surah === bookmark.surah && b.ayah === bookmark.ayah)) };
        } else {
          return { bookmarkedAyahs: [...state.bookmarkedAyahs, bookmark] };
        }
      }),
`;

store = store.replace('favoriteAzkar: [],', implAdd + 'favoriteAzkar: [],');

fs.writeFileSync('src/store/useStore.ts', store);
