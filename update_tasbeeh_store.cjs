const fs = require('fs');
let store = fs.readFileSync('src/store/useStore.ts', 'utf8');

const interfaceAdd = `
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
`;

store = store.replace('tasbeehCount: number;', interfaceAdd + '  tasbeehCount: number;');

const implAdd = `
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
            week: state.tasbeehStats.week + 1,
            month: state.tasbeehStats.month + 1,
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
`;

store = store.replace('tasbeehCount: 0,', implAdd + '      tasbeehCount: 0,');

fs.writeFileSync('src/store/useStore.ts', store);
