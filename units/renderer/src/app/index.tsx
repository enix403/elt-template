import React from 'react';

import './index.css';

import { Sidebar } from './components/Sidebar';
// import { AddCustomerView } from './features/customers/AddCustomerView';
import { AddProductView } from './features/products/AddProductView';
import { StatusBar } from 'app/components/StatusBar';


export const App = () => {
    return (
        <React.Fragment>
            <Sidebar />
            <AddProductView />
            <StatusBar />
        </React.Fragment>
    );
};
