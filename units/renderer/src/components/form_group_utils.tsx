import React from 'react';
import { FormGroup, FormGroupProps } from '@blueprintjs/core';

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
