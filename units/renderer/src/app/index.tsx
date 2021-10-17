import React from 'react';

import './index.scss';

import { Sidebar } from './components/Sidebar';
import { StatusBar } from 'app/components/StatusBar';

import { AppRouter } from './routing/approuter';

export const App = React.memo(() => {
    return (
        <React.Fragment>
            <Sidebar />
            <AppRouter />
            <StatusBar />
        </React.Fragment>
    );
});
