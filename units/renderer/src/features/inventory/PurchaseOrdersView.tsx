import React from 'react';

import { NavPageView } from '@/layout/views';
import {
    FormGroup,
    Card,
    Button,
    InputGroup,
} from '@blueprintjs/core';
import ReactPhoneInput from 'react-phone-number-input/input';

import { RefNormalizedInputGroup } from '@/components/form_group_utils';
import {
    Formik,
    Form,
} from 'formik';
import * as Yup from 'yup';
import { createYupValidator, WrappedFastField } from '@/components/form_group_utils';
import type { MirrorObjectShape } from '@shared/tsutils';


interface Values {
    firstName: string;
    phone: string;
    email: string;
};

const initialValues: Values = {
    firstName: '',
    phone: '',
    email: ''
};

const validators: MirrorObjectShape<Values> = {
    firstName: () => undefined,
    phone: createYupValidator(Yup.string().nullable(false).required("Your phone is required")),
    email: createYupValidator(Yup.string().email("Enter a valid email").required("Email is required")),
};

export const PurchaseOrdersView: React.FC = () => {

    return (
        <NavPageView title="Purchase Orders">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <h5 className="bp3-heading header-margin-b-l">
                    Generate New Purchase Order
                </h5>

                <Formik
                    initialValues={initialValues}
                    onSubmit={(values, actions) => {
                        console.log(values);
                        actions.setSubmitting(false);
                    }}
                >
                    <Form>
                        <WrappedFastField
                            name="firstName"
                            validate={validators.firstName}
                        >
                            {({ field, meta }) => {
                                const error = meta.touched && meta.error;
                                return (
                                    <FormGroup
                                        label="First Name"
                                        intent={error ? 'danger' : 'none'}
                                        helperText={error}
                                    >
                                        <InputGroup
                                            placeholder="Enter First Name"
                                            {...field}
                                            intent={error ? 'danger' : 'none'}
                                            leftIcon="video"
                                        />
                                    </FormGroup>
                                )
                            }}
                        </WrappedFastField>
                        <WrappedFastField
                            name="phone"
                            validate={validators.phone}
                        >
                            {({ field, meta, form }) => {
                                const error = meta.error;
                                return (
                                    <FormGroup
                                        label="Phone number"
                                        intent={error ? 'danger' : 'none'}
                                        helperText={error}
                                    >
                                        <ReactPhoneInput
                                            inputComponent={RefNormalizedInputGroup as any}
                                            defaultCountry={"PK"}

                                            {...field}
                                            onChange={v => {
                                                form.setFieldValue(field.name, v, true);
                                                form.setFieldTouched(field.name, true, true);
                                                form.validateField(field.name);
                                            }}

                                            placeholder="Enter Phone"
                                            intent={error ? 'danger' : 'none'}
                                            fill={true}
                                            leftIcon="drawer-right-filled"
                                        />
                                    </FormGroup>
                                )
                            }}
                        </WrappedFastField>
                        <WrappedFastField
                            name="email"
                            validate={validators.email}
                        >
                            {({ field, meta }) => {
                                const error = meta.touched && meta.error;
                                return (
                                    <FormGroup
                                        label="Email"
                                        intent={error ? 'danger' : 'none'}
                                        helperText={error}
                                    >
                                        <InputGroup
                                            placeholder="Enter email"
                                            {...field}
                                            intent={error ? 'danger' : 'none'}
                                        />
                                    </FormGroup>
                                )
                            }}
                        </WrappedFastField>

                        <Button type="submit" text="Process" />
                    </Form>
                </Formik>

            </Card>
        </NavPageView>
    );
};
