import React, { useEffect } from 'react';
import { RootNavigator } from './navigation/RootNavigator';
import { useRootStore } from './stores';


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
    ) : <></>;
}

export default App;
