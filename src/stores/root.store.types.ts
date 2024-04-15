export interface IEpisode {
    id: string,
    title: string;
    link: string;
}

export interface ISeriesItem {
    type: 'series';
    title: string;
    subtitle: string;
    imageUrl: string;
    episodes: IEpisode[];
}

export interface IRomanceItem {
    type: 'romance';
    title: string;
    subtitle: string;
    imageUrl: string;
    text: string;
}

export interface ITrendingItem {
    title: string;
    imageUrl: string;
    isLocked?: boolean;
    comingDate?: string;
    link?: string;
}

export interface IListSection {
    type: 'list';
    title: string;
    items: ITrendingItem[];
}

export interface ICommonContent {
    type: 'common';
    items: (ISeriesItem | IRomanceItem)[];
}

export interface ILastViewed {
    type: 'lastViewed';
    item: ISeriesItem | IRomanceItem;
    activeIndex: number;
    progress: number; 
}

export interface IRootStore {
    isHydrated: boolean;
    mainContent: (ICommonContent | IListSection | ILastViewed)[];
    currentSeriesItem?: ISeriesItem;
    currentRomanceItem?: IRomanceItem;
    currentHeaderTitle?: string;
    currentProgress: number;
    currentDuration: number;
    lastViewed?: ILastViewed;
    isNeedContinue: boolean,
    isPaused: boolean,
    seekValue: number,
    setCurrentProgress: (progress: number) => void,
    setCurrentDuration: (duration: number) => void,
    setSeekValue: (duration: number) => void,
    setCurrentHeaderTitle: (title: string) => void,
    setIsNeedContinue: (isNeed: boolean) => void,
    setIsPaused: (paused: boolean) => void,
    setHasHydrated: (paused: boolean) => void,
    loadConfig: () => Promise<void>;
    setCurrentSeriesList: (list?: ISeriesItem) => void;
    updateLastViewed: (args: {progress?: number, activeIndex?: number}) => void;
    setLastViewed: (args: ILastViewed) => void;
    setCurrentRomanceItem: (item?: IRomanceItem) => void;
}