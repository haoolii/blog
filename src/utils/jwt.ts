import jwt from "jsonwebtoken";

const signature = process.env.DB_SECRET || "signature";

export const generateToken = (userId: string): string => {
  const expiresIn = "6h";

  return jwt.sign({ userId }, signature, { expiresIn });
};

export const verifyToken = (token: string): { userId: string } | null => {
  try {
    let decoded = jwt.verify(token, signature) as { userId: string };
    return decoded;
  } catch (err) {
    return null;
  }
};
