import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types";

export const isAuth: MiddlewareFn<MyContext> = ({ context }, next) => {
    if (!context.me) {
        throw new Error("not authenticated");
    }
  return next();
};
