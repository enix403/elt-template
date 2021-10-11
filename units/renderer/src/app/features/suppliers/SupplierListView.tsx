import React from 'react';
import { NavPageView } from 'app/layout/views';
import { Card, FormGroup, InputGroup } from '@blueprintjs/core';

const _Content: React.FC<{}> = React.memo(_props => {
    return (
        null
    );
});

export const SupplierListView: React.FC<{}> = React.memo(_props => {
    return (
        <NavPageView title="Supplier List">
            <_Content />
        </NavPageView>
    );
});

