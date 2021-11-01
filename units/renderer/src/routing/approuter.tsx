import * as React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { appRoutes, devAppRoutes } from './route_list';

import { NotFoundView } from '@/components/NotFoundView';

import { AddRawMaterialView } from '@/features/inventory/AddRawMaterial';
import { AddProductView } from '@/features/inventory/AddProductView';
import { AddSupplierView } from '@/features/suppliers/AddSupplierView';
import { AddCustomerView } from '@/features/customers/AddCustomerView';

import { ScratchPlace } from '@/features/_scratch/scratch-place';
import { ManageCategoriesView } from '@/features/inventory/ManagerCategoriesView';

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