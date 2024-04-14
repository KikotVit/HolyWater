// packages Imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, Pressable, Platform } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { GetDurationFormat } from '../utils';
import { HEADER_HEIGHT, colors, spacing } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../components';
import { IEpisode } from '../../../mock/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from 'react-native-screens';


// Screen Dimensions
const { height, width } = Dimensions.get('window');

interface IReelCardProps extends IEpisode {
    ViewableItem: string | number,
    index: number,
    onFinishPlaying: (index: number) => void,
}

export const ReelCard = ({ link, ViewableItem, index, onFinishPlaying }: IReelCardProps ) => {

    const insets = useSafeAreaInsets();

    const VideoPlayer = useRef(null);

    const [Progress, SetProgress] = useState(0);
    const [Duration, SetDuration] = useState(0);
    const [Paused, SetPaused] = useState(false);

    useEffect(() => {
        if (ViewableItem === link) SetPaused(false);
        else {
            SetPaused(true);
            SetProgress(0);
        }
        return () => {
            if (ViewableItem === link) SetPaused(true);
        };
    }, [ViewableItem]);

    const SeekUpdate = useCallback(
        async seekTime => {
            try {
                if (VideoPlayer.current)
                    VideoPlayer.current.seek((seekTime * Duration) / 100 / 1000);
            } catch (error) {
                console.error('playbackStatusUpdate error: ', error);
            }
        },
        [Duration],
    );

    const playbackStatusUpdate = playbackStatus => {
        try {
            const currentTime = Math.round(playbackStatus.currentTime);
            const duration = Math.round(playbackStatus.seekableDuration);
            if (currentTime)
                if (duration) SetProgress((currentTime / duration) * 100);
        } catch (error) {
            console.error('playbackStatusUpdate error: ', error);
        }
    };

    const onLoadComplete = event => {
        try {
            SetDuration(event.duration * 1000);
        } catch (error) {
            console.error('onLoadComplete error: ', error);
        }
    };

    const videoError = error => {
        console.log('onError videoError: ', error);

    };

    const GetSlider = useMemo(
        () => (
            <LinearGradient
                start={{ x: 0.5, y: 0 }}
                end={{ x: 0.5, y: 0.8 }}
                locations={[0, 1]}
                colors={colors.footerGradient}
                style={{
                    // TODO make const
                    zIndex: 999,
                    width: width,
                    height: 90,
                    position: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bottom: 0,
                    paddingBottom: HEADER_HEIGHT,
                    paddingTop: 30,
                    paddingHorizontal: spacing[4],
                }}
            >
                <View
                    style={{
                        // TODO make const
                        justifyContent: 'center',
                        flexDirection: 'row', 
                        width: '100%',
                        height: 60,
                        alignSelf: 'flex-start',
                        alignItems: 'center',
                    }} >
                    <Pressable
                        onPress={() => SetPaused(prev => !prev)}
                    >
                        <Icon
                            icon={Paused ? 'play' : 'pause'} 
                            containerStyle={{
                                justifyContent: 'center',
                            }}
                        />
                    </Pressable>
                    <View 
                        style={{
                            width: width - spacing[4] * 2 - 28, // icon width
                            paddingTop: 20,
                            paddingHorizontal: Platform.OS === 'ios' ? spacing[4] : 0,
                        }}>
                        <Slider
                            style={{
                                width: '100%',
                                height: 10,
                            }}
                            minimumValue={0}
                            maximumValue={100}
                            minimumTrackTintColor={colors.text}
                            maximumTrackTintColor={colors.text}
                            thumbTintColor={colors.text}
                            value={Progress}
                            onSlidingComplete={data => SeekUpdate(data)}
                        />
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                paddingHorizontal:  Platform.OS === 'ios' ? 0 : spacing[4],
                            }}
                        >
                            <Text
                                style={{
                                    color: colors.subtitle,
                                }}
                            >
                                {GetDurationFormat(Math.floor((Progress * Duration) / 100))}
                            </Text>
                
                            <Text
                                style={{
                                    color: colors.subtitle,
                                }}
                            >
                                {GetDurationFormat(Duration || 0)}
                            </Text>
                        </View>
                       
                    </View>
                    
                </View>
            </LinearGradient>
        ),
        [
            Paused,
            Duration,
            Progress,
        ],
    );

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
                playInBackground={true}
                progressUpdateInterval={100}
                paused={Paused}
                muted={false}
                repeat={false}
                onLoad={onLoadComplete}
                onProgress={playbackStatusUpdate}
                onEnd={() => {
                    console.log('end');
                    onFinishPlaying(index);
                }}
            />

            {GetSlider}
        </Screen>
    );
};
