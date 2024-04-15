import React from 'react';
import { StatusBar, View, ViewStyle } from 'react-native';
import { colors } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface IScreenProps {
    style?: ViewStyle;
    children?: React.ReactNode;
}

export const Screen = (props: IScreenProps) => {

    const styleOverride: ViewStyle = props.style;
    
    const insets = useSafeAreaInsets();
    return (
        <View style={{ flex: 1, backgroundColor: colors.background, paddingBottom: insets.bottom, ...styleOverride }}>
            <StatusBar
                animated={false}
                barStyle={'light-content'}
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
