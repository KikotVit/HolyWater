import React from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { HEADER_HEIGHT, Icon, Screen, Text } from '../../components';
import { NavigationRef } from '../../navigation';

export const WatchScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <>
            <Screen>
                
                <ScrollView
                    style={{
                        paddingTop: HEADER_HEIGHT + insets.top + 12,
                    }}
                >
                    <Text text='WatchScreen'/>
                    <TouchableOpacity style={{ width: 200, height: 200 }} onPress={() => NavigationRef.goBack()}>

                        <Icon icon='cross'/>
                    </TouchableOpacity>
                </ScrollView>
            </Screen>
        </>
    );
};