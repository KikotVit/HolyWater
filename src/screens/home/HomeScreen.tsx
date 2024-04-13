import React from 'react';
import { ScrollView } from 'react-native';
import { ICommonContent, IListSection, mockMainContent } from '../../mock/mockData';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { MainContentListComponent, MainCarousel, HomeHeader } from '.';
import { HEADER_HEIGHT } from '../../theme';

export const HomeScreen = () => {

    const insets = useSafeAreaInsets();

    return (
        <>
            <Screen>
                <HomeHeader />
                <ScrollView
                    style={{
                        marginTop: HEADER_HEIGHT + insets.top + 12,
                        paddingBottom: insets.bottom,
                        height: '100%'
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