import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { projectRouter } from "./routers/project/project";
//import { idoRouter } from "./routers/ido";
import { authRouter } from "./routers/auth";
import { demoProjectRouter } from "./routers/demoProject";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  project: projectRouter,
  //  ido: idoRouter,
  auth: authRouter,
  demoProject: demoProjectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
