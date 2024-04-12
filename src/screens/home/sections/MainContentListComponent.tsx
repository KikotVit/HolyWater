import React from 'react';
import { IListSection } from '../../../mock/mockData';
import { SectionHeader, SectionList } from '.';

export const MainContentListComponent = (item: IListSection) => {

    return (
        <>
            <SectionHeader title={item.title} />
            <SectionList content={item.items} />
        </>
    );
};