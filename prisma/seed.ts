import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  await prisma.project.createMany({
    data: [
      {
        name: "Mi Fen",
        comparisionContent: "lorem ipsum",
        image: "https://picsum.photos/200",
        roadmapContent: "lorem ipsum",
        summaryContent: "lorem ipsum",
        videoURL: "https://www.youtube.com/watch?v=QH2-TGUlwu4",
      },
      {
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
