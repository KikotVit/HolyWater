import React from 'react';
import { Dimensions, Platform, ScrollView, View } from 'react-native';
import { ICommonContent, IListSection, mockMainContent } from '../../mock/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { MainContentListComponent, MainCarousel, HomeHeader } from '.';
import { HEADER_HEIGHT } from '../../theme';

const { height } = Dimensions.get('window');

export const HomeScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <Screen>
            <HomeHeader />
            <View style={{ height : 24 }} />
            <ScrollView
                style={{
                    paddingTop: HEADER_HEIGHT + insets.top,
                    paddingBottom: insets.bottom,
                    height: height,
                }}
            >
                {
                    mockMainContent.map((item: (ICommonContent | IListSection), index: number) => {
                        if (item.type === 'common') {
                            return <MainCarousel key={item.type + index} {...item} />;
                        }
                        if (item.type === 'list') {
                            return <MainContentListComponent key={item.type + index} {...item} />;
                        }
                    })
                }
                <View style={{ height : HEADER_HEIGHT * 4 }} />
            </ScrollView>
        </Screen>
    );
};