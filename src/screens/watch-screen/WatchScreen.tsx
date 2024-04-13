import React from 'react';
import { Header, Screen } from '../../components';
import { NavigationRef } from '../../navigation';

import { Reels } from './components';

const episodes = [
    {
        title: 'Episode 1',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8',
    },
    {
        title: 'Episode 4',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/4wife4.m3u8',
    },
    {
        title: 'Episode 5',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/5wife5.m3u8',
    },
    {
        title: 'Episode 6',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8',
    },
    {
        title: 'Episode 7',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/7wife7.m3u8',
    },
    {
        title: 'Episode 8',
        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/8wife8.m3u8',
    },
];

const videos = [
    {
        _id: '1',
        uri: {
            uri: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/7wife7.m3u8',
        },
    },
    {
        _id: '2',
        uri: {
            uri: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/6wife6.m3u8',
        },
    },
    {
        _id: '3',
        uri: {
            uri: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/5wife5.m3u8',
        },
    },
];

export const WatchScreen = () => {
    
    return (
        <Screen >
            <Header leftIcon='arrowLeft' title={'episodes'} onLeftPress={() => NavigationRef.goBack()}/>
            <Reels videos={episodes} />
        </Screen>
    );
};