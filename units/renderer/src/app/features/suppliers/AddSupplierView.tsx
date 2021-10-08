import React from 'react';
import { GridRow, GridColumn } from 'app/components/Grid';
import { NavPageView } from 'app/layout/views';
import {
    Button,
    FormGroup,
    HTMLSelect,
    InputGroup,
    TextArea,
    Icon
} from '@blueprintjs/core';
import { HeaderIcon } from 'app/components/icons_utils';
import { SectionHeading, HorizontalSectionDivider } from 'app/components/misc_utils';
import { CountrySelectWrapper } from 'app/components/country_select';
import { ALL_COUNTRIES_MAPPING_ARRAY, ICountry } from 'app/components/country_select/countries';

const SupplierPersonalInformationForm = () => {
    const [country, setCountry] =
        // React.useState<ICountry>(ALL_COUNTRIES_MAPPING_ARRAY['PK']);
        React.useState<ICountry>();
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
                        />
                    </FormGroup>
                </GridColumn>
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
                <GridColumn colSize={2}>
                    <InputGroup
                        placeholder="Zip Code"
                        fill={true}
                        leftIcon="geolocation"
                    />
                </GridColumn>
                <GridColumn colSize={4}>
                    <CountrySelectWrapper
                        selectedCountry={country}
                        onCountryChange={setCountry}
                        intent="success"
                        fill={true}
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
            <br />
        </React.Fragment>
    );
};

const RawMaterialInformationForm = () => {
    return (
        <React.Fragment>
            <FormGroup
                label="Select Raw Material"
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
            <SectionHeading>
                <HeaderIcon icon="user" size={16} /> Personal Information
            </SectionHeading>
            <SupplierPersonalInformationForm />
            <HorizontalSectionDivider />

            <SectionHeading>
                <HeaderIcon icon="duplicate" size={16} /> Product/Raw Material Information
            </SectionHeading>
            <RawMaterialInformationForm />
        </React.Fragment>
    );
});


export const AddSupplierView = React.memo(() => {
    return (
        <NavPageView title="Add a New Supplier">
            <div style={{ padding: "10px 40px" }}>
                <ViewContent />
                <br />
                <Button
                    text="Add Vendor"
                    rightIcon="chevron-right"
                    intent="primary"
                />
            </div>
        </NavPageView>
    );
});
