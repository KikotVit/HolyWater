import React from 'react';
import { Screen } from '../components/screen/Screen';
import { Dimensions, FlatList, Image, ImageStyle, Pressable, ScrollView, View } from 'react-native';
import { HEADER_HEIGHT, HomeHeader } from '../components/header/HomeHeader';
import Carousel from 'react-native-reanimated-carousel';
import { ICommonContent, IListSection, mockMainCarousel, mockMainContent } from '../mock/mockData';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { spacing } from '../theme/spacing';
import { colors } from '../theme/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '../components/text/Text';
import { MainCarousel } from './carousel/MainCarousel';

const { width } = Dimensions.get('screen');

export const HomeScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <>
            <Screen>
                <HomeHeader />
                <ScrollView
                    style={{
                        paddingTop: HEADER_HEIGHT + insets.top + 12,
                    }}
                >
                    {
                        mockMainContent.map((item: (ICommonContent | IListSection)) => {
                            if (item.type === 'common') {
                                return <MainCarousel {...item} />
                            }
                        })
                    }
                    <MainCarousel />
                </ScrollView>
            </Screen>
        </>
    );
};