import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from 'typeorm';

import type { ICategory } from '@shared/object_types';

@Entity("tbl_rm_category")
@Tree("nested-set")
export class RMCategory extends BaseEntity implements ICategory {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @TreeParent()
    parent!: RMCategory;

    @TreeChildren()
    children!: RMCategory[];
}
