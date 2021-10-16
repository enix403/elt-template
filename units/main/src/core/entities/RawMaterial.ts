import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    JoinTable
} from 'typeorm';

import { Supplier } from './Supplier';

@Entity("tbl_raw_mts")
export class RawMaterial extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @Column()
    measurement_unit!: string;

    @ManyToMany(() => Supplier, sup => sup.materials)
    @JoinTable()
    suppliers!: Supplier[];
}

