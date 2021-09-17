import { QueryOrder } from "@mikro-orm/core";
import { Category } from "./../entities/Category";
import { MyContext } from "./../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class CategoryInput {
  @Field()
  title: string;
  @Field({ nullable: true })
  metaTitle: string;
  @Field({ nullable: true })
  content: string;
}

@InputType()
class UpdateCategoryInput {
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
class Categories {
  @Field(() => [Category])
  list: Category[];
}

@Resolver()
export class CategoryResolver {
  /** Get Categories List */
  @Query(() => Categories)
  async categories(@Ctx() { em }: MyContext): Promise<Categories> {
    const categories = await em.find(
      Category,
      {},
      { orderBy: { createdAt: QueryOrder.DESC } }
    );
    return {
      list: categories,
    };
  }

  /** Get Single Category */
  @Query(() => Category)
  async category(
    @Arg("id", () => String) id: string,
    @Ctx() { em }: MyContext
  ) {
    const category = await em.findOne(Category, { id });
    if (!category) {
      throw new Error("not exist");
    }
    return category;
  }

  /** Create Category */
  @Mutation(() => Category)
  async createCategory(
    @Arg("input") input: CategoryInput,
    @Ctx() { em }: MyContext
  ): Promise<Category> {
    const category = em.create(Category, input);
    await em.persistAndFlush(category);
    return category;
  }

  /** Delete Category */
  @Mutation(() => Boolean)
  async deleteCategory(
    @Arg("id") id: string,
    @Ctx() { em }: MyContext
  ): Promise<Boolean> {
    const category = await em.findOne(Category, { id });
    if (!category) {
      throw new Error("not exist");
    }
    await em.removeAndFlush(category);
    return true;
  }

  /** Update Category */
  @Mutation(() => Category)
  async updateCategory(
    @Arg("input") input: UpdateCategoryInput,
    @Ctx() { em }: MyContext
  ): Promise<Category> {
    const category = await em.findOne(Category, { id: input.id });
    if (!category) {
      throw new Error("not exist");
    }
    if (input.content) {
      category.content = input.content;
    }
    if (input.title) {
      category.title = input.title;
    }
    if (input.metaTitle) {
      category.metaTitle = input.metaTitle;
    }
    await em.flush();
    return category;
  }
}
