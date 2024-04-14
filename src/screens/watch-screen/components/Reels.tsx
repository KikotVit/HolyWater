import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Platform } from 'react-native';
import { colors } from '../../../theme';
import { ReelCard } from './ReelCard';
import { useRootStore } from '../../../stores';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('screen');

export const Reels = () => {

    const [
        currentSeriesItem,
        setLastViewed,
        lastViewed,
        isNeedContinue,
    ] = useRootStore(state => [
        state.currentSeriesItem,
        state.setLastViewed,
        state.lastViewed,
        state.isNeedContinue,
    ]);

    const insets = useSafeAreaInsets();

    const FlatlistRef = useRef<FlatList>(null);
    const [ViewableItem, SetViewableItem] = useState('');
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

    useEffect(() => {
        console.log('isNeedContinue: ', isNeedContinue);
        if (!isNeedContinue) {
            setLastViewed({
                item: currentSeriesItem,
                activeIndex: 0,
                progress: 0,
                type: 'lastViewed',
            });
        }
        if (isNeedContinue && FlatlistRef.current && lastViewed?.activeIndex) {
            FlatlistRef.current.scrollToIndex({
                index: lastViewed.activeIndex,
                animated: false,
            });
        }
    }, []);
    

    // Viewable configuration
    const onViewRef = useRef(viewableItems => {
        if (viewableItems?.viewableItems?.length > 0)
            SetViewableItem(viewableItems.viewableItems[0].item.id);
    });

    return (
        <FlatList
            ref={FlatlistRef}
            style={{
                backgroundColor: colors.background,
            }}
            data={currentSeriesItem.episodes}
            keyExtractor={item => item.id}
            renderItem={({ item, index }) => (
                <ReelCard
                    {...item}
                    index={index}
                    ViewableItem={ViewableItem}
                    onFinishPlaying={index => {
                        console.log('index: onFinishPlaying', index);
                        if (index !== currentSeriesItem?.episodes?.length - 1 && FlatlistRef.current) {
                            FlatlistRef.current.scrollToIndex({
                                index: index + 1,
                            });
                        }
                    }}
                />
            )}
            getItemLayout={(_data, index) => ({
                length: height,
                offset: (Platform.OS === 'ios' ? height - insets.bottom : height - 24)  * index,
                index,
            })}
            pagingEnabled
            decelerationRate={0.9}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
        />
    );
};
