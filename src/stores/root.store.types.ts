export interface IEpisode {
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

export interface IRootStore {
    mainContent: (ICommonContent | IListSection)[];
    currentSeriesItem?: ISeriesItem;
    lastContent?: IEpisode;
    currentProgress?: number,
    lastProgress?: number,
    loadConfig: () => Promise<void>;
    setCurrentSeriesList: (list?: ISeriesItem) => void;
}