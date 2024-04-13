import React from 'react';
import { StatusBar, View } from 'react-native';
import { ScreenProps } from 'react-native-screens';
import { colors } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export const Screen = (props: ScreenProps) => {
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingBottom: insets.bottom }}>
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
