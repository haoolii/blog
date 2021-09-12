import { Post } from "./../entities/Post";
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
} from "type-graphql";
import { QueryOrder } from "@mikro-orm/core";
import { slugify } from "transliteration";

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  metaTitle: string;
  @Field()
  content: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  total: number;
}

/** Need Impl */
@Resolver()
export class PostResolver {
  @Query(() => PaginatedPosts, { nullable: true })
  async posts(
    @Arg("pageIndex", () => Int) pageIndex: number,
    @Arg("pageSize", () => Int) pageSize: number,
    @Ctx() { em }: MyContext
  ): Promise<PaginatedPosts> {
    const offset = pageSize * pageIndex;

    const posts = await em.find(
      Post,
      {},
      {
        orderBy: { createdAt: QueryOrder.ASC },
        limit: pageSize,
        offset: offset,
      }
    );

    const total = await em.count(Post);

    return {
      total,
      posts,
    };
  }

  @Mutation(() => Post)
  async createPost(@Arg("input") input: PostInput, @Ctx() { em }: MyContext) {
    const post = em.create(Post, { ...input, slug: slugify(input.title) });
    await em.persistAndFlush(post);
    return post;
  }
}
