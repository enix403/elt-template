import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { appRoutes, devAppRoutes } from './route_list';

import { NotFoundView } from '~/app/components/NotFoundView';

import { AddRawMaterialView } from '~/app/features/inventory/AddRawMaterial';
import { AddProductView } from '~/app/features/inventory/AddProductView';
import { AddSupplierView } from '~/app/features/suppliers/AddSupplierView';
import { AddCustomerView } from '~/app/features/customers/AddCustomerView';

import { ScratchPlace } from '~/app/features/_scratch/scratch-place';
import { ManageCategoriesView } from '../features/inventory/ManagerCategoriesView';

export const AppRouter: React.FC<{}> = React.memo(_ => {
    return (
        <React.Fragment>
            <Switch>
                <Redirect exact from="/" to={appRoutes.inventory.rawMaterial.path} />

                <Route path={appRoutes.inventory.rawMaterial.path}  component={AddRawMaterialView}  />
                <Route path={appRoutes.inventory.categories.path}   component={ManageCategoriesView}  />
                <Route path={appRoutes.inventory.products.path}     component={AddProductView}      />
                <Route path={appRoutes.suppliers.add.path}          component={AddSupplierView}     />
                <Route path={appRoutes.customers.add.path}          component={AddCustomerView}     />

                <Route path={devAppRoutes.scratch.path}             component={ScratchPlace}     />

                <Route component={NotFoundView} />
            </Switch>
        </React.Fragment>
    );
});
