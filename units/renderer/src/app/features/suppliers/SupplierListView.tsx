import { NavPageView } from 'app/layout/views';
import React from 'react';

const _Content: React.FC<{}> = React.memo(_props => {
    return (
        <code>Hello</code>
    );
});

export const SupplierListView: React.FC<{}> = React.memo(_props => {
    return (
        <NavPageView title="Supplier List">
            <_Content />
        </NavPageView>
    );
});
