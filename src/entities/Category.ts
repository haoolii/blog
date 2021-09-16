import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export class Category {
  @Field(() => String)
  @PrimaryKey()
  id: string = uuid();

  @Field(() => Category, { nullable: true })
  @ManyToOne(() => Category, { nullable: true })
  parent: Category;

  @Field(() => String)
  @Property({ type: "text" })
  title: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  slug!: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  metaTitle?: string;

  @Field(() => String, { nullable: true })
  @Property({ type: "text", nullable: true })
  content?: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
