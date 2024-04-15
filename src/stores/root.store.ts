
import { persist, createJSONStorage } from 'zustand/middleware';
import { createWithEqualityFn } from 'zustand/traditional';
import { immer } from 'zustand/middleware/immer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { IRootStore, ISeriesItem } from './root.store.types';
import { mockMainContent } from '../mock/mockData';
import remoteConfig from '@react-native-firebase/remote-config';
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

        let mainContent;

        try {
            const isActivated = await remoteConfig().fetchAndActivate();
            if (isActivated) {
                console.log('Configs were retrieved from the backend and activated.');
                const remoteConfigValues = remoteConfig().getAll();
                let res = [];

                if (remoteConfigValues.mainContent && remoteConfigValues.mainContent._value) {
                    res = JSON.parse(remoteConfigValues.mainContent._value)
                }
                if (lastViewed) {
                    mainContent = R.insert(1, lastViewed, res);
                } else {
                    mainContent = res;
                }
        
                set((state) => {
                    state.mainContent = mainContent;
                });
            } else {
                set((state) => {
                    state.mainContent = [];
                });
            }
        } catch (error) {
            console.error('Error occurred while fetching and activating remote config:', error);
            set((state) => {
                state.mainContent = [];
                // or state.mainContent = mockMainContent;
            });
        }

       
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
        if (lastViewedItem) {
            state.lastViewed = { ...lastViewedItem, ...args };
        }
    }),
    setLastViewed: (args) => set((state) => {
        state.lastViewed = { ...state.lastViewed, ...args };
    }),
    setCurrentRomanceItem: (romance) => set((state) => {
        console.log('romance: ', romance);
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
