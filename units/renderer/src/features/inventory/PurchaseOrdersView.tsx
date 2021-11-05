import React from 'react';

import { NavPageView } from '@/layout/views';
import {
  FormGroup,
  Card,
  Button,
  InputGroup,
  HTMLSelect,
  NumericInput,
  Tag
} from '@blueprintjs/core';
import { DateInput, DateFormatProps } from "@blueprintjs/datetime";
import datefns_format from 'date-fns/format';
import datefns_parse from 'date-fns/parse';

import { AllMessages, AppChannel } from '@shared/communication';

import { useMessageEffect } from '../hooks';
import { GridColumn, GridRow } from '@/components/Grid';
import { HorizontalSectionDivider } from '@/components/misc_utils';
import type { UnpackedCollection } from '@shared/tsutils';
import type { IRawMaterial } from '@shared/object_types';

const fetchMsg = new AllMessages.Supl.GetAllSuppliers({
  preloadMaterials: true
});

const jsDateFormatter: DateFormatProps = {
  // note that the native implementation of Date functions differs between browsers
  formatDate: date => datefns_format(date, "cccc, MMMM do, yyyy"),
  parseDate: str => {
    try { return datefns_parse(str, "d/M/yyyy", new Date()); } catch (e) {}

    return false;
  },
  placeholder: "DD/MM/YYYY"
};

const minDate = new Date();
const maxDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 5);
maxDate.setFullYear(maxDate.getFullYear() + 5);


export const PurchaseOrdersView: React.FC = () => {

  const [allSupls, suplsLoading, refreshSupls] = useMessageEffect(AppChannel.Suppliers, fetchMsg, data => {
    if (data.length > 0)
      setSupplier(data[0]);
  }, true);


  const [supplier, setSupplier] = React.useState<UnpackedCollection<typeof allSupls>>();
  const handleSupplierChange = React.useCallback(e => {
    setSupplier(allSupls?.find(sup => sup.id == e.target.value))
  }, [allSupls]);

  const [count, setCount] = React.useState(1);
  const handleAdd = React.useCallback(() => setCount(c => c + 1), []);
  const handleSubtract = React.useCallback(() => setCount(c => c - 1), []);

  const entries: any[] = [];
  for (let i = 0; i < count; i++)
    entries.push(<OrderMaterialEntry
      mats={supplier ? supplier.materials! : []}
      onRemoveBtnClick={handleSubtract}
    />);

  return (
    <NavPageView title="Purchase Orders">
      <Card elevation={2} style={{ margin: "15px 25px" }}>
        <h5 className="bp3-heading header-margin-b-l">
          Generate New Purchase Order
        </h5>

        <FormGroup
          label="Select Supplier"
        >
          {suplsLoading ?
            <Button disabled={true} loading={true} fill={true} /> :
            <HTMLSelect
              fill={true}
              onChange={handleSupplierChange}
              value={supplier?.id}
            >
              {allSupls!.map(mat =>
                <option key={mat.id} value={mat.id}>{mat.name}</option>)}
            </HTMLSelect>
          }
        </FormGroup>

        <HorizontalSectionDivider />

        <div className="action-header margin-b-l">
          <h6 className="bp3-heading">Material Entries</h6>
          <Button
            text="Add"
            icon="add"
            intent="primary"
            outlined={true}
            onClick={handleAdd}
          />
        </div>

        {OrderMaterialEntryHeaders}
        {!suplsLoading && entries}

        <HorizontalSectionDivider />

        <FormGroup
          label="Required Delivery Date"
        >
          <DateInput
            {...jsDateFormatter}
            showActionsBar={true}
            highlightCurrentDay={true}
            fill={true}
            inputProps={{ leftIcon: 'truck' }}
            popoverProps={{ position: 'auto-start' }}
            minDate={minDate}
            maxDate={maxDate}
          />
        </FormGroup>

        <Button
          text="Generate"
          icon="fork"
          intent="success"
          onClick={refreshSupls}
        />

      </Card>
    </NavPageView>
  );
};

const OrderMaterialEntryHeaders = (
  <GridRow>
    <GridColumn colSize={4}><FormGroup className="margin-b-s" label="Raw Material" /></GridColumn>
    <GridColumn colSize={3}><FormGroup className="margin-b-s" label="Material Amount" /></GridColumn>
    <GridColumn colSize={4}><FormGroup className="margin-b-s" label="Total Price" /></GridColumn>
  </GridRow>
);

interface IOrderMaterialEntryProps {
  mats: IRawMaterial[];
  onRemoveBtnClick?: () => void;
}

const OrderMaterialEntry: React.FC<IOrderMaterialEntryProps> = ({ mats, onRemoveBtnClick }) => {
  return (
    <GridRow className="margin-b-s">
      <GridColumn colSize={4}>
        <HTMLSelect
          fill={true}
        >
          {mats.map(mat =>
            <option key={mat.id} value={mat.id}>{mat.name}</option>)}
        </HTMLSelect>
      </GridColumn>
      <GridColumn colSize={3}>
        <NumericInput
          placeholder="Enter Amount"
          fill={true}
          leftIcon="array-numeric"
          min={0}
          minorStepSize={0.0001}
          clampValueOnBlur={true}
          rightElement={<Tag intent="primary" minimal={false} >KG</Tag>}
        />
      </GridColumn>
      <GridColumn colSize={4}>
        <NumericInput
          placeholder="Enter Price"
          fill={true}
          leftIcon="array-boolean"
          min={0}
          minorStepSize={0.0001}
          clampValueOnBlur={true}
          rightElement={<Tag intent="success" minimal={false} >RS</Tag>}
        />
      </GridColumn>
      <GridColumn colSize={1} className="center-everything">
        <Button
          minimal={true}
          fill={false}
          intent="danger"
          icon="remove"
          onClick={onRemoveBtnClick}
        />
      </GridColumn>
    </GridRow>
  );
}
