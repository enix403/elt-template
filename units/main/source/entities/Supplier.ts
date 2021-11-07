import { Collection, EntitySchema, IdentifiedReference } from "@mikro-orm/core";
import { SimpleEntity } from "./SimpleEntity";
import { SupplierInfo } from "./SupplierInfo";
import { RelSupplierMaterial } from './RelSupplierMaterial';

export class Supplier extends SimpleEntity {
    name: string;
    info: IdentifiedReference<SupplierInfo>;
    materialsRel: Collection<RelSupplierMaterial>;
}

export const SupplierSchema = new EntitySchema<Supplier, SimpleEntity>({
    class: Supplier,
    tableName: 'tbl_suppliers',
    properties: {
        name: { type: String },
        info: {
            reference: '1:1',
            entity: () => SupplierInfo,
            mappedBy: info => info.supplier,
            wrappedReference: true,
            nullable: false,
        },
        materialsRel: {
            reference: '1:m',
            entity: () => RelSupplierMaterial,
            mappedBy: rel => rel.supplier,
            nullable: false
        }
    }
});
