import React from 'react';
// import { Button, HTMLSelect } from "@blueprintjs/core";
import { NavPageView } from "app/layout/views";
import { CountrySelectWrapper } from 'app/components/country_select';
import { ALL_COUNTRIES_MAPPING_ARRAY, ICountry } from 'app/components/country_select/countries';


export const ScratchPlace = () => {
    const [country, setCountry] = React.useState<ICountry>(ALL_COUNTRIES_MAPPING_ARRAY['PK']);
    return (
        <NavPageView title="Scratch Place">
            <div style={{ padding: "10px 40px" }}>
                <CountrySelectWrapper
                    selectedCountry={country}
                    onCountryChange={setCountry}
                    intent="success"
                />
            </div>
        </NavPageView>
    );
};
