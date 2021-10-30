import { EntitySchema, IdentifiedReference } from "@mikro-orm/core";

import { SimpleEntity } from "./SimpleEntity";
import { RMCategory } from "./RMCategory";
import type { IRawMaterial } from "@shared/object_types";


export class RawMaterial extends SimpleEntity implements IRawMaterial {
    name!: string;
    measurement_unit!: string;
    inventory_unit!: string;
    category!: IdentifiedReference<RMCategory>;
}


export const RawMaterialSchema = new EntitySchema<RawMaterial, SimpleEntity>({
    class: RawMaterial,
    tableName: 'tbl_rawmats',
    properties: {
        name: { type: String },
        measurement_unit: { type: String },
        inventory_unit: { type: String },
        category: {
            reference: 'm:1',
            entity: () => RMCategory,
            wrappedReference: true,
            nullable: false
        }
    }
});
