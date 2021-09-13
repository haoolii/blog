import { User } from "./../entities/User";
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
  UseMiddleware,
} from "type-graphql";
import argon2 from "argon2";
import { generateToken } from "../utils/jwt";
import { isAuth } from "../middleware/isAuth";

@InputType()
class UserRegisterInput {
  @Field()
  email: string;
  @Field()
  password: string;
  @Field()
  name: string;
}

@InputType()
class EmailPasswordInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class MeResponse {
  @Field()
  id: string;
  @Field()
  name: string;
  @Field()
  email: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;

  @Field(() => String, { nullable: true })
  token?: string;
}

@Resolver()
export class UserResolver {
  @Query(() => MeResponse, { nullable: true })
  @UseMiddleware(isAuth)
  async me(@Ctx() { me }: MyContext): Promise<MeResponse> {
    return me;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UserRegisterInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    if (options.password.length <= 3) {
      return {
        errors: [
          {
            field: "password",
            message: "length must be greater than 3",
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await em.create(User, {
        name: options.name,
        email: options.email,
        password: hashedPassword,
      });
      await em.persistAndFlush(user);
    } catch (err) {
      return {
        errors: [
          {
            field: "unknow",
            message: "error happen",
          },
        ],
      };
    }
    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: EmailPasswordInput,
    @Ctx() { em }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { email: options.email });
    if (!user) {
      return {
        errors: [
          {
            field: "email",
            message: "email or password errors",
          },
        ],
      };
    }

    const valid = await argon2.verify(user.password, options.password);

    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "email or password errors",
          },
        ],
      };
    }

    return { user, token: generateToken(user) };
  }
}
