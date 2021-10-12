import React from 'react';
import classNames from 'classnames';
import { GridRow, GridColumn } from 'app/components/Grid';
import { NavPageView } from 'app/layout/views';
import ReactPhoneInput from 'react-phone-number-input/input';
import {
    phone_input_factory,
    maybeGetCallingCountryCode,
    ReactPhoneInputState
} from 'app/components/phone_input_utils';

import {
    Button,
    FormGroup,
    HTMLSelect,
    InputGroup,
    TextArea,
    Classes,
    Card,
    Icon,
} from '@blueprintjs/core';
import { HorizontalSectionDivider } from 'app/components/misc_utils';
import { CountrySelectWrapper } from 'app/components/CountrySelect';
import { ICountry } from 'app/components/CountrySelect/countries';

const CellphoneInput = phone_input_factory({
    placeholder: "Enter Cellphone Number",
    fill: true,
    leftIcon: "mobile-phone"
});
const TelephoneInput = phone_input_factory({
    placeholder: "Enter Telephone Number",
    fill: true,
    leftIcon: "phone"
});

const SupplierPersonalInformationForm = () => {
    const [country, setCountry] = React.useState<ICountry>();

    const [cellphone, setCellphone] = React.useState<ReactPhoneInputState>();
    const [telephone, setTelephone] = React.useState<ReactPhoneInputState>();

    return (
        <React.Fragment>
            <GridRow>
                <GridColumn colSize={12}>
                    <FormGroup
                        label="Supplier Name"
                    >
                        <InputGroup
                            placeholder="Enter supplier name"
                            fill={true}
                            leftIcon="layers"
                            intent='success'
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Company Name">
                        <InputGroup
                            placeholder="Company Name"
                            fill={true}
                            leftIcon="app-header"
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Email Address">
                        <InputGroup
                            placeholder="Enter Email Address"
                            fill={true}
                            leftIcon="envelope"
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={3}>
                    <FormGroup label="City">
                        <InputGroup
                            placeholder="Enter City"
                            fill={true}
                            leftIcon="map-marker"
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={3}>
                    <FormGroup label="State / Province">
                        <InputGroup
                            placeholder="Enter State"
                            fill={true}
                            leftIcon="map"
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={2}>
                    <FormGroup label="Enter Code">
                        <InputGroup
                            placeholder="Zip Code"
                            fill={true}
                            leftIcon="geolocation"
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={4}>
                    <FormGroup label="Country">
                        <CountrySelectWrapper
                            selectedCountry={country}
                            onCountryChange={setCountry}
                            intent="success"
                            fill={true}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup
                        label="Cellphone Number"
                        helperText={`Start the number with a country calling code if it is not
                                    from the country selected previouly. `}
                    >
                        <ReactPhoneInput
                            value={cellphone ?? undefined}
                            onChange={setCellphone}
                            inputComponent={CellphoneInput as any}
                            defaultCountry={maybeGetCallingCountryCode(country?.code)}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Office Telephone Number">
                        <ReactPhoneInput
                            value={telephone ?? undefined}
                            onChange={setTelephone}
                            inputComponent={TelephoneInput as any}
                            defaultCountry={country?.code}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup label="Mailing Address">
                        <TextArea
                            placeholder="Enter Address"
                            fill={true}
                            style={{ resize: 'vertical' }}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Permanent/Office Address">
                        <TextArea
                            placeholder="Enter Address"
                            fill={true}
                            style={{ resize: 'vertical' }}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup
                        label={
                            <>Remarks <span className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>(Optional)</span></>
                        }
                    >
                        <TextArea
                            placeholder="None..."
                            fill={true}
                            style={{ resize: 'vertical' }}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <br />
        </React.Fragment>
    );
};

const RawMaterialInformationForm = () => {
    return (
        <React.Fragment>
            <FormGroup
                label="Select Raw Material"
                helperText="The raw material that this vendor supplies"
            >
                <HTMLSelect fill={true}>
                    <option value='0'>Material 1</option>
                    <option value='0'>Material 2</option>
                    <option value='0'>Material 3</option>
                    <option value='0'>Material 4</option>
                    <option value='0'>Material 5</option>
                    <option value='0'>Material 6</option>
                </HTMLSelect>
            </FormGroup>
        </React.Fragment>
    );
};

const ViewContent = React.memo(() => {
    return (
        <React.Fragment>
            <div className="center-text-flow" style={{ margin: '0 0 15px' }}>
                <Icon size={16} icon="user" />
                <h5 className="bp3-heading icon-text-md">Personal Information</h5>
            </div>
            <SupplierPersonalInformationForm />
            <HorizontalSectionDivider />

            <div className="center-text-flow" style={{ margin: '0 0 15px' }}>
                <Icon size={16} icon="duplicate" />
                <h5 className="bp3-heading icon-text-md">Product/Raw Material Information</h5>
            </div>
            <RawMaterialInformationForm />
        </React.Fragment>
    );
});


export const AddSupplierView = React.memo(() => {
    return (
        <NavPageView title="Add a New Supplier">
            <div style={{ padding: "15px 25px" }}>
                <Card elevation={2}>
                    <ViewContent />
                    <br />
                    <Button
                        text="Add Vendor"
                        rightIcon="chevron-right"
                        intent="primary"
                    />
                </Card>
            </div>
        </NavPageView>
    );
});
