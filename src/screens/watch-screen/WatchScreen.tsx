import React from 'react';
import { Header, Icon, Screen, Text } from '../../components';
import { NavigationRef } from '../../navigation';
import { Reels } from './components';
import { useRootStore } from '../../stores';
import LinearGradient from 'react-native-linear-gradient';
import { HEADER_HEIGHT, colors, spacing } from '../../theme';
import { Dimensions, Platform, Pressable, View } from 'react-native';
import Slider from '@react-native-community/slider';
import { GetDurationFormat } from './utils';

// Screen Dimensions
const { height, width } = Dimensions.get('window');

export const WatchScreen = () => {

    const [
        setCurrentSeriesList,
        currentHeaderTitle,
        currentProgress,
        currentDuration,
        isPaused,
        setIsPaused,
        setSeekValue,
    ] = useRootStore(state => [
        state.setCurrentSeriesList,
        state.currentHeaderTitle,
        state.currentProgress,
        state.currentDuration,
        state.isPaused,
        state.setIsPaused,
        state.setSeekValue,
    ]);

    const onLeftPress = () => {
        setCurrentSeriesList();
        NavigationRef.goBack();
    };
    
    return (
        <Screen >
            <Header leftIcon='arrowLeft' title={currentHeaderTitle} onLeftPress={onLeftPress}/>
            <Reels />
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
        </Screen>
    );
};