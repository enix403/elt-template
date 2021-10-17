import React from 'react';

import './index.scss';

import { Sidebar } from './components/Sidebar';
import { StatusBar } from 'app/components/StatusBar';

import { Router } from 'react-router-dom';
import { history } from './routing/history'
import { AppRouter } from './routing/approuter';

export const App = React.memo(() => {
    return (
        <Router history={history}>
            <Sidebar />
            <AppRouter />
            <StatusBar />
        </Router>
    );
});
