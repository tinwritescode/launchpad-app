import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  try {
    let chains = await prisma.chain.findMany();
    if (chains.length == 0) {
      new Promise(() => {
        prisma.chain
          .create({
            data: {
              name: "Binance Smart Chain",
              image: "https://bscscan.com/images/main/bsc-token-logo/BUSD.svg",
            },
          })
          .then((res) => {
            prisma.project.create({
              data: {
                name: "Mi Fen",
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                targetRaise: 1000000,
                allocation: 1000000,
                Token: {
                  create: {
                    name: "Mi Fen",
                    symbol: "MIFEN",
                    address: "0x0000",
                    decimals: 18,
                    totalSupply: 1000000,
                  },
                },
                Chain: {
                  connect: {
                    id: res.id,
                  },
                },
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });

      new Promise(() => {
        prisma.chain
          .create({
            data: {
              name: "Ethereum",
              image: "https://bscscan.com/images/main/bsc-token-logo/ETH.svg",
            },
          })
          .then((res) => {
            prisma.project.create({
              data: {
                name: "Mike Fence",
                startTime: new Date(Date.now()),
                endTime: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                targetRaise: 1000000,
                allocation: 1000000,
                Token: {
                  create: {
                    name: "Mike Fence",
                    symbol: "MIKEFENCE",
                    address: "0x0000",
                    decimals: 18,
                    totalSupply: 1000000,
                  },
                },
                Chain: {
                  connect: {
                    id: res.id,
                  },
                },
              },
            });
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  } catch (e) {
    console.error(e);
  }
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
