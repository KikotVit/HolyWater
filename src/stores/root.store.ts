
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ILastViewed, IRootStore, ISeriesItem } from './root.store.types';
import { mockMainContent } from '../mock/mockData';
import { produce } from 'immer';
import R from 'ramda';



export const useRootStoreZustand = createWithEqualityFn<IRootStore>()(persist(immer(((set, get) => ({
    isHydrated: false,
    mainContent: [],
    currentSeriesItem: undefined,
    currentRomanceItem: undefined,
    lastViewed: undefined,
    currentHeaderTitle: undefined,
    currentProgress: 0,
    seekValue: 0,
    currentDuration: 0,
    isNeedContinue: false,
    isPaused: false,
    setIsNeedContinue: (isNeed) => set((state) => {
        state.isNeedContinue = isNeed;
    }),
    setIsPaused: (paused) => set((state) => {
        state.isPaused = paused;
    }),
    loadConfig: async () => {
        console.log('loadConfig');
        const lastViewed = get().lastViewed;

        const res = mockMainContent;

        let mainContent;
        
        if (res) {
            mainContent = res;
            if (lastViewed) {
                mainContent = R.insert(1, lastViewed, res);
            }
        }

        set((state) => {
            state.mainContent = mainContent;
        });
    },
    setCurrentHeaderTitle: (title) => set((state) => {
        state.currentHeaderTitle = title;
    }),
    setCurrentProgress: (progress) => set((state) => {
        state.currentProgress = progress;
    }),
    setCurrentDuration: (duration) => set((state) => {
        state.currentDuration = duration;
    }),
    setSeekValue: (value) => set((state) => {
        state.seekValue = value;
    }),
    setCurrentSeriesList: (series?: ISeriesItem) => set((state) => {
        state.currentSeriesItem = series;
    }),
    updateLastViewed: (args) => set((state) => {
        const lastViewedItem = get().lastViewed;
        state.lastViewed = { ...lastViewedItem, ...args };
    }),
    setLastViewed: (args) => set((state) => {
        state.lastViewed = { ...state.lastViewed, ...args };
    }),
    setCurrentRomanceItem: (romance) => set((state) => {
        state.currentRomanceItem = romance;
    }),
    setHasHydrated: (isHydrated) => {
        set((state) => {
            state.isHydrated = isHydrated;
        });
    },
}))), {
    name: 'root-store',
    storage: createJSONStorage(() => AsyncStorage),
    onRehydrateStorage: () => state => {
        state?.setHasHydrated(true);
    },
    // partialize: (state) => ({add exception}),
}));
