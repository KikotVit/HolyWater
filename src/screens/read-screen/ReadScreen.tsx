import React from 'react';
import { Header, Screen, Text } from '../../components';
import { NavigationRef } from '../../navigation';
import { useRootStore } from '../../stores';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT, colors, spacing } from '../../theme';
import { Dimensions, ScrollView, View } from 'react-native';

const { height } = Dimensions.get('window');

export const ReadScreen = () => {
    const insets = useSafeAreaInsets();

    const [
        setCurrentRomanceItem,
        currentRomanceItem,
        updateLastViewed,
    ] = useRootStore(state => [
        state.setCurrentRomanceItem,
        state.currentRomanceItem,
        state.updateLastViewed,
    ]);

    const onLeftPress = () => {
        setCurrentRomanceItem();
        NavigationRef.goBack();
    };

    const handleScroll = (event) => {
        const offsetY = Math.round(event.nativeEvent.contentOffset.y);
        updateLastViewed({ progress: offsetY });
    };
    
    return (
        <Screen 
            style={{
                backgroundColor: colors.text,
                paddingBottom: 0,
            }}
        >
            <Header leftIcon='arrowLeft' title={currentRomanceItem.title} onLeftPress={onLeftPress}/>
            
            <ScrollView 
                onScrollEndDrag={handleScroll}
                decelerationRate={'fast'}
                style={{
                    paddingTop: insets.top,
                    paddingHorizontal: spacing[4],
                    height: height - HEADER_HEIGHT - insets.top,
                }}
            >
                <View style={{ height : HEADER_HEIGHT }} />
                <Text
                    style={{
                        marginTop: HEADER_HEIGHT,
                        fontSize: 18,
                        color: colors.background,
                    }}
                    text={currentRomanceItem.text}
                />
                <View style={{ height : 100 }} />
            </ScrollView>
        </Screen>
    );
};
