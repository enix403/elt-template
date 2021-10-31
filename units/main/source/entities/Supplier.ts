import { Collection, EntitySchema, IdentifiedReference } from "@mikro-orm/core";
import { SimpleEntity } from "./SimpleEntity";
import { SupplierInfo } from "./SupplierInfo";
import { RawMaterial } from './RawMaterial';

export class Supplier extends SimpleEntity {
    name!: string;
    info!: IdentifiedReference<SupplierInfo>;
    materials!: Collection<RawMaterial>;
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
        materials: {
            reference: 'm:n',
            entity: () => RawMaterial,
            mappedBy: mat => mat.suppliers
        }
    }
});
