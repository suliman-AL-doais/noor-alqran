const fs = require('fs');
let store = fs.readFileSync('src/store/useStore.ts', 'utf8');

// add favoriteAzkar and completedAzkar to SettingsState
store = store.replace(
  'interface SettingsState {',
  'interface SettingsState {\n  favoriteAzkar: string[];\n  toggleFavoriteZikr: (id: string) => void;\n  completedAzkar: string[];\n  toggleCompletedZikr: (id: string) => void;\n  clearCompletedAzkar: () => void;'
);

// add to create
store = store.replace(
  'completedSurahs: [],',
  'favoriteAzkar: [],\n      toggleFavoriteZikr: (id) => set((state) => ({ favoriteAzkar: state.favoriteAzkar.includes(id) ? state.favoriteAzkar.filter(a => a !== id) : [...state.favoriteAzkar, id] })),\n      completedAzkar: [],\n      toggleCompletedZikr: (id) => set((state) => ({ completedAzkar: state.completedAzkar.includes(id) ? state.completedAzkar.filter(a => a !== id) : [...state.completedAzkar, id] })),\n      clearCompletedAzkar: () => set({ completedAzkar: [] }),\n      completedSurahs: [],'
);

fs.writeFileSync('src/store/useStore.ts', store);
