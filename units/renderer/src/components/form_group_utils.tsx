import React from 'react';
import {
    FormGroup,
    FormGroupProps,
    InputGroup,
    InputGroupProps,
    HTMLSelect,
    HTMLSelectProps
} from '@blueprintjs/core';
import {
    Field,
    FieldConfig,
    FastField,
    FastFieldConfig
} from 'formik';
import type * as Yup from 'yup';

export const FlexBoxFormGroup: React.FC<FormGroupProps> = React.memo(props => {
    const { style: overrideStyle, ...restProps } = props;
    return (
        <FormGroup
            style={{
                display: 'inline-flex',
                ...overrideStyle
            }}
            {...restProps}
        />
    );
});

export const FormGroupWithoutLabel: React.FC<FormGroupProps> = React.memo(props =>
    <FormGroup
        label={<>&nbsp;</>}
        {...props}
    />
);

export const RefNormalizedInputGroup = React.forwardRef((props: InputGroupProps, ref) => {
    return <InputGroup {...props} inputRef={ref as any} />
});

export const RefNormalizedHTMLSelect = React.forwardRef((props: HTMLSelectProps, ref) => {
    return <HTMLSelect {...props} elementRef={ref as any} />
});


// `Field` and `FastField` components have buggy built-in typings
export const WrappedField = Field as React.ComponentType<FieldConfig>;
export const WrappedFastField = FastField as React.ComponentType<FastFieldConfig<any>>;

export const createYupValidator = (schema: Yup.SchemaOf<any>) => {
    return (value: any) => {
        try {
            schema.validateSync(value);
            return undefined;
        }
        catch (e: any) {
            return e.message;
        }
    };
};
