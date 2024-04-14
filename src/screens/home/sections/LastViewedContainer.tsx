import React from 'react';
import { SectionHeader } from './SectionHeader';
import { Dimensions, Image, ImageStyle, Pressable, View, ViewStyle } from 'react-native';
import { colors, spacing } from '../../../theme';
import { Icon, Text } from '../../../components';
import { useRootStore } from '../../../stores';
import { NavigationRef } from '../../../navigation';

const { width, height } = Dimensions.get('screen');

const CONTAINER_HEIGHT = 68;
const THUMBNAIL_WIDTH = 56;
const CONTAINER_PADDING = spacing[4];
const GAP = spacing[2];

export const LastViewedContainer = () => {

    const [setCurrentSeriesList, setIsNeedContinue, lastViewed] = useRootStore(state => [state.setCurrentSeriesList, state.setIsNeedContinue, state.lastViewed]);

    const getImage = () => {
        return lastViewed.item.type === 'series'
            ? require('../../../mock/images/mainBanner.png')
            : require('../../../mock/images/book1.png');
    };

    const handlePress = () => {
        if (lastViewed.item.type === 'series') {
            setCurrentSeriesList(lastViewed.item);
            setIsNeedContinue(true);
            NavigationRef.navigate('watchScreen');
            return;
        }
        if (lastViewed.item.type === 'romance') {
            //setCurrentRomance in store
            console.log('romance');
            NavigationRef.navigate('readScreen');
            return;
        }
    };

    const getSubtitle= () => {
        return lastViewed.item.type === 'series' 
            ? lastViewed.item.episodes[lastViewed.activeIndex].title
            : '';
    };

    return (
        <>
            <SectionHeader title={'Continue watching'} />
            <View 
                style={ROOT}
            >
                <Pressable
                    style={({ pressed }) => ({
                        ...CONTAINER,
                        backgroundColor: colors.continueContainer,
                        transform: [{ scale: pressed ? 0.98 : 1 }],
                    })}
                    onPress={handlePress}
                >
                    <Image
                        style={THUMBNAIL}
                        source={getImage()}
                    />
                    <View 
                        style={TITLE_CONTAINER}
                    >
                        <Text
                            preset='bold'
                            style={{
                                fontSize: 16,
                            }}
                            text={lastViewed.item.title}
                        />
                        <Text
                            text={getSubtitle()}
                        />
                    </View>
                    <Icon
                        containerStyle={{
                            width: THUMBNAIL_WIDTH,
                        }}
                        icon='angleRight' 
                        style={{
                            tintColor: colors.text,
                        }}
                    />
                </Pressable>
            </View>
        </>
    );
};

const ROOT: ViewStyle = {
    width: width,
    paddingHorizontal: spacing[4],
    height: CONTAINER_HEIGHT,
};
const CONTAINER: ViewStyle = {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 6,
    borderRadius: spacing[3],
    gap: GAP,
};
const THUMBNAIL: ImageStyle = {
    height: '100%',
    width: THUMBNAIL_WIDTH,
    borderRadius: spacing[2],
    resizeMode: 'cover',
};

const TITLE_CONTAINER: ViewStyle = {
    width: width - CONTAINER_PADDING * 2 - THUMBNAIL_WIDTH * 2 - GAP * 2,
};