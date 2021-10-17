import React from 'react';
import styles from './style.module.scss';
import classnames from 'classnames/bind';
import { Icon, IconName } from '@blueprintjs/core';
import { RouteConf } from '~/app/routing/route_list';
import { InputGroup } from '@blueprintjs/core';

const cx = classnames.bind(styles);

const SidebarHome = React.memo(() => {
    return (
        <div className={cx('sidebar-home')}>
            <InputGroup
                placeholder="Search"
                intent="none"
                fill={true}
                leftIcon="search"
            />
        </div>
    );
});

interface SidebarNavSectionProps {
    icon?: IconName;
    label: string;
}

const SidebarNavSection = (props: React.PropsWithChildren<SidebarNavSectionProps>) => {
    const [isCollapsed, setIsCollapsed] = React.useState(false);
    return (
        <React.Fragment>
            <div className={cx('nav-label')} onClick={() => setIsCollapsed(!isCollapsed)}>
                {props.icon && <Icon icon={props.icon} iconSize={18} />}
                <span className={cx('txt')}>{props.label}</span>
                <div className={cx('arrow-container', { 'collapsed': isCollapsed })}>
                    <Icon icon={isCollapsed ? "caret-left" : "caret-down"} iconSize={19} />
                </div>
            </div>
            <ul className={cx("sidebar-nav", { 'collapsed': isCollapsed })}>
                {props.children}
            </ul>
        </React.Fragment>
    );
};

interface SidebarNavLinkProps {
    label: string;
    active?: boolean;
    target?: string
};

const SidebarNavLink = React.memo((props: SidebarNavLinkProps) => {
    return (
        <li className={cx('nav-item', { 'active': props.active })}>
            <a href={props.target || '#'}>{props.label}</a>
        </li>
    );
});

const SidebarRouteEntry: React.FC<{routeConf: RouteConf}> = React.memo(props => {
    return null;
});

const SidebarBody = () => {
    return (
        <div className={cx('sidebar-body')}>
            <SidebarNavSection
                icon="oil-field"
                label="Inventory"
            >
                <SidebarNavLink label='Items Management' />
                <SidebarNavLink label='Reporting' />
                <SidebarNavLink label='Items History' />
                <SidebarNavLink label='Suppliers' />
                <SidebarNavLink active={true} label='Add Products' />
                <SidebarNavLink label='Receipts & Tracking' />
                <SidebarNavLink label='Orders' />
                <SidebarNavLink label='Stocks Schedule' />
            </SidebarNavSection>

            <SidebarNavSection
                icon="group-objects"
                label="Assets & Liabilities"
            >
                <SidebarNavLink label='Fixed Assets' />
                <SidebarNavLink label='Cash and Equivalent' />
                <SidebarNavLink label='Receivables' />
                <SidebarNavLink label='Payables' />
                <SidebarNavLink label='Liabilities' />
                <SidebarNavLink label='Balance Sheet' />
                <SidebarNavLink label='Profit and Loss Statement' />
            </SidebarNavSection>

            <SidebarNavSection
                icon="layout-sorted-clusters"
                label="Customers"
            >
                <SidebarNavLink label='Add new customer' />
                <SidebarNavLink label='Customers list' />
            </SidebarNavSection>

            <SidebarNavSection
                icon="satellite"
                label="System"
            >
                <SidebarNavLink label='General Settings' />
                <SidebarNavLink label='Accounts' />
                <SidebarNavLink label='Data and Backup' />
            </SidebarNavSection>



        </div>
    );
};

export const Sidebar = React.memo(() => {
    return (
        <div className={cx("sidebar")}>
            <SidebarHome />
            <SidebarBody />
        </div>
    );
});
