import React, { useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { colors } from '../../../theme';
import { IEpisode } from '../../../mock/mockData';
import { ReelCard } from './ReelCard';

export const Reels = ({ videos }: { videos: IEpisode[] }) => {
    const FlatlistRef = useRef(null);
    const [ViewableItem, SetViewableItem] = useState('');
    const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 70 });

    // Viewable configuration
    const onViewRef = useRef(viewableItems => {
        if (viewableItems?.viewableItems?.length > 0)
            SetViewableItem(viewableItems.viewableItems[0].item.link);
    });

    return (
        <FlatList
            ref={FlatlistRef}
            style={{
                backgroundColor: colors.background,
            }}
            data={videos}
            keyExtractor={item => item.link}
            renderItem={({ item, index }) => (
                <ReelCard
                    {...item}
                    index={index}
                    ViewableItem={ViewableItem}
                    onFinishPlaying={index => {
                        console.log('index: onFinishPlaying', index);
                        if (index !== videos.length - 1 && FlatlistRef.current) {
                            FlatlistRef.current.scrollToIndex({
                                index: index + 1,
                            });
                        }
                    }}
                />
            )}
            pagingEnabled
            decelerationRate={0.9}
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
        />
    );
};
