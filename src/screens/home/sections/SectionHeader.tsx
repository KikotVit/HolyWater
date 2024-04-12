import React from 'react';
import { TextStyle, View, ViewStyle } from 'react-native';
import { Text } from '../../../components/text/Text';
import { spacing } from '../../../theme/spacing';

export const SectionHeader = ({ title }: {title: string}) => {
    return (
        <View
            style={ROOT}
        >
            <Text
                preset='bold'
                text={title}
                style={TITLE}
            />
        </View>
    );
};

const ROOT: ViewStyle = {
    flex: 1,
    marginTop: spacing[4],
    marginBottom: spacing[2],
    paddingHorizontal: spacing[4],
};

const TITLE: TextStyle = {
    fontSize: 20,
};