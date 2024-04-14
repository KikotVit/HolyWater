import React from 'react';
import { Dimensions, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import { Icon, Text } from '../../../components';
import { HEADER_HEIGHT, colors, spacing } from '../../../theme';

const { width } = Dimensions.get('window');

export const HomeHeader = () => {

    const insets = useSafeAreaInsets();

    const onSearchPress = () => {
        console.log('search press');
    };
    const onGiftPress = () => {
        console.log('gift press');
    };
    
    return (
        <LinearGradient
            start={{ x: 0.5, y: 0.7 }}
            end={{ x: 0.5, y: 1 }}
            locations={[0, 1]}
            colors={colors.headerGradient}
            style={{
                zIndex: 999,
                width: '100%',
                position: 'absolute',
                justifyContent: 'center',
                paddingBottom: 30,
                paddingTop: insets.top,
                paddingHorizontal: spacing[4],
            }}
        >
            <View style={[HEADER]}>
                <View>
                    <Text preset='header' style={TITLE} maxFontSizeMultiplier={1.15} numberOfLines={1} text={'Home'} />
                </View>
                <View
                    style={ICONS_CONTAINER}
                >
                    <TouchableOpacity
                        onPress={onGiftPress}
                    >
                        <Icon
                            containerStyle={{ ...ICON, paddingBottom: spacing[2] }}
                            style={{
                                width: 46,
                                height: 46,
                            }}
                            icon={'gift'} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={onSearchPress}
                    >
                        <Icon
                            containerStyle={ICON}
                            style={{
                                tintColor: colors.text,
                            }}
                            icon={'search'} />
                    </TouchableOpacity>
                </View>
                
            </View>
        </LinearGradient>
    );
};
const MAX_TITLE_WIDTH = width * 0.7;

const TITLE: TextStyle = {
    maxWidth: MAX_TITLE_WIDTH,
};

const HEADER: ViewStyle = {   
    height: HEADER_HEIGHT,
    justifyContent: 'space-between',
    flexDirection: 'row', 
    width: '100%',
    alignItems: 'center',
};
const ICONS_CONTAINER: ViewStyle = { 
    flexDirection: 'row',
    gap: spacing[2],
};
const ICON: ViewStyle = {
    width: 42,
    height: 42,
    alignItems: 'center',
    justifyContent: 'center',
};