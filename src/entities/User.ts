import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";
import { uuid } from "uuidv4";

@ObjectType()
@Entity()
export class User {

  @Field(() => String)
  @PrimaryKey()
  id: string = uuid();

  @Field(() => String)
  @Property({ type: "text" })
  name: string;

  @Field(() => String)
  @Property({ type: "text", unique: true })
  email: string;

  @Property({ type: "text" })
  password: string;

  @Field(() => String)
  @Property({ type: "date" })
  createdAt = new Date();

  @Field(() => String)
  @Property({ type: "date", onUpdate: () => new Date() })
  updatedAt = new Date();
}
