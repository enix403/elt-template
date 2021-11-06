import React from 'react';

import { NavPageView } from '@/layout/views';
import {
  FormGroup,
  Card,
  Button,
  Menu,
  MenuItem,
  MenuDivider,
  InputGroup,
  HTMLSelect,
  Classes,
  Tag,
  Radio,
  RadioGroup
} from '@blueprintjs/core';
import classNames from 'classnames';
import { DateInput, DateFormatProps, DateInputProps } from "@blueprintjs/datetime";
import datefns_format from 'date-fns/format';
import datefns_parse from 'date-fns/parse';

import { AllMessages, AppChannel } from '@shared/communication';

import { GridColumn, GridRow } from '@/components/Grid';
import { HorizontalDivider } from '@/components/misc_utils';

const jsDateFormatter: DateFormatProps = {
  formatDate: date => datefns_format(date, "cccc, MMMM do, yyyy"),
  parseDate: str => {
    try { return datefns_parse(str, "d/M/yyyy", new Date()); } catch (e) {}

    return false;
  },
  placeholder: "DD/MM/YYYY",
};

const commonDateInputProps: Partial<DateInputProps> = {
  showActionsBar: true,
  highlightCurrentDay: true,
  fill: true,
  popoverProps: { position: 'auto-start' },
};

const minDate = new Date();
const maxDate = new Date();
minDate.setFullYear(minDate.getFullYear() - 5);
maxDate.setFullYear(maxDate.getFullYear() + 5);

interface IPurchaseOrdersViewState {
  radioValue: string;
};

export class PurchaseOrdersView extends React.Component<{}, IPurchaseOrdersViewState> {

  state: IPurchaseOrdersViewState = {
    radioValue: 'three'
  };

  handleRadioChange = (e: React.ChangeEvent<any>) => {
    this.setState({ radioValue: e.target.value });
  };

  render() {
    return (
      <NavPageView title="Purchase Orders">
        <Card elevation={2} style={{ margin: "15px 25px" }}>
          <h5 className="bp3-heading header-margin-b-l">
            Generate New Purchase Order

            <Tag
              className="icon-text-lg"
              intent="success"
              minimal
              large
              round
            >
              <strong>ORDER NUMBER : 87DA3400</strong>
            </Tag>
          </h5>

          <div>
            <FormGroup
              label={<>Custom Reference Number: <span className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>(Optional)</span></>}
            >
              <InputGroup
                placeholder="Enter reference number"
                leftIcon='tag'
              />
            </FormGroup>
          </div>

          {/* ============================ */}
          {/* ========= Supplier ========= */}
          {/* ============================ */}

          <div className="flex-row">
            <FormGroup
              label="Select Supplier"
            >
              {false ?
                <Button disabled={true} loading={true} fill={true} /> :
                <HTMLSelect
                  fill={true}
                >
                  <option value={1}>Supplier 1</option>
                  <option value={2}>Supplier 2</option>
                  <option value={3}>Supplier 3</option>
                  <option value={4}>Supplier 4</option>
                  <option value={5}>Supplier 5</option>
                </HTMLSelect>
              }
            </FormGroup>
            <FormGroup
              label="Attention Person"
            >
              {false ?
                <Button disabled={true} loading={true} fill={true} /> :
                <HTMLSelect
                  fill={true}
                >
                  <option value={1}>Person 1</option>
                  <option value={2}>Person 2</option>
                  <option value={3}>Person 3</option>
                  <option value={4}>Person 4</option>
                  <option value={5}>Person 5</option>
                </HTMLSelect>
              }
            </FormGroup>
          </div>

          {/* ============================= */}
          {/* ========= Item List ========= */}
          {/* ============================= */}

          <HorizontalDivider />

          <div className="action-header margin-b-l">
            <h6 className="bp3-heading">Material Entries</h6>
            <Button
              text="Add"
              icon="add"
              intent="primary"
              outlined={true}
            />
          </div>

          <HorizontalDivider />

          {/* ========================= */}
          {/* ========= Dates ========= */}
          {/* ========================= */}

          <div className="flex-row">
            <FormGroup
              label="Purchase Order Date"
            >
              <DateInput
                {...jsDateFormatter}
                {...commonDateInputProps}
                inputProps={{ leftIcon: 'timeline-events' }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </FormGroup>
            <FormGroup
              label="Required Delivery Date"
            >
              <DateInput
                {...jsDateFormatter}
                {...commonDateInputProps}
                inputProps={{ leftIcon: 'truck' }}
                minDate={minDate}
                maxDate={maxDate}
              />
            </FormGroup>
          </div>

          {/* ============================ */}
          {/* ========= Shipment ========= */}
          {/* ============================ */}

          <div className='flex-row'>

            <RadioGroup
              label="Shipment Mode"
              // inline
              onChange={this.handleRadioChange}
              selectedValue={this.state.radioValue}
              className="radio-group"
            >
              <Radio label="By Courier" value="1" />
              <Radio label="By Water" value="2" />
              <Radio label="By Air" value="3" />
              <Radio label="By Truck" value="4" />
              <Radio label="Other" value="other" />
            </RadioGroup>

            <FormGroup
              disabled={this.state.radioValue !== 'other'}
              label="Specify Other Shipment mode"
            >
              <InputGroup
                disabled={this.state.radioValue !== 'other'}
                placeholder="Specify mode"
                leftIcon="helicopter"
                fill={false}
              />
            </FormGroup>
          </div>


          {/* ============================ */}
          {/* ========= Address  ========= */}
          {/* ============================ */}
          <label className="bp3-label">Delivery Address</label>


          {/* Generate Button */}
          <Button
            text="Generate"
            icon="fork"
            intent="success"
            className="margin-t-l"
          />

        </Card>
      </NavPageView>
    );
  }
};
