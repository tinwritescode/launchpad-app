import { Role } from "database";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { env } from "../../../env.mjs";

const sessionSchema = z.object({
  user: z.object({
    isLoggedIn: z.boolean(),
    roles: z.array(z.nativeEnum(Role)),
    address: z.string(),
    id: z.string(),
  }),
});

type SessionType = z.infer<typeof sessionSchema>;

export const createToken = (payload: SessionType) => {
  return jwt.sign(payload, env.SESSION_SECRET, {
    expiresIn: "15d",
  });
};

export const verifyToken = async (token: string) => {
  const parsed = jwt.verify(token, env.SESSION_SECRET);

  if (!parsed) {
    throw new Error("Invalid token");
  }

  const session = sessionSchema.parse(parsed);

  return session;
};
