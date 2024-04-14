import React from 'react';
import {
    NavigationContainer,
    createNavigationContainerRef,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen, WatchScreen } from '../screens';

export type MainNavParamList = {
    home: undefined;
    watchScreen: undefined;
    readScreen: undefined;
};

const Stack = createNativeStackNavigator<MainNavParamList>();
export const NavigationRef = createNavigationContainerRef<MainNavParamList>();


export const RootNavigator = (() => {

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
                <Stack.Screen name='watchScreen' component={WatchScreen} options={{ animation: 'slide_from_right' }} />
                {/* <Stack.Screen name='readScreen' component={ReadScreen} options={{ animation: 'slide_from_right' }} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    );
});