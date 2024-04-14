
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRootStore, ISeriesItem } from './root.store.types';
import { mockMainContent } from '../mock/mockData';


export const useRootStoreZustand = createWithEqualityFn<IRootStore>()(persist(immer(((set, get) => ({
    mainContent: [],
    currentSeriesItem: undefined,
    lastContent: undefined,
    currentProgress: 0,
    lastProgress: 0,
    loadConfig: async () => {
        console.log('loadConfig');
        set((state) => {
            state.mainContent = mockMainContent;
        });
    },
    setCurrentSeriesList: (series?: ISeriesItem) => set((state) => {
        state.currentSeriesItem = series;
    }),
    setCurrentProgress: (progress: number) => set((state) => {
        state.currentProgress = progress;
        state.lastProgress = progress;
    }),
}))), {
    name: 'root-store',
    storage: createJSONStorage(() => AsyncStorage),
    // partialize: (state) => ({add exception}),
}));
