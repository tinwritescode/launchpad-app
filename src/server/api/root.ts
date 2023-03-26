import { createTRPCRouter } from "~/server/api/trpc";
import { authRouter } from "./routers/auth";
import { projectRouter } from "./routers/project/project";
import { scheduleRoundRouter } from "./routers/scheduleRound";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  project: projectRouter,
  scheduleRound: scheduleRoundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
