import { PrismaClient } from '@prisma/client';
import { BigNumber } from 'ethers';
import contractInfo from '../packages/contracts/out/contractInfo';
const prisma = new PrismaClient();

const main = async () => {
  const project = await prisma.project.create({
    data: {
      comparisionContent: 'lorem',
      image:
        'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      name: 'Test project',
      roadmapContent: 'lorem',
      summaryContent: 'lorem',
      targettedRaise: BigNumber.from(
        BigNumber.from(10).pow(18).mul(100)
      ).toString(),
      videoURL: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
      id: 'test',
      User: {
        connectOrCreate: {
          where: {
            walletAddress: '0x56c7b349738CF0AC71aF0B31444bF04E757e2c10',
          },
          create: {
            walletAddress: '0x56c7b349738CF0AC71aF0B31444bF04E757e2c10',
          },
        },
      },
      token: {
        create: {
          address: contractInfo.contracts.IdoToken.address,
        },
      },
    },
  });

  console.log(`🙆‍♂️ Created project with id ${project.id}`);
  console.log({ project });
};

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
