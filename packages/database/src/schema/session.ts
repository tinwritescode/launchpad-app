import { Role } from "@prisma/client";
import { z } from "zod";

export const sessionSchema = z.object({
  user: z.object({
    isLoggedIn: z.boolean(),
    roles: z.array(z.nativeEnum(Role)),
    address: z.string(),
    id: z.string(),
  }),
});

export type SessionType = z.infer<typeof sessionSchema>;
