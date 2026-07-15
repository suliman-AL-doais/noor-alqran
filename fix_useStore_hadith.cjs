const fs = require('fs');
let store = fs.readFileSync('src/store/useStore.ts', 'utf8');

const interfaceAdd = `
  bookmarkedHadiths: string[];
  toggleHadithBookmark: (id: string) => void;
  lastReadHadith: string | null;
  setLastReadHadith: (id: string | null) => void;
`;

store = store.replace('bookmarkedAyahs: {', interfaceAdd + '\n  bookmarkedAyahs: {');

const implAdd = `
      bookmarkedHadiths: [],
      toggleHadithBookmark: (id) => set((state) => ({ bookmarkedHadiths: state.bookmarkedHadiths.includes(id) ? state.bookmarkedHadiths.filter(h => h !== id) : [...state.bookmarkedHadiths, id] })),
      lastReadHadith: null,
      setLastReadHadith: (id) => set({ lastReadHadith: id }),
`;

store = store.replace('bookmarkedAyahs: [],', implAdd + '\n      bookmarkedAyahs: [],');

fs.writeFileSync('src/store/useStore.ts', store);
