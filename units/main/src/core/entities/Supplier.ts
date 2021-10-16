import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany
} from 'typeorm';
import { RawMaterial } from './RawMaterial';

@Entity("tbl_suppliers")
export class Supplier extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => RawMaterial, mat => mat.suppliers)
    materials!: RawMaterial[];
}
