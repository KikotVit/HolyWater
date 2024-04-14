import React from 'react';
import { Dimensions, Platform, Pressable, View, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useRootStore } from '../../../stores';
import { HEADER_HEIGHT, colors, spacing } from '../../../theme';
import { Icon, Text } from '../../../components';
import Slider from '@react-native-community/slider';
import { GetDurationFormat } from '../utils';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

export const ProgressBar = () => {

    const [
        currentProgress,
        currentDuration,
        isPaused,
        setIsPaused,
        setSeekValue,
    ] = useRootStore(state => [
        state.currentProgress,
        state.currentDuration,
        state.isPaused,
        state.setIsPaused,
        state.setSeekValue,
    ]);

    return (
        <LinearGradient
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 0.8 }}
            locations={[0, 1]}
            colors={colors.footerGradient}
            style={ROOT}
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
                    onPress={() => setIsPaused(!isPaused)}
                >
                    <Icon
                        icon={isPaused ? 'play' : 'pause'} 
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
                        value={currentProgress}
                        onSlidingComplete={data => setSeekValue(data)}
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
                            {GetDurationFormat(Math.floor((currentProgress * currentDuration) / 100))}
                        </Text>
                
                        <Text
                            style={{
                                color: colors.subtitle,
                            }}
                        >
                            {GetDurationFormat(currentDuration || 0)}
                        </Text>
                    </View>
                       
                </View>
                    
            </View>
        </LinearGradient>
    );
};

const ROOT: ViewStyle = {
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
}
