import React, { useEffect, useRef } from 'react';
import { MainNavParamList, RootNavigator } from './navigation/RootNavigator';
import { NavigationContainerRef } from '@react-navigation/native';
import { useRootStore } from './stores';


function App(): React.JSX.Element {

    const [loadConfig] = useRootStore(state => [state.loadConfig]);
    useEffect(() => {
        (async() => await loadConfig())();
    }, []);
    

    const navigationRef = useRef<NavigationContainerRef<MainNavParamList>>(null);

    return (
        <RootNavigator
            ref={navigationRef}
        />
    );
}

export default App;
