import React, { useEffect } from 'react';
import classNames from 'classnames';
import { GridRow, GridColumn } from 'app/components/Grid';
import { NavPageView } from 'app/layout/views';
import ReactPhoneInput from 'react-phone-number-input/input';
import {
    phone_input_factory,
    maybeGetCallingCountryCode,
    ReactPhoneInputState
} from 'app/components/phone_input_utils';
import type { IRawMaterial } from '@shared/object_types';

import {
    Button,
    FormGroup,
    HTMLSelect,
    NumericInput,
    InputGroup,
    TextArea,
    Classes,
    Card,
    Icon,
} from '@blueprintjs/core';
import { HorizontalSectionDivider } from 'app/components/misc_utils';
import { CountrySelect } from '@/app/components/CountrySelect';
import { ICountry } from '@/app/components/CountrySelect/countries';
import { AllMessages, AppChannel } from '@shared/communication';
import { AppToaster } from '@/app/toaster';
import { isResponseSuccessful, formatResponseError } from '@/app/helpers';

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

type FieldNames =
    | 'name'
    | 'email'
    | 'country'
    | 'state'
    | 'city'
    | 'zipCode'
    | 'cellphoneNumber'
    | 'officeNumber'
    | 'addrMail'
    | 'addrOffice'
    | 'remarks';

type ValueSetter = (f: FieldNames, val: any) => void;

type FormStore = {
    values: { [p in FieldNames]: any; },
    setValue: ValueSetter
};

const SupplierPersonalInformationForm: React.FC<{ store: FormStore, allDisabled: boolean }> = props => {
    const { values, setValue } = props.store;
    const { allDisabled } = props;

    const form_handler = React.useCallback((name: FieldNames) => {
        return e => setValue(name, e.target.value);
    }, [setValue])

    return (
        <React.Fragment>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup
                        disabled={allDisabled}
                        label="Supplier Name"
                    >
                        <InputGroup
                            placeholder="Enter supplier name"
                            fill={true}
                            leftIcon="layers"
                            disabled={allDisabled}
                            value={values.name}
                            onChange={form_handler('name')}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Email Address">
                        <InputGroup
                            placeholder="Enter Email Address"
                            fill={true}
                            leftIcon="envelope"
                            disabled={allDisabled}
                            value={values.email}
                            onChange={form_handler('email')}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={4}>
                    <FormGroup label="Country" disabled={allDisabled}>
                        <CountrySelect
                            targetButtonProps={{
                                disabled: allDisabled
                            }}
                            selectedCountry={values.country}
                            onCountryChange={v => setValue('country', v)}
                            intent="success"
                            fill={true}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={3}>
                    <FormGroup label="State / Province" disabled={allDisabled}>
                        <InputGroup
                            placeholder="Enter State"
                            fill={true}
                            leftIcon="map"
                            disabled={allDisabled}
                            value={values.state}
                            onChange={form_handler('state')}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={3}>
                    <FormGroup label="City" disabled={allDisabled}>
                        <InputGroup
                            placeholder="Enter City"
                            fill={true}
                            leftIcon="map-marker"
                            disabled={allDisabled}
                            value={values.city}
                            onChange={form_handler('city')}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={2}>
                    <FormGroup label="Zip Code" disabled={allDisabled}>
                        <InputGroup
                            placeholder="Enter Code"
                            fill={true}
                            leftIcon="geolocation"
                            disabled={allDisabled}
                            value={values.zipCode}
                            onChange={form_handler('zipCode')}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup
                        disabled={allDisabled}
                        label="Cellphone Number"
                        helperText={`Start the number with a country calling code if it is not
                                    from the country selected previouly. `}
                    >
                        <ReactPhoneInput
                            disabled={allDisabled}
                            value={values.cellphoneNumber ?? undefined}
                            onChange={v => setValue('cellphoneNumber', v)}
                            inputComponent={CellphoneInput as any}
                            defaultCountry={maybeGetCallingCountryCode(values.country?.code)}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Office Telephone Number" disabled={allDisabled}>
                        <ReactPhoneInput
                            disabled={allDisabled}
                            value={values.officeNumber ?? undefined}
                            onChange={v => setValue('officeNumber', v)}
                            inputComponent={TelephoneInput as any}
                            defaultCountry={values.country?.code}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <GridRow>
                <GridColumn colSize={6}>
                    <FormGroup label="Mailing Address" disabled={allDisabled}>
                        <TextArea
                            placeholder="Enter Address"
                            fill={true}
                            style={{ resize: 'vertical' }}
                            disabled={allDisabled}
                            value={values.addrMail}
                            onChange={form_handler('addrMail')}
                        />
                    </FormGroup>
                    <FormGroup
                        disabled={allDisabled}
                        label={
                            <>Remarks <span className={classNames(Classes.TEXT_MUTED, Classes.TEXT_SMALL)}>(Optional)</span></>
                        }
                    >
                        <TextArea
                            placeholder="None..."
                            fill={true}
                            style={{ resize: 'vertical' }}
                            disabled={allDisabled}
                            value={values.remarks}
                            onChange={form_handler('remarks')}
                        />
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={6}>
                    <FormGroup label="Permanent/Office Address" disabled={allDisabled}>
                        <TextArea
                            placeholder="Enter Address"
                            fill={true}
                            style={{ resize: 'vertical' }}
                            disabled={allDisabled}
                            value={values.addrOffice}
                            onChange={form_handler('addrOffice')}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <br />
        </React.Fragment>
    );
};


const ViewContent = () => {

    const [form_name, setform_name] = React.useState<string>('');
    const [form_email, setform_email] = React.useState<string>('');
    const [form_country, setform_country] = React.useState<ICountry>();
    const [form_state, setform_state] = React.useState<string>('');
    const [form_city, setform_city] = React.useState<string>('');
    const [form_zipCode, setform_zipCode] = React.useState<string>('');
    const [form_cellphoneNumber, setform_cellphoneNumber] = React.useState<ReactPhoneInputState>();
    const [form_officeNumber, setform_officeNumber] = React.useState<ReactPhoneInputState>();
    const [form_addrMail, setform_addrMail] = React.useState<string>('');
    const [form_addrOffice, setform_addrOffice] = React.useState<string>('');
    const [form_remarks, setform_remarks] = React.useState<string>('');

    const [allRawMaterial, setRawMaterials] = React.useState<IRawMaterial[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const [selectedRawMaterial, setSelectedRawMaterial] = React.useState<IRawMaterial>();
    const [mat_Capacity, setmat_Capacity] = React.useState<number>();

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const onSelectedRawMaterialChange = React.useCallback(e => {
        const id = e.target.value;
        setSelectedRawMaterial(allRawMaterial.find(mat => mat.id == id));
    }, [allRawMaterial]);


    useEffect(() => {
        setIsLoading(true);
        window.SystemBackend.sendMessage(
            AppChannel.Inventory,
            new AllMessages.Inv.RM.GetAllMaterials()
        )
            .then(res => {
                if (isResponseSuccessful(res)) {
                    setRawMaterials(res.data!);
                    if (res.data!.length > 0) setSelectedRawMaterial(res.data![0])
                }
                else {
                    setRawMaterials([]);
                    setSelectedRawMaterial(undefined);
                }
            })
            .catch(err => console.log(err))
            .finally(() => setIsLoading(false))
    }, []);

    const personalInfo_setValue = React.useCallback((p: FieldNames, val: any) => {
        switch (p) {
            case 'name': return setform_name(val)
            case 'email': return setform_email(val)
            case 'country': return setform_country(val)
            case 'state': return setform_state(val)
            case 'city': return setform_city(val)
            case 'zipCode': return setform_zipCode(val)
            case 'cellphoneNumber': return setform_cellphoneNumber(val)
            case 'officeNumber': return setform_officeNumber(val)
            case 'addrMail': return setform_addrMail(val)
            case 'addrOffice': return setform_addrOffice(val)
            case 'remarks': return setform_remarks(val)
        }
    }, []);

    const store: FormStore = {
        values: {
            name: form_name,
            email: form_email,
            country: form_country,
            state: form_state,
            city: form_city,
            zipCode: form_zipCode,
            cellphoneNumber: form_cellphoneNumber,
            officeNumber: form_officeNumber,
            addrMail: form_addrMail,
            addrOffice: form_addrOffice,
            remarks: form_remarks,
        },
        setValue: personalInfo_setValue
    };

    const onSubmit = React.useCallback(async (values: FormStore['values']) => {
        const msg = new AllMessages.Supl.AddSupplier({
            name: values.name,
            email: values.email,
            countryCode: (values.country as ICountry || {}).code,
            state: values.state,
            city: values.city,
            zipCode: values.zipCode,
            cellphoneNumber: values.cellphoneNumber,
            officeNumber: values.officeNumber,
            addrMail: values.addrMail,
            addrOffice: values.addrOffice,
            remarks: values.remarks,
            capacity: mat_Capacity || 0,
            rawMaterialId: selectedRawMaterial ? selectedRawMaterial.id : 0
        });
        setIsSubmitting(true);
        const result = await window.SystemBackend.sendMessage(AppChannel.Suppliers, msg)
            .finally(() => setIsSubmitting(false));

        if (!isResponseSuccessful(result)) {
            AppToaster.show({ intent: 'danger', message: formatResponseError(result), icon: 'error' });
            return;
        }

        AppToaster.show({
            intent: 'success',
            message: "Supplier added successfully",
            icon: 'tick-circle'
        });

        setform_name('');
        setform_email('');
        setform_country(undefined);
        setform_state('');
        setform_city('');
        setform_zipCode('');
        setform_cellphoneNumber('');
        setform_officeNumber('');
        setform_addrMail('');
        setform_addrOffice('');
        setform_remarks('');
        setmat_Capacity(0);

    }, [mat_Capacity]);


    return (
        <React.Fragment>
            <div className="center-text-flow" style={{ margin: '0 0 15px' }}>
                <Icon size={16} icon="user" />
                <h5 className="bp3-heading icon-text-md">Personal Information</h5>
            </div>
            <SupplierPersonalInformationForm store={store} allDisabled={isSubmitting} />

            <HorizontalSectionDivider />

            <div className="center-text-flow" style={{ margin: '0 0 15px' }}>
                <Icon size={16} icon="duplicate" />
                <h5 className="bp3-heading icon-text-md">Product/Raw Material Information</h5>
            </div>
            <GridRow>
                <GridColumn colSize={7}>
                    <FormGroup
                        label="Select Raw Material"
                        helperText="The raw material that this vendor supplies"
                        disabled={isSubmitting}
                    >
                        {isLoading ?
                            <Button disabled={true} fill={true} text="Loading Materials..." /> :
                            <HTMLSelect
                                fill={true}
                                disabled={isSubmitting}
                                value={selectedRawMaterial?.id}
                                onChange={onSelectedRawMaterialChange}
                            >
                                {allRawMaterial.map(mat =>
                                    <option key={mat.id} value={mat.id}>{mat.name}</option>
                                )}
                            </HTMLSelect>
                        }
                    </FormGroup>
                </GridColumn>
                <GridColumn colSize={5}>
                    <FormGroup
                        disabled={isSubmitting}
                        label="Monthly Capacity"
                        helperText={<>Capacity measured in <strong>{selectedRawMaterial?.measurement_unit.toUpperCase()}</strong></>}
                    >
                        <NumericInput
                            placeholder="Enter Amount"
                            fill={true}
                            min={0}
                            leftIcon="truck"
                            clampValueOnBlur={true}
                            disabled={isSubmitting}
                            value={mat_Capacity}
                            onValueChange={value => {
                                setmat_Capacity(value);
                            }}
                        />
                    </FormGroup>
                </GridColumn>
            </GridRow>
            <br />
            <Button
                text="Add Vendor"
                rightIcon="chevron-right"
                intent="primary"
                loading={isSubmitting}
                disabled={isSubmitting}
                onClick={() => onSubmit(store.values)}
            />
        </React.Fragment>
    );
};


export const AddSupplierView = React.memo(() => {
    return (
        <NavPageView title="Add a New Supplier">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <ViewContent />
            </Card>
        </NavPageView>
    );
});
