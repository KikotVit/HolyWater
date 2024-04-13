import React from 'react';
import { Dimensions, TextStyle, TouchableOpacity, View, ViewStyle } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Icon, IconTypes, Text } from '../';
import { colors, spacing } from '../../theme';
import LinearGradient from 'react-native-linear-gradient';

export interface IHeaderItem {
    onPress: () => void,
    disabled?: boolean,
    icon: IconTypes,
    iconStyle?: ViewStyle,
}
interface IHeaderProps {
    containerStyle?: ViewStyle;
    title?: string;
    leftIcon?: IconTypes;
    rightIcon?: IconTypes;
    titleStyle?: TextStyle;
    style?: ViewStyle;
    onLeftPress?(): void;
    onRightPress?(): void;
}

const { width } = Dimensions.get('window');

export const Header = (props: IHeaderProps) => {
    const {
        onLeftPress,
        onRightPress,
        rightIcon,
        leftIcon,
        title,
        style: styleOverride,
        titleStyle,
    } = props;

    const insets = useSafeAreaInsets();
    
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
                {
                    leftIcon ? 
                        <TouchableOpacity 
                            style={LEFT} 
                            onPress={onLeftPress}
                        >
                            <Icon style={{ tintColor: 'white' }} icon={leftIcon} />
                        </TouchableOpacity>
                        : 
                        <View style={RIGHT} />
                }
                <View>
                    <Text style={{ ...TITLE, ...titleStyle }} maxFontSizeMultiplier={1.15} numberOfLines={1} text={title} />
                </View>
                {
                    rightIcon ? 
                        <TouchableOpacity
                            style={RIGHT}
                            onPress={onRightPress}
                        >
                            <Icon style={{ tintColor: 'white' }} icon={rightIcon} />
                        </TouchableOpacity>
                        : 
                        <View style={RIGHT} />
                }
            </View>
        
        </LinearGradient>
    );
};

const ICON_CONTAINER_WIDTH = 28;
const HEADER_CONTAINER_PADDING = 16;
const MAX_TITLE_WIDTH = width - ICON_CONTAINER_WIDTH * 2 - HEADER_CONTAINER_PADDING * 2;

const TITLE: TextStyle = {
    fontFamily: 'Montserrat-Bold',
    fontSize: 22,
    maxWidth: MAX_TITLE_WIDTH,
    color: 'white',
};

const HEADER: ViewStyle = {   
    height: 40,
    paddingHorizontal: spacing[3],
    justifyContent: 'space-between',
    flexDirection: 'row', 
    width: '100%',
    alignItems: 'center',
};

const LEFT: ViewStyle  = { width: ICON_CONTAINER_WIDTH };
const RIGHT: ViewStyle = { width: ICON_CONTAINER_WIDTH };