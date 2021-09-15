import { Category } from "./Category";
import { Tag } from "./Tag";
import { User } from "./User";
import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export class Post {
  @Field(() => String)
  @PrimaryKey()
  id: string = uuid();

  @Field({ nullable: true })
  @ManyToOne(() => User, { nullable: true })
  author: User;

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

  @Field(() => [Tag])
  @ManyToMany(() => Tag, (tag) => tag.posts, { owner: true })
  tags = new Collection<Tag>(this);

  @Field(() => Category)
  @ManyToOne(() => Category, { nullable: true })
  category: Category;

  @Field(() => String)
  @Property({ type: "date" })
  publishedAt = new Date();

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
