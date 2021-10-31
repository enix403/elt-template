import { EntitySchema, IdentifiedReference } from "@mikro-orm/core";
import { ISupplierInfo } from "@shared/object_types";
import { SimpleEntity } from "./SimpleEntity";
import { Supplier } from "./Supplier";

export class SupplierInfo extends SimpleEntity implements ISupplierInfo {
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

    supplier: IdentifiedReference<Supplier>;
}


export const SupplierInfoSchema = new EntitySchema<SupplierInfo, SimpleEntity>({
    class: SupplierInfo,
    tableName: 'tbl_supl_infos',
    properties: {
        email: { type: String },

        countryCode: { type: String },
        state: { type: String },
        city: { type: String },
        zipCode: { type: String },

        cellphoneNumber: { type: String },
        officeNumber: { type: String },

        addrMail: { type: String },
        addrOffice: { type: String },

        remarks: { type: String },

        supplier: {
            reference: '1:1',
            entity: () => Supplier,
            inversedBy: sup => sup.info,
            wrappedReference: true,
            nullable: false,
        }
    }
});
