import React from 'react';
import { IListSection } from '../../mock/mockData';
import { SectionHeader } from './SectionHeader';
import { SectionList } from './SectionList';

export const MainContentListComponent = (item: IListSection) => {

    return (
        <>
            <SectionHeader title={item.title} />
            <SectionList content={item.items} />
        </>
    );
};