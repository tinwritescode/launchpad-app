import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  NODE_ENV: z.string(),
});

export const env = envSchema.parse(process.env);
