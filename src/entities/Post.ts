import { Category } from './Category';
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

@Entity()
export class Post {
  @PrimaryKey()
  id!: number;

  @ManyToOne()
  author!: User;

  @Property({ type: "text"})
  title: string;

  @Property({ type: "text", unique: true })
  slug!: string;

  @Property({ type: "text" })
  metaTitle: string;

  @Property({ type: "text" })
  content: string;

  @ManyToMany(() => Tag, (tag) => tag.posts, { owner: true })
  tags = new Collection<Tag>(this);

  @ManyToOne(() => Category)
  category = new Collection<Category>(this);

  @Property({ type: "date" })
  publishedAt = new Date();

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
