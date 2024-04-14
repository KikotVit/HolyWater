import React from 'react';
import { Header, Screen } from '../../components';
import { NavigationRef } from '../../navigation';
import { ProgressBar, Reels } from './components';
import { useRootStore } from '../../stores';



export const WatchScreen = () => {

    const [
        setCurrentSeriesList,
        currentHeaderTitle,
    ] = useRootStore(state => [
        state.setCurrentSeriesList,
        state.currentHeaderTitle,
    ]);

    const onLeftPress = () => {
        setCurrentSeriesList();
        NavigationRef.goBack();
    };
    
    return (
        <Screen >
            <Header leftIcon='arrowLeft' title={currentHeaderTitle} onLeftPress={onLeftPress}/>
            <Reels />
            <ProgressBar />
        </Screen>
    );
};