import { PrismaClient } from "@prisma/client";
import { BigNumber, ethers } from "ethers";
import contractInfo from "../packages/contracts/out/contractInfo";
const prisma = new PrismaClient();

const main = async () => {
  // const project = await prisma.project.create({
  //   data: {
  //     comparisionContent: 'lorem',
  //     image:
  //       'https://images.pexels.com/photos/443446/pexels-photo-443446.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  //     name: 'Test project',
  //     roadmapContent: 'lorem',
  //     summaryContent: 'lorem',
  //     targettedRaise: BigNumber.from(
  //       BigNumber.from(10).pow(18).mul(100)
  //     ).toString(),
  //     videoURL: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
  //     id: 'test',
  //     User: {
  //       connectOrCreate: {
  //         where: {
  //           walletAddress: '0x56c7b349738CF0AC71aF0B31444bF04E757e2c10',
  //         },
  //         create: {
  //           walletAddress: '0x56c7b349738CF0AC71aF0B31444bF04E757e2c10',
  //         },
  //       },
  //     },
  //     token: {
  //       create: {
  //         address: contractInfo.contracts.IdoToken.address,
  //       },
  //     },
  //   },
  // });
  // console.log(`🙆‍♂️ Created project with id ${project.id}`);
  // console.log({ project });

  const tokensToDeploy = [
    {
      name: "Seapad",
      symbol: "SPT",
      decimals: 18,
      totalSupply: ethers.utils.parseEther("1000000000"),
      logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/d7a14c704fdf8cb7b567ea1ab4fdd02049429cee127e7ff528.png",
      tokenAddress: contractInfo.contracts.IDO_SPT.address,
    },
    {
      name: "Magic Shoes",
      symbol: "MCT",
      decimals: 18,
      totalSupply: ethers.utils.parseEther("1000000000"),
      logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/980f1258d72000eb44b2b87ba186aa4e56a5d2ad4d4c1609c8.png",
      tokenAddress: contractInfo.contracts.IDO_MCT.address,
    },
    {
      name: "Umi`s Friends",
      symbol: "UNT",
      decimals: 18,
      totalSupply: ethers.utils.parseEther("1000000000"),
      logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/6edbb8f2d6ede02516cc9bf042bcf129be7c9b1bc16347c985.png",
      tokenAddress: contractInfo.contracts.IDO_UNT.address,
    },
    {
      name: "Aradena",
      symbol: "AG",
      decimals: 18,
      totalSupply: ethers.utils.parseEther("1000000000"),
      logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/9e6dad32e738615740b791c908f406d0a8156f8ccfec4173dd.png",
      tokenAddress: contractInfo.contracts.IDO_AG.address,
    },
    {
      name: "MetaDoge",
      symbol: "MTDU",
      decimals: 18,
      totalSupply: ethers.utils.parseEther("1000000000"),
      logo: "https://s3-ap-southeast-1.amazonaws.com/bscstation.org/images/0a40916cf43ecfdd977ae28bb29f56aff58eded45c58e48e00.png",
      tokenAddress: contractInfo.contracts.IDO_MTDU.address,
    },
  ];

  for (const token of tokensToDeploy) {
    const project = await prisma.project.create({
      data: {
        token: {
          connectOrCreate: {
            where: {
              address: token.tokenAddress,
            },
            create: {
              address: token.tokenAddress,
            },
          },
        },
        status: "ACTIVE",
        // Fields that need to be filled
        image: "https://picsum.photos/200/300",
        videoURL: "https://www.youtube.com/watch?v=MNiGhWOMPJo",
        name: `IDO Project ${(Math.random() * 100).toFixed(0)}`,
        targettedRaise: "1000000",
        websiteURL: "https://myidoproject.com",
        facebookURL: "https://facebook.com/myidoproject",
        twitterURL: "https://twitter.com/myidoproject",
        telegramURL: "https://t.me/myidoproject",

        User: {
          connectOrCreate: {
            create: {
              walletAddress: "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10",
            },
            where: {
              walletAddress: "0x56c7b349738CF0AC71aF0B31444bF04E757e2c10",
            },
          },
        },

        descriptionContent: "Description Content",
        backerContent: "Backer Content",
        tokenDetailsContent: "Token Details Content",
        aboutContent: "About Content",
        roadmapContent: "Roadmap Content",
      },
    });

    console.log(`🙆‍♂️ Created project with id ${project.id}`);
    console.log({ project });
  }
};

main().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
