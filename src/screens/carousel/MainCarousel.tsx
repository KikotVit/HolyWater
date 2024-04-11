import React from 'react';
import Carousel from 'react-native-reanimated-carousel';
import { ICommonContent, IRomanceItem, ISeriesItem } from '../../mock/mockData';
import { Dimensions, Image, ImageStyle, Pressable, View, ViewStyle } from 'react-native';
import { spacing } from '../../theme/spacing';
import { Text } from '../../components/text/Text';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { IMainCarouselItemProps } from './MainCarousel.props';
import { colors } from '../../theme/colors';

const { width } = Dimensions.get('screen');

const MainCarouselItem = ({ item, onPress }: {item : (ISeriesItem | IRomanceItem), onPress: () => void}) => {

    console.log('item: ', item);
    return (
        <Pressable
            style={
                ({ pressed }) => (
                    [
                        { transform: [{ scale: pressed ? 0.995 : 1 }] },
                        {
                            justifyContent: 'center',
                            marginHorizontal: spacing[4],
                        },
                    ]
                )}
            onPress={onPress}
        >
            <View style={CAROUSEL_ITEM}>
                <Image
                    style={[IMAGE, { resizeMode: item?.imageUrl  ? 'cover' : undefined, backgroundColor: colors.background }]}
                    source={
                        item.imageUrl
                    }
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
                        text={item.type?.toUpperCase()}
                        style={{
                            fontSize: 11,
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
                        numberOfLines={1} 
                    />
                    <Text
                        preset='subtitle'
                        text={item.subtitle}
                        numberOfLines={1} 
                    />
                </View>
                
            </View>
        </Pressable>
    );
};

export const MainCarousel = (item: ICommonContent) => {
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    

    const handleCarouselItemPress = (item: (ISeriesItem | IRomanceItem)) => {
        if (item.type === 'series') {
            //setCurrentSeriesList in store
            navigation.navigate('watchScreen');
            return;
        }
        if (item.type === 'romance') {
            //setCurrentRomance in store
            navigation.navigate('readScreen');
        }
    };
    return (
        <Carousel
            data={item.items}
            loop={false}
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
            pagingEnabled={true} // If enabled, releasing the touch will scroll to the nearest item, valid when pagingEnabled=false
            renderItem={({ item }) => <MainCarouselItem item={item} onPress={() => handleCarouselItemPress(item)} />}
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