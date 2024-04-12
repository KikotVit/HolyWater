import React from 'react';
import {
    NavigationContainerRef,
    NavigationContainer,
    createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WatchScreen } from '../screens';

export type MainNavParamList = {
    home: undefined;
    watchScreen: undefined;
};

const Stack = createNativeStackNavigator<MainNavParamList>();
export const NavigationRef = createNavigationContainerRef<MainNavParamList>();


export const RootNavigator = React.forwardRef<
    NavigationContainerRef<MainNavParamList>,
    Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {

    return (
        <NavigationContainer
            ref={NavigationRef}
        >
            <Stack.Navigator
                screenOptions={{
                    headerShown: false,
                    gestureEnabled: false,
                    navigationBarHidden: true,
                }}
                initialRouteName='home'
            >
                <Stack.Screen name='home' component={HomeScreen} options={{ animation: 'slide_from_left' }} />
                <Stack.Screen name='watchScreen' component={WatchScreen} options={{ animation: 'slide_from_left' }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
});

RootNavigator.displayName = 'RootNavigator';