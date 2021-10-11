import React from 'react';
import { InputGroup, InputGroupProps } from '@blueprintjs/core';
import { getCountries } from 'react-phone-number-input/input';
import { E164Number } from 'libphonenumber-js/types';


export type ReactPhoneInputState = E164Number | null;

// Now this is some convoluted logic you do not need to read

// Some places like Antartica and some islands usually do not have a calling code
const countries = getCountries();
const countriesHashMap = countries.reduce((acc, code) => {
    acc[code] = code;
    return acc;
}, {});
export const maybeGetCallingCountryCode = ccode => countriesHashMap[ccode];
export const hasCallingCode = x => !!maybeGetCallingCountryCode(x);

export const phone_input_factory = (inputProps: InputGroupProps, otherProps?: any) => {
    return React.forwardRef((phoneProps: any, ref) =>
        <InputGroup
            {...inputProps}
            {...otherProps}
            value={phoneProps.value}
            onChange={phoneProps.onChange}
            inputRef={ref as any} />
    );
};
