import * as React from 'react';
import { View, Image, ImageStyle } from 'react-native';
import { IIconProps } from './icon.props';
import { icons } from './icons';

export function Icon(props: IIconProps): React.ReactElement {

    const { style: styleOverride, icon, containerStyle } = props;    
    const style: ImageStyle = {
        ...ROOT,
        ...styleOverride,
    };

    return (
        <View style={containerStyle}>
            <Image
                style={style}
                source={icons[icon]}
            />
        </View>
    );
}

const ROOT: ImageStyle = {
    resizeMode: 'contain',
    width: 28,
    height: 28,
};
