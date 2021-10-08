import data from './_countries_list.json';

export type CountryCode = keyof typeof data;

export interface ICountry {
    code: CountryCode;
    name: string;
};
type CountryMappingArray = Record<CountryCode, ICountry>;

export const ALL_COUNTRIES_MAPPING = data;
export const ALL_COUNTRIES: ICountry[] = Object.entries(data).map(([code, name]) =>
    ({code: code as CountryCode, name})
);
export const ALL_COUNTRIES_MAPPING_ARRAY = ALL_COUNTRIES.reduce<CountryMappingArray>((acc, item) => {
    acc[item.code] = item;
    return acc;
}, {} as CountryMappingArray);
