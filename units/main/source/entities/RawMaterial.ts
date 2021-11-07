import { Collection, EntitySchema, IdentifiedReference } from "@mikro-orm/core";

import type { IRawMaterial } from "@shared/object_types";
import { SimpleEntity } from "./SimpleEntity";
import { RMCategory } from "./RMCategory";
import { RelSupplierMaterial } from './RelSupplierMaterial';

export class RawMaterial extends SimpleEntity implements IRawMaterial {
    name: string;
    description: string;
    measurement_unit: string;
    category: IdentifiedReference<RMCategory>;

    suppliersRel: Collection<RelSupplierMaterial>;
}


export const RawMaterialSchema = new EntitySchema<RawMaterial, SimpleEntity>({
    class: RawMaterial,
    tableName: 'tbl_raw_materials',
    properties: {
        name: { type: String },
        description: { type: String },
        measurement_unit: { type: String },
        category: {
            reference: 'm:1',
            entity: () => RMCategory,
            wrappedReference: true,
            nullable: false
        },

        suppliersRel: {
            reference: '1:m',
            entity: () => RelSupplierMaterial,
            mappedBy: rel => rel.material,
            nullable: false
        }

    }
});
