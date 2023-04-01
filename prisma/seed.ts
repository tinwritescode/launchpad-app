import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { env } from "../src/env.mjs";

async function main() {
  const owner = await prisma.user
    .create({
      data: {
        walletAddress: "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10",
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    })
    .catch((e) => {
      console.log("User already exists");
      return prisma.user.findUnique({
        where: {
          walletAddress: "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10",
        },
      });
    });

  await prisma.project
    .create({
      data: {
        ownerId: owner?.id,
        name: "Mi Fen",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200",
        roadmapContent: "lorem ipsum",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        token: {
          create: {
            name: "Mi Fen",
            symbol: "MIF",
            decimals: 18,
            totalSupply: 100000,
            address: env.NEXT_PUBLIC_IDO_TOKEN_ADDRESS,
          },
        },
      },
    })
    .catch((e) => {
      console.log("Project already exists");
    });
}

main()
  .then(async () => {
    console.log("Seeding done.");
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
