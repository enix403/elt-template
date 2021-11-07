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
    category: IDRef;
    suppliersRel?: IRelSupplierMaterial[];
};

export interface ISupplier {
    id: number;
    name: string;
    materialsRel?: IRelSupplierMaterial[];
}

export interface IRelSupplierMaterial {
    supplier?: ISupplier;
    material?: IRawMaterial;

    /** @See https://mikro-orm.io/docs/composite-keys/#use-case-3-join-table-with-metadata */
    // [PrimaryKeyType]: [number, number];

    // -1 if not specified
    capacity: number;

    // -1 if not specified
    minDeliveryDays: number;

    // string enum
    paymentTerms: string;

    // -1 if not specified, only applicable if paymentTerms == credit
    maxCreditDays: number;

};

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
