/**
 * YOU PROBABLY DON'T NEED TO EDIT THIS FILE, UNLESS:
 * 1. You want to modify request context (see Part 1).
 * 2. You want to create a new middleware or type of procedure (see Part 3).
 *
 * TL;DR - This is where all the tRPC server stuff is created and plugged in. The pieces you will
 * need to use are documented accordingly near the end.
 */

/**
 * 1. CONTEXT
 *
 * This section defines the "contexts" that are available in the backend API.
 *
 * These allow you to access things when processing a request, like the database, the session, etc.
 */
import { PrismaClient } from '@prisma/client';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';
import { verifyToken } from './lib/jwt';

import { initTRPC, TRPCError } from '@trpc/server';
import { ethers } from 'ethers';
import superjson from 'superjson';
import { env } from '../../env.mjs';
import { getRpcProvider } from '../../libs/blockchain';

const prismaClient = new PrismaClient();

type CreateContextOptions = Record<string, never>;

/**
 * This helper generates the "internals" for a tRPC context. If you need to use it, you can export
 * it from here.
 *
 * Examples of things you may need it for:
 * - testing, so we don't have to mock Next.js' req/res
 * - tRPC's `createSSGHelpers`, where we don't have req/res
 *
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 */
const createInnerTRPCContext = (_opts: CreateContextOptions) => {
  const provider = getRpcProvider();
  const signer = new ethers.Wallet(env.ADMIN_PRIVATE_KEY, provider);

  return {
    prisma: prismaClient,
    signer,
  };
};

/**
 * This is the actual context you will use in your router. It will be used to process every request
 * that goes through your tRPC endpoint.
 *
 * @see https://trpc.io/docs/context
 */
export const createTRPCContext = async ({ req }: CreateNextContextOptions) => {
  const bearerToken = req.headers?.authorization?.split(' ')[1];
  const innerContext = createInnerTRPCContext({});
  const session = await verifyToken(bearerToken as string).catch(() => null);

  return {
    ...innerContext,
    session,
  };
};

/**
 * 2. INITIALIZATION
 *
 * This is where the tRPC API is initialized, connecting the context and transformer.
 */

const t = initTRPC.context<typeof createTRPCContext>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

/**
 * 3. ROUTER & PROCEDURE (THE IMPORTANT BIT)
 *
 * These are the pieces you use to build your tRPC API. You should import these a lot in the
 * "/src/server/api/routers" directory.
 */

/**
 * This is how you create new routers and sub-routers in your tRPC API.
 *
 * @see https://trpc.io/docs/router
 */
export const createTRPCRouter = t.router;

/**
 * Public (unauthenticated) procedure
 *
 * This is the base piece you use to build new queries and mutations on your tRPC API. It does not
 * guarantee that a user querying is authorized, but you can still access user session data if they
 * are logged in.
 */
export const publicProcedure = t.procedure;

const protectedMiddleware = t.middleware(async ({ next, ctx }) => {
  if (!ctx.session?.user?.isLoggedIn) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
    });
  }
  const { user } = ctx.session;
  await ctx.prisma.user
    .findUniqueOrThrow({
      where: {
        walletAddress: user.address,
      },
    })
    .catch(() => {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
      });
    });

  return next();
});

export const protectedProcedure = publicProcedure.use(protectedMiddleware);

export const adminProcedure = protectedProcedure.use(
  t.middleware(({ next, ctx }) => {
    // TODO: remove later, just for local testing
    if (
      ctx.session?.user.address === '0x56c7b349738CF0AC71aF0B31444bF04E757e2c10'
    ) {
      return next();
    }

    const roles = ['ADMIN', 'SUPER_ADMIN'];
    const userRoleArr = ctx.session?.user?.roles || [];

    // check if user is admin or super admin
    const isAdmin = userRoleArr.some((role: any) => roles.includes(role));

    if (!isAdmin) {
      throw new TRPCError({
        code: 'UNAUTHORIZED',
        message: 'You are not authorized to perform this action',
      });
    }

    return next();
  })
);
