import React from 'react';
import { Dimensions, ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Screen } from '../../components';
import { MainContentListContainer, MainCarousel, HomeHeader, LastViewedContainer } from '.';
import { HEADER_HEIGHT } from '../../theme';
import { useRootStore } from '../../stores';
import { ICommonContent, ILastViewed, IListSection } from '../../stores/root.store.types';

const { height } = Dimensions.get('window');

export const HomeScreen = () => {

    const [mainContent] = useRootStore(state => [state.mainContent]);

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
                    mainContent.length ? mainContent.map((item: (ICommonContent | IListSection | ILastViewed), index: number) => {
                        if (item.type === 'common') {
                            return <MainCarousel key={item.type + index} {...item} />;
                        }
                        if (item.type === 'list') {
                            return <MainContentListContainer key={item.type + index} {...item} />;
                        }
                        if (item.type === 'lastViewed') {
                            return <LastViewedContainer key={item.type + index} {...item.item} />;
                        }
                    }) : <></>
                }
                <View style={{ height : HEADER_HEIGHT * 4 }} />
            </ScrollView>
        </Screen>
    );
};