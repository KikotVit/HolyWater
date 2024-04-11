import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenProps } from 'react-native-screens';
import { palette } from '../../theme/palette';
import { colors } from '../../theme/colors';

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
