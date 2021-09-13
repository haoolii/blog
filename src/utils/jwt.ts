import { User } from "./../entities/User";
import jwt from "jsonwebtoken";

export const generateToken = (user: User): string => {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const signature = process.env.DB_SECRET || "signature";

  const expiresIn = "6h";

  return jwt.sign({ data }, signature, { expiresIn });
};
