import { Category } from './entities/Category';
import { Tag } from './entities/Tag';
import { Post } from './entities/Post';
import { MikroORM } from "@mikro-orm/core";
import path from "path";
import { User } from "./entities/User";

export default {
    entities: [User, Post, Tag, Category],
    type: 'postgresql',
    dbName: process.env.DB_NAME,
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    port: process.env.DB_PORT,
    debug: true,
    migrations: {
        path: path.join(__dirname, './migrations'),
        pattern: /^[\w-]+\d+\.[tj]s$/
    }
  } as Parameters<typeof MikroORM.init>[0];