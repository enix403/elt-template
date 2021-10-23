import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    JoinTable,
    RelationId
} from 'typeorm';

import type { IRawMaterial } from '@shared/object_types';

import { RMCategory } from './RMCategory';
import { Supplier } from './Supplier';

@Entity("tbl_raw_mts")
export class RawMaterial extends BaseEntity implements IRawMaterial {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    measurement_unit!: string;

    @Column()
    inventory_unit!: string;

    @ManyToMany(() => Supplier, sup => sup.materials)
    @JoinTable()
    suppliers!: Supplier[];

    @ManyToOne(type => RMCategory)
    category!: RMCategory;

    @RelationId((mat: RawMaterial) => mat.category)
    categoryId!: number;
}

