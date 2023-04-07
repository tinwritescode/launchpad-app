import moment from "moment";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { safeVerifyMessage } from "../lib/auth";
import { createToken } from "../lib/jwt";

export const authRouter = createTRPCRouter({
  /*
    query
  */
  getMessage: publicProcedure
    .meta({ openapi: { tags: ["auth"], method: "GET", path: "/auth/message" } })
    .output(z.string())
    .input(z.void())
    .query(() => {
      return `By signing this message, you are agreeing to the terms of service. ${Date.now()}`;
    }),

  login: publicProcedure
    .meta({ openapi: { method: "POST", path: "/auth/login", tags: ["auth"] } })
    .output(z.any())
    .input(
      z
        .object({
          walletAddress: z.string(),
          message: z.string(),
          signature: z.string(),
        })
        .refine((data) => {
          const { signature, walletAddress, message } = data;

          const timestamp = message.split(" ").pop();
          if (!timestamp || moment().diff(timestamp, "minutes") > 5) {
            return false;
          }

          return safeVerifyMessage({
            message,
            signature,
            walletAddress,
          });
        })
    )
    .mutation(async ({ ctx, input }) => {
      const { walletAddress } = input;

      const user = await ctx.prisma.user.upsert({
        where: {
          walletAddress: walletAddress,
        },
        update: {},
        create: {
          walletAddress: walletAddress,
        },
      });

      return {
        user,
        // TODO: should reduce access token expiry time and make it refreshable
        jwtToken: createToken({
          user: {
            address: user.walletAddress,
            id: user.id,
            isLoggedIn: true,
            roles: user.roles,
          },
        }),
      };
    }),

  logout: publicProcedure
    .meta({ openapi: { method: "POST", path: "/auth/logout", tags: ["auth"] } })
    .input(z.void())
    .output(z.void())
    .mutation(async ({ ctx }) => {
      // TODO: handle logout by black list refresh token
    }),

  getSession: publicProcedure.query(({ ctx }) => {
    const nonLoginUser = { isLoggedIn: false } as const;
    const user = ctx.session?.user || nonLoginUser;

    return user;
  }),
});
