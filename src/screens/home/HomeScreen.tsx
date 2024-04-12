import React from 'react';
import { ScrollView } from 'react-native';
import { ICommonContent, IListSection, mockMainContent } from '../../mock/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { MainContentListComponent, MainCarousel, HomeHeader, HEADER_HEIGHT } from '.';

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