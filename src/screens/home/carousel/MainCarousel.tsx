import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { Dimensions, Image, ImageStyle, View, ViewStyle } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { NavigationRef } from '../../../navigation';
import { colors, spacing } from '../../../theme';
import { Text } from '../../../components';
import { useRootStore } from '../../../stores';
import { ICommonContent, IRomanceItem, ISeriesItem } from '../../../stores/root.store.types';

const { width } = Dimensions.get('screen');

const MainCarouselItem = ({ item }: {item : (ISeriesItem | IRomanceItem)}) => {

    const [
        setCurrentSeriesList,
        setCurrentProgress,
        setCurrentRomanceItem,
    ] = useRootStore(state => [
        state.setCurrentSeriesList,
        state.setCurrentProgress,
        state.setCurrentRomanceItem,
    ]);

    const onPress = () => {
        if (item.type === 'series') {
            setCurrentSeriesList(item);
            setCurrentProgress(0);
            NavigationRef.navigate('watchScreen');
            return;
        }
        if (item.type === 'romance') {
            //setCurrentRomance in store
            setCurrentRomanceItem(item);
            NavigationRef.navigate('readScreen');
            return;
        }
    };

    const getImage = () => item.imageUrl ? { uri: item.imageUrl } : require('../../../mock/images/carousel_fallback.png');

    return (
        <TouchableWithoutFeedback
            style={{
                justifyContent: 'center',
                marginHorizontal: spacing[4],
            }}
            onPress={onPress}
        >
            <View style={CAROUSEL_ITEM}>
                <Image
                    style={[IMAGE, { resizeMode: item?.imageUrl  ? 'cover' : undefined, backgroundColor: colors.background }]}
                    source={getImage()}
                />
                <View
                    style={{
                        position: 'absolute',
                        padding: spacing[2],
                        top: 20,
                        left: 20,
                        backgroundColor: colors.background,
                        borderRadius: spacing[1],
                    }}
                >
                    <Text
                        preset='bold'
                        text={item.type}
                        style={{
                            fontSize: 11,
                            textTransform: 'uppercase',
                        }}
                        numberOfLines={1} 
                    />
                </View>
                <View
                    style={{
                        position: 'absolute',
                        padding: spacing[3],
                        bottom: 0,
                        width: '100%',
                    }}
                >
                    <Text
                        preset='title'
                        text={item.title}
                        numberOfLines={2} 
                    />
                    <Text
                        preset='subtitle'
                        text={item.subtitle}
                        numberOfLines={1} 
                    />
                </View>
                
            </View>
        </TouchableWithoutFeedback>
    );
};

export const MainCarousel = (item: ICommonContent) => {
    const isFocused = useIsFocused();
    
    return (
        <Carousel
            data={item.items}
            loop
            autoPlay={isFocused}
            autoPlayInterval={5000}
            width={width}
            mode='parallax'
            modeConfig={{
                parallaxScrollingOffset: spacing[4] * 2.3,
                parallaxScrollingScale: 1,
                parallaxAdjacentItemScale: 1,
            }}
            panGestureHandlerProps={{
                activeOffsetX: [-10, 10],
            }}
            pagingEnabled={true}
            renderItem={({ item }) => <MainCarouselItem item={item} />}
            style={{
                width: width,
                height: (width - spacing[8]) * 0.65,
            }}
        />
    );
};

const CAROUSEL_ITEM: ViewStyle = {
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: 'rgba(233, 221, 219, 0.1)',
    width: '94%',
};

const IMAGE: ImageStyle = {
    width: '100%',
    height: '100%',
};