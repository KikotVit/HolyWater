import { ICommonContent, IListSection } from "../stores/root.store.types";


export const mockMainContent: (ICommonContent | IListSection)[] = [
    {
        type: 'common',
        items: [
            { 
                type: 'series',
                title: 'Lethal Limits',
                subtitle: 'Dustin\'s Gamble',
                imageUrl: require('./images/mainBanner.png'),
                episodes: [
                    {
                        title: 'Episode 1',
                        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/convertedwife.m3u8',
                    },
                    {
                        title: 'Episode 2',
                        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/2wife2.m3u8',
                    },
                    {
                        title: 'Episode 3',
                        link: 'https://dj0vkl2i4vsbo.cloudfront.net/convert/wife_caught_husband/converted/3wife3.m3u8',
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
                ],
            },
            {
                type: 'romance',
                title: 'Another poster',
                subtitle: 'Another subtitle',
                imageUrl: require('./images/mainBanner2.jpeg'),
                text: '',
            },
            {
                type: 'romance',
                title: 'Longer-longer-longer poster title',
                subtitle: 'Longer-longer poster subtitle',
                imageUrl: require('./images/mainBanner3.jpeg'),
                text: '',
            },
        ],
    },
    {
        type: 'list',
        title: 'Trending Now',
        items: [
            {
                title: 'Wolfstate chronicles: Alaska, Texas',
                imageUrl: require('./images/book1.png'),
                isLocked: false,
                link: 'https://google.com',
            },
            {
                title: 'Beautiful Revenge',
                imageUrl: require('./images/mainBanner.png'),
                comingDate: 'Coming July 2',
                isLocked: true,
            },
            {
                title: 'Sin De Rella',
                imageUrl: require('./images/book1.png'),
                comingDate: 'Coming August 3',
                isLocked: true,
            },
            {
                title: 'New book!',
                imageUrl: require('./images/book1.png'),
                comingDate: 'Coming soon',
                isLocked: true,
            },
            {
                title: 'Book',
                imageUrl: require('./images/book1.png'),
                comingDate: 'Coming July 2',
                isLocked: true,
            },
        ],
    },
    {
        type: 'list',
        title: 'Top Romance',
        items: [
            {
                title: 'Alpha\'s Detective',
                imageUrl: require('./images/book2.png'),
                isLocked: false,
                link: 'https://google.com',
            },
            {
                title: 'Trained for Seduction',
                imageUrl: require('./images/mainBanner2.jpeg'),
                comingDate: 'Coming July 2',
                isLocked: true,
            },
            {
                title: 'Crescent',
                imageUrl: require('./images/mainBanner3.jpeg'),
                comingDate: 'Coming August 3',
                isLocked: true,
            },
            {
                title: 'New book!',
                imageUrl: require('./images/book2.png'),
                comingDate: 'Coming soon',
                isLocked: true,
            },
            {
                title: 'Book',
                imageUrl: require('./images/book2.png'),
                comingDate: 'Coming July 2',
                isLocked: true,
            },
        ],
    },
    
];