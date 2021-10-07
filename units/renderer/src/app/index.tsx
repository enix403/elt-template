import React from 'react';

import './index.css';

import { Sidebar } from './components/Sidebar';
import { StatusBar } from 'app/components/StatusBar';

// import { AddCustomerView } from './features/customers/AddCustomerView';
// import { AddProductView } from './features/products/AddProductView';
// import { AddRawMaterial } from './features/inventory/AddRawMaterial';
// import { AddSupplierView } from './features/suppliers/AddSupplierView';
import { ScratchPlace } from './features/temp/temp';

export const App = () => {
    return (
        <React.Fragment>
            <Sidebar />
            <ScratchPlace />
            <StatusBar />
        </React.Fragment>
    );
};
