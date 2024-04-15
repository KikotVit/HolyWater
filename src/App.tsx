import React, { useEffect, useRef, useState } from 'react';
import { MainNavParamList, RootNavigator } from './navigation/RootNavigator';
import { NavigationContainerRef } from '@react-navigation/native';
import { useRootStore } from './stores';
import { useRootStoreZustand } from './stores/root.store';


function App(): React.JSX.Element {

    const [loadConfig, isHydrated] = useRootStore(state => [state.loadConfig, state.isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            (async() => await loadConfig())();
        }
    }, [isHydrated]);
    console.log('isHydrated: ', isHydrated);
    


    return isHydrated ? (

        <RootNavigator />
    ) : null;
}

export default App;
