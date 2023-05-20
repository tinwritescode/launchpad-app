import { authRouter } from './routers/auth';
import { projectRouter } from './routers/project/project';
import { scheduleRoundRouter } from './routers/scheduleRound';
import { adminRouter } from './routers/admin';
import { createTRPCRouter } from './trpc';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  auth: authRouter,
  project: projectRouter,
  scheduleRound: scheduleRoundRouter,
  admin: adminRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
