import { User } from "./../entities/User";
import jwt from "jsonwebtoken";

const signature = process.env.DB_SECRET || "signature";

export const generateToken = (user: User): string => {
  const data = {
    id: user.id,
    name: user.name,
    email: user.email,
  };

  const expiresIn = "6h";

  return jwt.sign({ data }, signature, { expiresIn });
};

export const verifyToken = (token: string): User | null => {
  try {
    let decoded = jwt.verify(token, signature) as { data: User };
    return decoded?.data;
  } catch (err) {
    return null;
  }
};
