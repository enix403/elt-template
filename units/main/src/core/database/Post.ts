import { Entity, Property, PrimaryKey, BaseEntity } from '@mikro-orm/core';

@Entity()
export class Post {
    @PrimaryKey()
    id!: number;

    @Property({ type: 'text' })
    title!: string;

    @Property()
    content!: string;
}
