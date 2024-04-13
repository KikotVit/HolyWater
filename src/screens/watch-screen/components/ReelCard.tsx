// packages Imports
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Dimensions, Pressable } from 'react-native';
import Slider from '@react-native-community/slider';
import Video from 'react-native-video';
import { GetDurationFormat } from '../utils';
import { colors, spacing } from '../../../theme';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../components';
import { IEpisode } from '../../../mock/mockData';


// Screen Dimensions
const { height, width } = Dimensions.get('window');

interface IReelCardProps extends IEpisode {
    ViewableItem: string | number,
    index: number,
    onFinishPlaying: (index: number) => void,
}

export const ReelCard = ({ link, ViewableItem, index, onFinishPlaying }: IReelCardProps ) => {

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
                end={{ x: 0.5, y: 0.3 }}
                locations={[0, 1]}
                colors={colors.footerGradient}
                style={{
                    zIndex: 999,
                    width: width,
                    height: 90,
                    position: 'absolute',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    bottom: 0,
                    paddingBottom: 30,
                    paddingTop: 30,
                    paddingHorizontal: spacing[4],
                }}
            >
                <View
                    style={{
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
                                paddingHorizontal: spacing[4],
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
        <>
            
        
            <View
                style={{
                    backgroundColor: colors.background,
                    width: width,
                    height: height,
                    marginTop: 24,
                    justifyContent: 'center',
                }}
            >
                <Video
                    ref={VideoPlayer}
                    source={{ uri: link }}
                    style={{
                        width: width,
                        height: height,
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
            </View>
        </>
    );
};
