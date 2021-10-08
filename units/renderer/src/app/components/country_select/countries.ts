import data from './_all_countries_list.json';
import TrieSearch from 'trie-search';

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


const countryTrieSearch = new TrieSearch(['code', 'name'] as (keyof ICountry)[]);
countryTrieSearch.addAll(ALL_COUNTRIES);

export const countrySearch = (q: any) => countryTrieSearch.search(q);

window['ALL_COUNTRIES'] = ALL_COUNTRIES;
window['ALL_COUNTRIES_MAPPING'] = ALL_COUNTRIES_MAPPING;
window['ALL_COUNTRIES_MAPPING_ARRAY'] = ALL_COUNTRIES_MAPPING_ARRAY;
