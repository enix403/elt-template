import React from 'react';
import {
    Button,
    InputGroup,
    FormGroup,
    HTMLSelect,
    TextArea,
} from '@blueprintjs/core';
import { GridRow, GridColumn } from '@/components/Grid';
import { NavPageView } from '@/layout/views';

import { AppToaster } from '@/toaster';

const CustomerForm = ({ customerType }) => {
    return (
        <React.Fragment>
            <GridRow>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="First Name"
                        fill={true}
                        leftIcon="id-number"
                    />
                </GridColumn>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="Last Lame"
                        fill={true}
                        leftIcon="id-number"
                    />
                </GridColumn>
            </GridRow>
            <br />
            <GridRow>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="Company Name"
                        fill={true}
                        leftIcon="app-header"
                    />
                </GridColumn>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="Email Address"
                        fill={true}
                        leftIcon="envelope"
                    />
                </GridColumn>
            </GridRow>
            <br />
            <GridRow>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="Cellphone Number"
                        fill={true}
                        leftIcon="mobile-phone"
                    />
                </GridColumn>
                <GridColumn colSize={6}>
                    <InputGroup
                        placeholder="Office Telephone Number"
                        fill={true}
                        leftIcon="phone"
                    />
                </GridColumn>
            </GridRow>

            <br />
            <GridRow>
                <GridColumn colSize={3}>
                    <InputGroup
                        placeholder="City"
                        fill={true}
                        leftIcon="map-marker"
                    />
                </GridColumn>
                <GridColumn colSize={3}>
                    <InputGroup
                        placeholder="State"
                        fill={true}
                        leftIcon="map"
                    />
                </GridColumn>
                <GridColumn colSize={3}>
                    <InputGroup
                        placeholder="Zip Code"
                        fill={true}
                        leftIcon="geolocation"
                    />
                </GridColumn>

            </GridRow>

            <br />
            <GridRow>
                <GridColumn colSize={6}>
                    <TextArea
                        placeholder="Mailing Address"
                        fill={true}
                        growVertically={true}
                        style={{ resize: 'vertical' }}
                    />
                </GridColumn>
                <GridColumn colSize={6}>
                    <TextArea
                        placeholder="Permanent/Office Address"
                        fill={true}
                        growVertically={true}
                        style={{ resize: 'vertical' }}
                    />
                </GridColumn>
            </GridRow>


            <br />
            <GridRow>
                <GridColumn colSize={6}>
                    <TextArea
                        placeholder="Remarks"
                        fill={true}
                        growVertically={true}
                        style={{ resize: 'vertical' }}
                    />
                </GridColumn>
            </GridRow>
        </React.Fragment>
    );
};

export const AddCustomerView = React.memo(() => {

    const handleAddCustomer = React.useCallback(() => {
        AppToaster.show({
            icon: "tick-circle",
            message: (
                <>
                    Customer added successfully.
                </>
            ),
            intent: "success"
        });
    }, []);

    return (
        <NavPageView title="Add a New Customer">

            <div style={{
                padding: "10px 80px"
            }}>

                <GridRow>
                    <GridColumn colSize={6}>
                        <FormGroup
                            label="Customer Type"
                            labelFor="text-input"
                            inline={true}
                        >
                            <HTMLSelect
                                fill={false}
                            >
                                <option value="0">Individual</option>
                                <option value="1">Company/Organization</option>
                            </HTMLSelect>
                        </FormGroup>
                    </GridColumn>
                    <GridColumn colSize={6}>
                        <Button
                            text="Add Customer"
                            intent="primary"
                            icon="plus"
                            style={{ float: 'right' }}
                            onClick={handleAddCustomer}
                        />
                    </GridColumn>
                </GridRow>

                <CustomerForm customerType={1} />

            </div>
        </NavPageView>
    );
});
