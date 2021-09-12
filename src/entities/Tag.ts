import { Post } from "./Post";
import {
  Collection,
  Entity,
  ManyToMany,
  PrimaryKey,
  Property,
} from "@mikro-orm/core";

@Entity()
export class Tag {
  @PrimaryKey()
  id!: number;

  @Property({ type: "text" })
  title: string;

  @Property({ type: "text", unique: true })
  slug!: string;

  @Property({ type: "text" })
  metaTitle: string;

  @Property({ type: "text" })
  content: string;

  @ManyToMany(() => Post, (post) => post.tags)
  posts = new Collection<Post>(this);

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
