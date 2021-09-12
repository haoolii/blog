import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export class Category {

  @Field(() => String)
  @PrimaryKey()
  id: string = uuid();

  @Field(() => Category)
  @ManyToOne(() => Category, { nullable: true })
  parent: Category;

  @Field(() => String)
  @Property({ type: "text" })
  title: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  slug!: string;

  @Field(() => String)
  @Property({ type: "text" })
  metaTitle: string;

  @Field(() => String)
  @Property({ type: "text" })
  content: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
