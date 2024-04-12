import React from 'react';
import { Text as ReactNativeText, TextProps, TextStyle } from 'react-native';
import { TextPresets, presets } from '.';

export interface ITextProps extends TextProps {
    children?: React.ReactNode;
    text?: string;
    style?: TextStyle | TextStyle[];
    preset?: TextPresets;
}

export const Text = (props: ITextProps) => {
    const {
        preset = 'default',
        children,
        text,
        style,
        ...rest
    } = props;

    const content = text || children;
    const styleOverride = [presets[preset], style];
    return (
        <ReactNativeText {...rest} style={styleOverride}>
            {content}
        </ReactNativeText>
    );
};
