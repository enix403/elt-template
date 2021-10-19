import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from 'typeorm';


@Entity("tbl_rm_category")
@Tree("nested-set")
export class RMCategory extends BaseEntity {
    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @TreeParent()
    parent!: RMCategory;

    @TreeChildren()
    children!: RMCategory[];
}
