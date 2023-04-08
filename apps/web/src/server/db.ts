import { PrismaClient } from "database";
import { env } from "~/env.mjs";

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient({});

if (env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
