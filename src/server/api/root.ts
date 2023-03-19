import { exampleRouter } from "~/server/api/routers/example";
import { createTRPCRouter } from "~/server/api/trpc";
import { projectRouter } from "./routers/project/project";
import { authRouter } from "./routers/auth";
import { chainRouter } from "./routers/chain";
import { demoProjectRouter } from "./routers/demoProject";
import { scheduleRoundRouter } from "./routers/scheduleRound";
import { tokenRouter } from "./routers/token";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  demoProject: demoProjectRouter,
  //
  auth: authRouter,
  //
  chain: chainRouter,
  project: projectRouter,
  token: tokenRouter,
  scheduleRound: scheduleRoundRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
