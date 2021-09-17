import { slugify } from "transliteration";
import { User } from "./../entities/User";
import { isAuth } from "./../middleware/isAuth";
import { Tag } from "./../entities/Tag";
import { MyContext } from "./../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { QueryOrder } from "@mikro-orm/core";

@InputType()
class TagInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  metaTitle: string;
  @Field({ nullable: true })
  content: string;
}

@InputType()
class UpdateTagInput {
  @Field()
  id: string;
  @Field()
  title: string;
  @Field({ nullable: true })
  metaTitle: string;
  @Field({ nullable: true })
  content: string;
}

@ObjectType()
class PaginatedTags {
  @Field(() => [Tag])
  list: Tag[];
  @Field()
  total: number;
}

@Resolver()
export class TagResolver {
  /** Get Tags List */
  @Query(() => PaginatedTags)
  async tags(
    @Arg("pageIndex", () => Int) pageIndex: number,
    @Arg("pageSize", () => Int) pageSize: number,
    @Ctx() { em }: MyContext
  ): Promise<PaginatedTags> {
    const offset = pageIndex * pageSize;

    const tags = await em.find(
      Tag,
      {},
      {
        orderBy: { createdAt: QueryOrder.DESC },
        limit: pageSize,
        offset,
      }
    );

    const total = await em.count(Tag);

    return {
      total,
      list: tags,
    };
  }

  /** Get Single Tag */
  @Query(() => Tag)
  async tag(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ): Promise<Tag> {
    const tag = await em.findOne(Tag, { id });
    if (!tag) {
      throw new Error("not exist");
    }
    return tag;
  }

  /** Get Single Tag With Slug */
  @Query(() => Tag)
  async tagSlug(
    @Arg("slug", () => String) slug: string,
    @Ctx() { em }: MyContext
  ): Promise<Tag> {
    const tag = await em.findOne(Tag, { slug });
    if (!tag) {
      throw new Error("not exist");
    }
    return tag;
  }

  /** Create Tag */
  @Mutation(() => Tag)
  @UseMiddleware(isAuth)
  async createTag(
    @Arg("input") input: TagInput,
    @Ctx() { em, userId }: MyContext
  ): Promise<Tag> {
    const author = await em.findOne(User, { id: userId });
    const tag = em.create(Tag, {
      ...input,
      slug: slugify(input.title),
      author,
    });
    await em.persistAndFlush(tag);
    return tag;
  }

  /** Delete Tag */
  @Mutation(() => Boolean)
  async deleteTag(@Arg("id") id: string, @Ctx() { em }: MyContext) {
    const tag = await em.findOne(Tag, { id });
    if (!tag) {
      throw new Error("not exist");
    }
    await em.removeAndFlush(tag);
    return true;
  }

  /** Update Tag */
  @Mutation(() => Tag)
  async updateTag(
    @Arg("input") input: UpdateTagInput,
    @Ctx() { em }: MyContext
  ) {
    const tag = await em.findOne(Tag, { id: input.id });
    if (!tag) {
      throw new Error("not exist");
    }
    if (input.content) {
      tag.content = input.content;
    }
    if (input.metaTitle) {
      tag.metaTitle = input.metaTitle;
    }
    if (input.metaTitle) {
      tag.metaTitle = input.metaTitle;
    }
    await em.flush();
    return tag;
  }
}
