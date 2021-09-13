import { MikroORM } from "@mikro-orm/core";
import { ApolloServer } from "apollo-server-express";
import cors from "cors";
import express from "express";
import { buildSchema } from "type-graphql";
import { ___prod___ } from "./constants";
import { UserResolver } from "./resolvers/user";
import { MyContext } from "./types";
import microConfig from "./mikro-orm.config";
import { PostResolver } from "./resolvers/post";
import { verifyToken } from "./utils/jwt";

const main = async () => {
  const orm = await MikroORM.init(microConfig);

  const app = express();

  if (!___prod___) {
    app.use(cors());
  }

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [UserResolver, PostResolver],
      validate: false,
    }),
    context: ({ req, res }: MyContext) => {
      const token = req.headers.authorization;
      if (token) {
        const me = verifyToken(token);
        if (me) {
          return { em: orm.em, req, res, me };
        }
      }
      return { em: orm.em, req, res };
    },
  });

  await apolloServer.start();

  apolloServer.applyMiddleware({
    app,
    path: "/graphql",
    cors: false,
  });

  await app.listen(4000, () => {
    console.log("Server start on localhost:4000");
  });
};

main().catch((err) => {
  console.error(err);
});
