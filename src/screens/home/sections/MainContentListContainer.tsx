import React from 'react';
import { SectionHeader, SectionList } from '.';
import { IListSection } from '../../../stores/root.store.types';

export const MainContentListContainer = (item: IListSection) => {

    return (
        <>
            <SectionHeader title={item.title} />
            <SectionList content={item.items} />
        </>
    );
};