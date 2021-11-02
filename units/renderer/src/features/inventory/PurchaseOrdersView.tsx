import React from 'react';

import { NavPageView } from '@/layout/views';
import {
    NumericInput,
    FormGroup,
    Card,
    Button,
} from '@blueprintjs/core';
import { RefNormalizedInputGroup } from '@/components/form_group_utils';
import { Controller, useForm } from 'react-hook-form';

type FormData = {
    firstName: string;
    lastName: string;
    age: string;
};


export const PurchaseOrdersView: React.FC = () => {

    const { register, handleSubmit, control } = useForm<FormData>();
    const onSubmit = React.useCallback(handleSubmit(data => {
        console.log(data);
    }), []);

    console.log("re rendering");

    return (
        <NavPageView title="Purchase Orders">
            <Card elevation={2} style={{ margin: "15px 25px" }}>
                <h5 className="bp3-heading header-margin-b-l">
                    Generate New Purchase Order
                </h5>

                <form onSubmit={onSubmit}>
                    <FormGroup
                        label="First Name"
                    >
                        <RefNormalizedInputGroup
                            fill={true}
                            placeholder="Enter firstname"
                            leftIcon="satellite"
                            {...register('firstName')}
                        />
                    </FormGroup>
                    <FormGroup
                        label="Last Name"
                    >
                        <RefNormalizedInputGroup
                            fill={true}
                            placeholder="Enter lastname"
                            leftIcon="th-filtered"
                            {...register('lastName', { required: false })}
                        />
                    </FormGroup>

                    <FormGroup
                        label="Age"
                    >
                        <Controller
                            control={control}
                            name="age"
                            rules={{
                                required: true
                            }}
                            render={({field}) =>
                                (<NumericInput
                                    fill={true}
                                    min={0}
                                    leftIcon="panel-stats"
                                    placeholder="Enter middle age"
                                    onValueChange={(_, strVal) => field.onChange(strVal)}
                                    onBlur={field.onBlur}
                                    value={field.value}
                                    name={field.name}
                                    inputRef={field.ref}
                                    clampValueOnBlur={true}
                                />)}
                        />
                    </FormGroup>

                    <Button
                        text="Process"
                        intent="success"
                        type="submit"
                    />

                </form>

            </Card>
        </NavPageView>
    );
};
