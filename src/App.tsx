import React, { useRef } from 'react';
import { MainNavParamList, RootNavigator } from './navigation/RootNavigator';
import { NavigationContainerRef } from '@react-navigation/native';


function App(): React.JSX.Element {

    const navigationRef = useRef<NavigationContainerRef<MainNavParamList>>(null);

    return (
        <RootNavigator
            ref={navigationRef}
        />
    );
}

export default App;
