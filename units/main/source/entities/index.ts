import type { Collection, IdentifiedReference } from '@mikro-orm/core';

import { SimpleEntity, SimpleEntitySchema } from './SimpleEntity';
import { RMCategory, RMCategorySchema } from './RMCategory';
import { RawMaterial, RawMaterialSchema } from './RawMaterial';
import { Supplier, SupplierSchema } from './Supplier';
import { SupplierInfo, SupplierInfoSchema } from './SupplierInfo';

const allEntities = [
    SimpleEntitySchema,
    RMCategorySchema,
    RawMaterialSchema,
    SupplierSchema,
    SupplierInfoSchema,
];

export default allEntities;

export {
    RMCategory,
    RawMaterial,
    Supplier,
    SupplierInfo,
}


export type ModelRelation<T> = {
    [P in keyof Required<T>]: T[P] extends
            | SimpleEntity
            | Collection<any>
            | IdentifiedReference<any>
        ? P : never
}[keyof T];

// It's kinda ugly to have `['somerelation'] as ModelRelation<SomeEntity>[]` floating everywhere.
export function entt_relation_list<T extends SimpleEntity>(...rels: ModelRelation<T>[]) { return rels; }

export function entt_field_list<T extends SimpleEntity>(...fields: (keyof T)[]) { return fields; }
