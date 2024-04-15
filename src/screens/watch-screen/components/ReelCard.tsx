// packages Imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, Pressable, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { GetDurationFormat } from '../utils';
import { HEADER_HEIGHT, colors, spacing } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../components';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from 'react-native-screens';
import { IEpisode } from '../../../stores/root.store.types';
import { useRootStore } from '../../../stores';


// Screen Dimensions
const { height, width } = Dimensions.get('window');

interface IReelCardProps extends IEpisode {
    ViewableItem: string | number,
    index: number,
    onFinishPlaying: (index: number) => void,
}

export const ReelCard = ({ link, id, ViewableItem, index, title, onFinishPlaying }: IReelCardProps ) => {

    const [
        lastViewed,
        isNeedContinue,
        setIsNeedContinue,
        updateLastViewed,
        setCurrentHeaderTitle,
        setCurrentProgress,
        setCurrentDuration,
        setIsPaused,
        isPaused,
        seekValue,
    ] = useRootStore(state => [
        state.lastViewed,
        state.isNeedContinue,
        state.setIsNeedContinue,
        state.updateLastViewed,
        state.setCurrentHeaderTitle,
        state.setCurrentProgress,
        state.setCurrentDuration,
        state.setIsPaused,
        state.isPaused,
        state.seekValue,
    ]);

    const insets = useSafeAreaInsets();

    const VideoPlayer = useRef(null);
    const [Duration, SetDuration] = useState(0);
    const [Paused, SetPaused] = useState(false);
    
    useEffect(() => {
        if (ViewableItem === id) {
            SetPaused(false);
            updateLastViewed({ activeIndex: index });
            setCurrentDuration(Duration);
            setCurrentHeaderTitle(title);
        }
        else {
            setCurrentDuration(Duration);
            SetPaused(true);
        }
    }, [ViewableItem]);

    useEffect(() => {
        if (ViewableItem === id) {
            setIsPaused(Paused);
        }
    }, [Paused]);

    useEffect(() => {
        if (ViewableItem === id) {
            try {
                if (VideoPlayer.current)
                    VideoPlayer.current.seek((seekValue * Duration) / 100 / 1000);
            } catch (error) {
                console.error('playbackStatusUpdate error: ', error);
            }
        }
        
    }, [seekValue]);
    
    

    const playbackStatusUpdate = playbackStatus => {
        if (ViewableItem === id){
            try {
                const currentTime = Math.round(playbackStatus.currentTime);
                const duration = Math.round(playbackStatus.seekableDuration);
                if (currentTime)
                    if (duration) {
                        const progress = (currentTime / duration) * 100;
                        setCurrentProgress(progress);
                        updateLastViewed({ progress });
                    }
            } catch (error) {
                console.error('playbackStatusUpdate error: ', error);
            }
        }
    };

    const onLoadComplete = event => {
        try {
            SetDuration(event.duration * 1000);
            
            if (ViewableItem === id) {
                setCurrentDuration(event.duration * 1000);
                // if continue watching
                if (isNeedContinue && lastViewed) {
                    VideoPlayer.current.seek((lastViewed.progress * event.duration) / 100);
                    setIsNeedContinue(false);
                }
            }
            
        } catch (error) {
            console.error('onLoadComplete error: ', error);
        }
    };

    const videoError = error => {
        console.log('onError videoError: ', error);

    };

    return (
        <Screen
            style={{
                backgroundColor: colors.background,
                width: width,
                height: Platform.OS === 'ios' ? height - insets.bottom : height,
                marginTop: Platform.OS === 'ios' ? 0 : 24,
                justifyContent: 'center',
            }}
        >
            <Video
                ref={VideoPlayer}
                source={{ uri: link }}
                style={{
                    width: '100%',
                    height: '100%',
                }}
                resizeMode='cover'
                onError={videoError}
                playInBackground={false}
                progressUpdateInterval={100}
                paused={ViewableItem === id ? isPaused : true}
                muted={false}
                repeat={true}
                onLoad={onLoadComplete}
                onProgress={playbackStatusUpdate}
                onEnd={() => {
                    console.log('end');
                    onFinishPlaying(index);
                }}
            />

            {/* {GetSlider} */}
        </Screen>
    );
};
