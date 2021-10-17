import * as React from 'react';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { history } from './history'
import { appRoutes, RouteConf } from './route_list';

import { NotFoundView } from '~/app/components/NotFoundView';

import { AddRawMaterialView } from '~/app/features/inventory/AddRawMaterial';
import { AddProductView } from '~/app/features/inventory/AddProductView';
import { AddSupplierView } from '~/app/features/suppliers/AddSupplierView';
import { AddCustomerView } from '~/app/features/customers/AddCustomerView';

export const AppRouter: React.FC<{}> = React.memo(_ => {
    return (
        <Router history={history}>
            <Switch>
                <Redirect exact from="/" to={appRoutes.inventory.rawMaterial.path} />

                <Route path={appRoutes.inventory.rawMaterial.path}  component={AddRawMaterialView}  />
                <Route path={appRoutes.inventory.products.path}     component={AddProductView}      />
                <Route path={appRoutes.suppliers.add.path}          component={AddSupplierView}     />
                <Route path={appRoutes.customers.add.path}          component={AddCustomerView}     />

                <Route component={NotFoundView} />
            </Switch>
        </Router>
    );
});
