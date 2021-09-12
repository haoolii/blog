import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";

@Entity()
export class Category {
  @PrimaryKey()
  id!: number;

  @ManyToOne(() => Category, { nullable: true })
  parent: Category;

  @Property({ type: "text" })
  title: string;

  @Property({ type: "text", unique: true })
  slug!: string;

  @Property({ type: "text" })
  metaTitle: string;

  @Property({ type: "text" })
  content: string;

  @Property({ type: "date" })
  createdAt = new Date();

  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
