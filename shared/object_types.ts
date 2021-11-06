import type { TypedOmit } from './tsutils';

export type HasID<T = number> = { id: T };
export type WithoutID<T extends HasID<K>, K = number> = Omit<T, 'id'>;
export type IDRef<K = number> = { id: K };

export interface ICategory {
    id: number;
    name: string;
    children?: Array<ICategory>;
};

export type ICategoryPreview = TypedOmit<ICategory, 'children'>;

export interface IRawMaterial {
    id: number;
    name: string;
    description?: string;
    measurement_unit: string;
    inventory_unit: string;
    category: IDRef;
};

export interface ISupplier {
    id: number;
    name: string;
    materials?: IRawMaterial[];
}

export interface ISupplierInfo {
    email: string;

    countryCode: string;
    state: string;
    city: string;
    zipCode: string;

    cellphoneNumber: string;
    officeNumber: string;

    addrMail: string;
    addrOffice: string;

    remarks?: string;
}
