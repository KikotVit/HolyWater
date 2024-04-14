
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
    lastViewed: undefined,
    currentHeaderTitle: undefined,
    isNeedContinue: false,
    setIsNeedContinue: (isNeed) => set((state) => {
        state.isNeedContinue = isNeed;
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

        console.log('mainContent: ', mainContent);

        set((state) => {
            state.mainContent = mainContent;
        });
    },
    setCurrentHeaderTitle: (title: string) => set((state) => {
        state.currentHeaderTitle = title;
    }),
    setCurrentSeriesList: (series?: ISeriesItem) => set((state) => {
        state.currentSeriesItem = series;
    }),
    updateLastViewed: (args: {progress?: number, activeIndex?: number}) => set((state) => {
        const lastViewedItem = get().lastViewed;
        state.lastViewed = { ...lastViewedItem, ...args };
    }),
    setLastViewed: (args: ILastViewed) => set((state) => {
        console.log('args: ', args);
        state.lastViewed = { ...state.lastViewed, ...args };
    }),
}))), {
    name: 'root-store',
    storage: createJSONStorage(() => AsyncStorage),
    onRehydrateStorage: () =>
        produce((state) => {
            if (state) {
                state.isHydrated = true;
            }
        }),
    // partialize: (state) => ({add exception}),
}));
