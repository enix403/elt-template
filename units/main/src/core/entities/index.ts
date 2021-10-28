import type { BaseEntity } from 'typeorm';

import { RawMaterial } from "./RawMaterial";
import { RMCategory } from "./RMCategory";
import { Supplier } from "./Supplier";
import { SupplierInfo } from "./SupplierInfo";


export const allEntities = [
    RawMaterial,
    RMCategory,
    Supplier,
    SupplierInfo,
];


export {
    RawMaterial,
    RMCategory,
    Supplier,
    SupplierInfo,
};


/* See https://stackoverflow.com/a/51419293 */
export type ModelRelation<T> = {
    [P in keyof Required<T>]: T[P] extends Array<BaseEntity> | BaseEntity ? P : never
}[keyof T];

export type ModelRelationList<T> = T extends BaseEntity ? Array<ModelRelation<T>> : never;
