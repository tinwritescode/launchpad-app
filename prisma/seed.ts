import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const owner = await prisma.user.create({
    data: {
      walletAddress: "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10",
    },
  });
  await prisma.project.createMany({
    data: [
      {
        ownerId: owner.id,
        name: "Mi Fen",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200",
        roadmapContent: "lorem ipsum",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      },
      {
        ownerId: owner.id,
        name: "Rex",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200",
        roadmapContent: "lorem ipsum",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      },
      {
        name: "Panda",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200",
        roadmapContent: "lorem ipsum",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
        ownerId: owner.id,
      },
    ],
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
