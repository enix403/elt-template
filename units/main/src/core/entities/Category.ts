import {
    Entity,
    BaseEntity,
    Column,
    PrimaryGeneratedColumn,
    Tree,
    TreeChildren,
    TreeParent
} from 'typeorm';


@Entity("tbl_category")
@Tree("nested-set")
export class Category extends BaseEntity {

    @PrimaryGeneratedColumn()
    id!: number

    @Column()
    name!: string;

    @TreeChildren()
    children!: Category[];

    @TreeParent()
    parent!: Category;
}
