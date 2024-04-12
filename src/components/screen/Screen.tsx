import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenProps } from 'react-native-screens';
import { colors } from '../../theme';

export const Screen = (props: ScreenProps) => {

    return (
        <View style={{ flex: 1, backgroundColor: colors.background }}>
            <StatusBar
                animated={false}
                barStyle={'light-content'}
                showHideTransition={'none'}
            />
            <View
                style={{ 
                    flex: 1,
                }}
            >
                {props.children}
            </View>
        </View>
    );
};
