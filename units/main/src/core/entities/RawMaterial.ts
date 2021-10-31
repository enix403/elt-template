import { Collection, EntitySchema, IdentifiedReference } from "@mikro-orm/core";

import { SimpleEntity } from "./SimpleEntity";
import { RMCategory } from "./RMCategory";
import { Supplier } from './Supplier';
import type { IRawMaterial } from "@shared/object_types";

export class RawMaterial extends SimpleEntity implements IRawMaterial {
    name!: string;
    measurement_unit!: string;
    inventory_unit!: string;
    category!: IdentifiedReference<RMCategory>;
    suppliers!: Collection<Supplier>;
}


export const RawMaterialSchema = new EntitySchema<RawMaterial, SimpleEntity>({
    class: RawMaterial,
    tableName: 'tbl_raw_materials',
    properties: {
        name: { type: String },
        measurement_unit: { type: String },
        inventory_unit: { type: String },
        category: {
            reference: 'm:1',
            entity: () => RMCategory,
            wrappedReference: true,
            nullable: false
        },
        suppliers: {
            reference: 'm:n',
            entity: () => Supplier,
            inversedBy: sup => sup.materials
        }
    }
});
