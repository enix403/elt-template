import {BaseEntity, Column, Entity, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import type { ISupplierInfo } from "@shared/object_types";
import { Supplier } from "./Supplier";

@Entity()
export class SupplierInfo extends BaseEntity implements ISupplierInfo {
    @PrimaryGeneratedColumn()
    id!: number

    @OneToOne(type => Supplier, sup => sup.info)
    supplier!: Supplier;

    @Column()
    email!: string;

    @Column()
    countryCode!: string;

    @Column()
    state!: string;

    @Column()
    city!: string;

    @Column()
    zipCode!: string;


    @Column()
    cellphoneNumber!: string;

    @Column()
    officeNumber!: string;


    @Column()
    addrMail!: string;

    @Column()
    addrOffice!: string;


    @Column()
    remarks?: string;
}
