import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const ADMIN_WALLET_ADDRESS = "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10";

async function main() {
  const owner = await prisma.user
    .create({
      data: {
        walletAddress: ADMIN_WALLET_ADDRESS,
        roles: ["ADMIN", "SUPER_ADMIN"],
      },
    })
    .catch((e) => {
      console.log("User already exists", e.message);

      return prisma.user.findUnique({
        where: {
          walletAddress: ADMIN_WALLET_ADDRESS,
        },
      });
    });

  console.log("Created/Found owner: ", owner);
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
