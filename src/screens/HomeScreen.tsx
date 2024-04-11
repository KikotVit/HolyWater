import React from 'react';
import { Screen } from '../components/screen/Screen';
import { ScrollView } from 'react-native';
import { HEADER_HEIGHT, HomeHeader } from '../components/header/HomeHeader';
import { ICommonContent, IListSection, mockMainContent } from '../mock/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MainCarousel } from './carousel/MainCarousel';
import { MainContentListComponent } from './sections/MainContentListComponent';

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
                        mockMainContent.map((item: (ICommonContent | IListSection), index: number) => {
                            if (item.type === 'common') {
                                return <MainCarousel key={item.type + index} {...item} />;
                            }
                            if (item.type === 'list') {
                                return <MainContentListComponent key={item.type + index} {...item} />;
                            }
                        })
                    }
                </ScrollView>
            </Screen>
        </>
    );
};