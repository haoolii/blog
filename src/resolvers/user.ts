import { User } from "./../entities/User";
import { MyContext } from "./../types";
import { Ctx, Query, Resolver } from "type-graphql";

/** Need Impl */
@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
      console.log(req);
      console.log(em);
    return null;
  }
}
