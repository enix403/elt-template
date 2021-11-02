import React from 'react';
import {
    FormGroup,
    FormGroupProps,
    InputGroup,
    InputGroupProps,
    HTMLSelect,
    HTMLSelectProps
} from '@blueprintjs/core';
import { useForm } from 'react-hook-form';

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


// See https://stackoverflow.com/a/52964723
// abstract class FormReturnTypeHelper<T> {
//     Returned = useForm<T>();
// }

// export type PropsWithForm<T, FormType = any> = T & {
//     formObj: FormReturnTypeHelper<FormType>['Returned'];
// };

// export function withForm<P extends PropsWithForm<{}, FormType>, FormType>(Component: React.ComponentType<P>)
// : React.ComponentType<Omit<P, keyof PropsWithForm<{}>>> {
//     return props => {
//         const form = useForm<FormType>();
//         return <Component {...props as any} formObj={form}/>
//     }
// }
