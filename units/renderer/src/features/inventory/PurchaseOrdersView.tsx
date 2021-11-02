import React from 'react';

import { NavPageView } from '@/layout/views';
import {
  FormGroup,
  Card,
  Button,
  InputGroup,
  HTMLSelect,
} from '@blueprintjs/core';

import { useRawMaterialSelect } from '../hooks';

export const PurchaseOrdersView: React.FC = () => {

  const { handleChange, allMats, selected, loading } = useRawMaterialSelect({
    preloadSuppliers: true
  });

  const handler = React.useCallback(() => {

  }, [allMats]);

  return (
    <NavPageView title="Purchase Orders">
      <Card elevation={2} style={{ margin: "15px 25px" }}>
        <h5 className="bp3-heading header-margin-b-l">
          Generate New Purchase Order
        </h5>

        <FormGroup
          label="Select Raw Material"
        >
          {loading ?
            <Button disabled={true} loading={true} fill={true} /> :
            <HTMLSelect
              fill={true}
              onChange={handleChange}
              value={selected?.id}
            >
              {allMats.map(mat =>
                <option key={mat.id} value={mat.id}>{mat.name}</option>)}
            </HTMLSelect>
          }
        </FormGroup>

        <FormGroup
          label="Select Supplier"
        >
          {false ?
            <Button disabled={true} loading={true} fill={true} /> :
            <HTMLSelect
              fill={true}
            >
              {selected && selected.suppliers!.map(sup =>
                <option key={sup.id} value={sup.id}>{sup.name}</option>)}
            </HTMLSelect>
          }
        </FormGroup>

        <Button
          text="Generate"
          icon="fork"
          intent="success"
          onClick={handler}
        />

      </Card>
    </NavPageView>
  );
};
