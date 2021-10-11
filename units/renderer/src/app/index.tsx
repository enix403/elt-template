import React from 'react';

import './index.scss';

import { Sidebar } from './components/Sidebar';
import { StatusBar } from 'app/components/StatusBar';

import { ScratchPlace } from './features/temp/temp';
// import { AddCustomerView } from './features/customers/AddCustomerView';
// import { AddProductView } from './features/products/AddProductView';
// import { AddRawMaterial } from './features/inventory/AddRawMaterial';
// import { AddSupplierView } from './features/suppliers/AddSupplierView';
// import { SupplierListView } from './features/suppliers/SupplierListView';

export const App = React.memo(() => {
    return (
        <React.Fragment>
            <Sidebar />
            {/*<AddSupplierView />*/}
            {/*<SupplierListView />*/}
            <ScratchPlace />
            <StatusBar />
        </React.Fragment>
    );
});
