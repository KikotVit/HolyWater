
import React from 'react';
import { FlatList, Image, ImageStyle, Pressable, TextStyle, View, ViewStyle } from 'react-native';
import { Icon, Text } from '../../../components';
import { colors, spacing } from '../../../theme';
import { ITrendingItem } from '../../../stores/root.store.types';

const LIST_ITEM_WIDTH = 120;
const LIST_THUMBNAIL_HEIGHT = 150;

const _renderItem = ({ item } : { item: ITrendingItem }) => {

    const getImage = () => item.imageUrl ? { uri: item.imageUrl } : require('../../../mock/images/book_fallback.png');

    if (!item.isLocked) {
        return (
            <Pressable
                style={({ pressed }) => ({
                    ...ROOT,
                    transform: [{ scale: pressed ? 0.98 : 1 }],
                })}
            >
                <View
                    style={THUMBNAIL_CONTAINER}
                >
                    <Image
                        source={getImage()}
                        style={THUMBNAIL}
                    />
                </View>
                <View
                    style={{
                        width: LIST_ITEM_WIDTH,
                    }}
                >
                    <Text
                        text={item.title}
                    />
                </View>
            </Pressable>
        );
    } else {
        return (
            <View
                style={ROOT}
            >
                <View
                    style={{
                        width: LIST_ITEM_WIDTH,
                        height: LIST_THUMBNAIL_HEIGHT,
                        borderRadius: spacing[2],
                        overflow: 'hidden',
                    }}
                >
                    <Icon
                        icon='lock'
                        containerStyle={LOCK_ICON_CONTAINER}
                    />
                    <Image
                        source={getImage()}
                        style={THUMBNAIL}
                        blurRadius={30}
                    />
                </View>
                <View
                    style={{
                        width: LIST_ITEM_WIDTH,
                        flexDirection: 'column',
                    }}
                >
                    <Text
                        text={item.comingDate}
                        style={COMING_TITLE}
                    />
                    <Text
                        text={item.title}
                        numberOfLines={2}
                    />
                </View>
            </View>
        );
    }
};

export const SectionList = ({ content }: { content: ITrendingItem[] }) => {
    return (
        <FlatList
            horizontal
            data={content}
            renderItem={_renderItem}
            contentContainerStyle={SECTION_LIST_CONTAINER}
        />
    );
};



const ROOT: ViewStyle = {
    flexDirection: 'column',
    gap: spacing[2],
};

const SECTION_LIST_CONTAINER: ViewStyle = {
    justifyContent: 'flex-start',
    marginBottom: spacing[2],
    gap: spacing[2],
    paddingHorizontal: spacing[4],
};

const COMING_TITLE: TextStyle = {
    color: colors.comingDate,
    fontSize: 11,
    textTransform: 'uppercase',
};

const THUMBNAIL_CONTAINER: ViewStyle = {
    width: LIST_ITEM_WIDTH,
    height: LIST_THUMBNAIL_HEIGHT,
    borderRadius: spacing[2],
    overflow: 'hidden',
};

const THUMBNAIL: ImageStyle = {
    width: '100%',
    height: '100%',
};

const LOCK_ICON_CONTAINER: ViewStyle = {
    position: 'absolute',
    top: LIST_THUMBNAIL_HEIGHT / 2 - 28,
    left: LIST_ITEM_WIDTH / 2 - 28,
    zIndex: 99,
    backgroundColor: colors.text + '40',
    padding: spacing[4],
    borderRadius: spacing[8],
};