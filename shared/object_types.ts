export type HasID<T = number> = { id: T };
export type WithoutID<T extends HasID<K>, K = number> = Omit<T, 'id'>;

export interface ICategory {
    id: number;
    name: string;
    children?: ICategory[];
};

export interface IRawMaterial {
    id: number;
    name: string;
    measurement_unit: string;
    inventory_unit: string;
    categoryId: number;
};

export interface ISupplier {
    id: number;
    name: string;
    info?: ISupplierInfo | undefined;
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
