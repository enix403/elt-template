import { Collection, EntitySchema, IdentifiedReference } from "@mikro-orm/core";
import { SimpleEntity } from "./SimpleEntity";

export class RMCategory extends SimpleEntity {
    name!: string;
    children!: Collection<RMCategory>;
    parent?: IdentifiedReference<RMCategory> | undefined;
}

export const RMCategorySchema = new EntitySchema<RMCategory, SimpleEntity>({
    class: RMCategory,
    tableName: 'tbl_rm_cats',
    properties: {
        name: { type: String },
        children: {
            reference: '1:m',
            entity: () => RMCategory,
            mappedBy: cat => cat.parent,
            nullable: false,
        },
        parent: {
            reference: 'm:1',
            entity: () => RMCategory,
            inversedBy: cat => cat.children,
            wrappedReference: true,
            nullable: true
        }
    }
});
