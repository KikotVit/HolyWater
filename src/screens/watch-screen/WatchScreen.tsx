import React from 'react';
import { Screen } from '../../components/screen/Screen';
import { ScrollView, TouchableOpacity } from 'react-native';
import { HEADER_HEIGHT, HomeHeader } from '../../components/header/HomeHeader';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../../components/text/Text';
import { Icon } from '../../components/icon/icon';
import { navigation } from '../../navigation/RootNavigator';

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
                    <Text text='dfsdfdsfsdff'/>
                    <TouchableOpacity style={{ width: 200, height: 200 }} onPress={() => navigation.goBack()}>

                        <Icon icon='cross'/>
                    </TouchableOpacity>
                </ScrollView>
            </Screen>
        </>
    );
};