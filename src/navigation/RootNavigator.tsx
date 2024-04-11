import React from 'react';
import {
    NavigationContainerRef,
    NavigationContainer,
} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeScreen } from '../screens/HomeScreen';

export type MainNavParamList = {
    home: undefined;
    watchScreen: undefined;
};

const Stack = createNativeStackNavigator<MainNavParamList>();


export const RootNavigator = React.forwardRef<
    NavigationContainerRef<MainNavParamList>,
    Partial<React.ComponentProps<typeof NavigationContainer>>
>((props, ref) => {

    return (
        <NavigationContainer
            {...props}
            ref={ref}
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
            </Stack.Navigator>
        </NavigationContainer>
    );
});

RootNavigator.displayName = 'RootNavigator';