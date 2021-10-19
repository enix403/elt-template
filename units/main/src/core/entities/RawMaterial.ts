import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    ManyToOne,
    JoinTable,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { RMCategory } from './RMCategory';

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

    @ManyToOne(type => RMCategory)
    category!: RMCategory;
}

