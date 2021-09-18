import { Post } from "./Post";
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export class Tag {

  @Field(() => String)
  @PrimaryKey()
  id: string = uuid();

  @Field(() => String)
  @Property({ type: "text", unique: true })
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

  @Field(() => [Post])
  @ManyToMany(() => Post, (post) => post.tags)
  posts = new Collection<Post>(this);

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
