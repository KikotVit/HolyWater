import React from 'react';
import { Header, Screen } from '../../components';
import { NavigationRef } from '../../navigation';
import { Reels } from './components';
import { useRootStore } from '../../stores';

export const WatchScreen = () => {

    const [currentSeriesItem, setCurrentSeriesList] = useRootStore(state => [state.currentSeriesItem, state.setCurrentSeriesList]);

    const onLeftPress = () => {
        setCurrentSeriesList();
        NavigationRef.goBack();
    };
    
    return (
        <Screen >
            <Header leftIcon='arrowLeft' title={'episodes'} onLeftPress={onLeftPress}/>
            <Reels videos={currentSeriesItem.episodes} />
        </Screen>
    );
};