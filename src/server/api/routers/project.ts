import { z } from 'zod';

import { createTRPCRouter, publicProcedure } from '~/server/api/trpc';

export const projectRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),

  // TODO: should be protectedProcedure
  createOne: publicProcedure
    .input(
      z.object({
        name: z.string(),
        comparisionContent: z.string(),
        endTime: z.date(),
      })
    )
    .mutation(async ({ input, ctx: { prisma } }) => {
      const project = await prisma.project.create({
        // TODO: Change this
        /**
         *     id?: string
    createdAt?: Date | string
    updatedAt?: Date | string
    pricePerToken: number
    tokenSymbol: string
    name: string
    image: string
    progress: string
    status?: Status
    startTime: Date | string
    endTime: Date | string
    totalRaise?: number | null
    targetRaise?: number | null
    allocation?: string | null
    participants?: number | null
    summaryContent: string
    videoURL: string
    scheduleOpenDate: Date | string
    scheduleCloseDate: Date | string
    comparisionContent: string
    roundmapContent: string

         */
        data: {
          name: input.name,
          comparisionContent: input.comparisionContent,
          endTime: input.endTime,
          // fill all required fields
          pricePerToken: 0,
          tokenSymbol: '',
          image: '',
          progress: '',
          //status: Status.PENDING,
          startTime: new Date(),
          totalRaise: 0,
          targetRaise: 0,
          allocation: '',
          participants: 0,
          summaryContent: '',
          videoURL: '',
          scheduleOpenDate: new Date(),
          scheduleCloseDate: new Date(),
          roundmapContent: '',
        } as any,
      });

      return project;
    }),
  getAll: publicProcedure

    .input(
      z.object({
        status: z.enum(['ACTIVE', 'INACTIVE', 'DELETED']).default('ACTIVE'),
        offset: z.number().default(0),
        limit: z.number().default(10),
      })
    )
    .query(({ ctx, input }) => {
      //fake data
      if (input.status === 'ACTIVE') return data;
      if (input.status === 'INACTIVE') return data.slice(0, 3);
      if (input.status === 'DELETED') return data.slice(0, 5);
      // return ctx.prisma.project.findMany({
      //   skip: input.offset,
      //   take: input.limit,
      //   select: {
      //     id: true,
      //     status: input.status,
      //     name: true,
      //     pricePerToken: true,
      //     tokenSymbol: true,
      //     endTime: true,
      //     totalRaise: true,
      //     progress: true,
      //     Chain: {
      //       select: {
      //         id: true,
      //         image: true,
      //       },
      //     },
      //   },
      // });
    }),
  getOne: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ ctx, input }) => {
      return ctx.prisma.project.findUnique({
        where: {
          id: input.id,
        },
        include: {
          ScheduleRound: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),
});

const data = [
  {
    id: 'prId123451',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123452',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123453',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123454',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123454',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123454',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
  {
    id: 'prId123454',
    name: 'KyberDyne',
    image: 'https://picsum.photos/200/300',
    pricePerToken: 0.59,
    Chain: {
      id: 'chainid111323',
      image: 'https://picsum.photos/200/300',
      name: 'ABC',
    },
    endTime: new Date(),
    totalRaise: 100000000000,
    progress: '90%',
  },
];
//  id: "1234",
//       name: true,
//        pricePerToken: true,
//        tokenSymbol: true,
//        endTime: true,
//        totalRaise: true,
//        progress: true,
//        Chain: {
//          select: {
//            id: true,
//            image: true,
//          },
