const fs = require('fs');
let code = fs.readFileSync('src/store/useStore.ts', 'utf8');

if (!code.includes('downloadedReciters')) {
  code = code.replace(
    'qariId: string;\n  setQariId: (id: string) => void;',
    'qariId: string;\n  setQariId: (id: string) => void;\n  downloadedReciters: string[];\n  addDownloadedReciter: (id: string) => void;\n  removeDownloadedReciter: (id: string) => void;'
  );
  
  code = code.replace(
    'qariId: \'ar.alafasy\',\n      setQariId: (id) => set({ qariId: id }),',
    'qariId: \'ar.alafasy\',\n      setQariId: (id) => set({ qariId: id }),\n      downloadedReciters: [],\n      addDownloadedReciter: (id) => set((state) => ({ downloadedReciters: [...new Set([...state.downloadedReciters, id])] })),\n      removeDownloadedReciter: (id) => set((state) => ({ downloadedReciters: state.downloadedReciters.filter(r => r !== id) })),'
  );
  fs.writeFileSync('src/store/useStore.ts', code);
}
