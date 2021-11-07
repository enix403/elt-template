import {  EntitySchema, IdentifiedReference, PrimaryKeyType } from "@mikro-orm/core";

import { RawMaterial } from "./RawMaterial";
import { SimpleEntity } from "./SimpleEntity";
import { Supplier } from './Supplier';

export class RelSupplierMaterial extends SimpleEntity {
    supplier: IdentifiedReference<Supplier>;
    material: IdentifiedReference<RawMaterial>;

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
}


export const RelSupplierMaterialSchema = new EntitySchema<RelSupplierMaterial, SimpleEntity>({
    class: RelSupplierMaterial,
    tableName: 'tbl_pivot_supls_mats',
    properties: {

        supplier: {
            reference: 'm:1',
            entity: () => Supplier,
            inversedBy: sup => sup.materialsRel,
            wrappedReference: true,
            nullable: false,
            // primary: true,
        },

        material: {
            reference: 'm:1',
            entity: () => RawMaterial,
            inversedBy: mat => mat.suppliersRel,
            wrappedReference: true,
            nullable: false,
            // primary: true,
        },

        capacity: { type: Number },
        minDeliveryDays: { type: Number },
        paymentTerms: { type: String },
        maxCreditDays: { type: Number },
    }
});
