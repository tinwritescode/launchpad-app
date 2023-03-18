import { TRPCError } from "@trpc/server";
import moment from "moment";
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { safeVerifyMessage } from "./../lib/auth";

export const authRouter = createTRPCRouter({
  /*
    query
  */
  getMessage: publicProcedure.query(() => {
    return `By signing this message, you are agreeing to the terms of service. ${Date.now()}`;
  }),

  login: publicProcedure
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

      ctx.session.user = {
        address: walletAddress,
        isLoggedIn: true,
        roles: user.roles,
      };

      await ctx.session.save();

      return user;
    }),

  logout: publicProcedure.mutation(async ({ ctx }) => {
    ctx.session.user = undefined;
    await ctx.session.save();
  }),

  getSession: publicProcedure.query(({ ctx }) => {
    return (
      ctx.session.user ||
      ({
        isLoggedIn: false,
      } as const)
    );
  }),
});
