import React, { useEffect, useRef } from 'react';
import { MainNavParamList, RootNavigator } from './navigation/RootNavigator';
import { NavigationContainerRef } from '@react-navigation/native';
import { useRootStore } from './stores';


function App(): React.JSX.Element {

    const [loadConfig, isHydrated] = useRootStore(state => [state.loadConfig, state.isHydrated]);

    useEffect(() => {
        if (isHydrated) {
            (async() => await loadConfig())();
        }
    }, [isHydrated]);
    

    const navigationRef = useRef<NavigationContainerRef<MainNavParamList>>(null);

    return isHydrated ? (

        <RootNavigator
            ref={navigationRef}
        />
    ) : null;
}

export default App;
