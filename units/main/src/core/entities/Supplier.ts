import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    ManyToMany,
    OneToOne,
    JoinColumn,
    RelationId
} from 'typeorm';
import { RawMaterial } from './RawMaterial';
import { SupplierInfo } from './SupplierInfo';

@Entity("tbl_suppliers")
export class Supplier extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    name!: string;

    @ManyToMany(() => RawMaterial, mat => mat.suppliers)
    materials!: RawMaterial[];

    @OneToOne(type => SupplierInfo)
    @JoinColumn()
    info!: SupplierInfo;

    @RelationId((sup: Supplier) => sup.info)
    infoId!: number;
}
