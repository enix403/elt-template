import React from 'react';
import './style.scss'

import { Icon } from '@blueprintjs/core';

export const MockChildBlock = (props: React.PropsWithChildren<{ color?: string }>) => {
    return (
        <div style={{ minHeight: "100%", minWidth: "100%", backgroundColor: props.color || 'red' }}>
            {props.children}
        </div>
    );
}

export const SidebarPaddedView = React.memo(({ children }) => {
    return (
        <div className="content">
            <div className="content-body">
                {children}
            </div>
        </div>
    );
});

interface NavPageViewProps {
    title: string;
}

const NavPageViewHeader = ({title}) => {
    return (
        <div className='content-body-header-main'>
            <Icon icon="full-circle" color="#E936C2" />
            <span style={{ fontSize: 20, fontWeight: 500, marginLeft: 7 }}>
                {title}
            </span>
        </div>
    );
};


export const NavPageView = React.memo((props: React.PropsWithChildren<NavPageViewProps>) => {
    return (
        <SidebarPaddedView>
            <NavPageViewHeader title={props.title} />

            {props.children}
        </SidebarPaddedView>
    );
});
