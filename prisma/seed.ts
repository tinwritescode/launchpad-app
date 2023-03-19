import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // await prisma.project.create({
  //   data: {
  //     name: "Mi Fen",
  //     startTime: new Date(Date.now()),
  //     endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //     targetRaise: 1000000,
  //     allocation: 1000000,
  //     Token: {
  //       create: {
  //         name: "Mi Fen",
  //         symbol: "MIFEN",
  //         address: "0x0000",
  //         decimals: 18,
  //         totalSupply: 1000000,
  //       },
  //     },
  //   },
  // });
  // await prisma.project.create({
  //   data: {
  //     name: "Mike Fence",
  //     startTime: new Date(Date.now()),
  //     endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
  //     targetRaise: 1000000,
  //     allocation: 1000000,
  //     Token: {
  //       create: {
  //         name: "Mike Fence",
  //         symbol: "MIKEFENCE",
  //         address: "0x00000",
  //         decimals: 18,
  //         totalSupply: 1000000,
  //       },
  //     },
  //   },
  // });
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
