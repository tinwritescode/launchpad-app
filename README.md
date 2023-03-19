# IDO Launchpad App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Techstacks

- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)

## How do I run this?

1. Run database with Docker

Install docker if you haven't installed yet.

Clone the repo

```bash
git clone https://github.com/tinwritescode/launchpad-app
cd ./launchpad-app
```

Run `docker-compose`:

```bash
docker compose-up
```

2. Run local development server

Install packages:

```bash
pnpm install
```

Make sure that you already run blockchain node in our smart contract repo. 
If you don't run the blockchain node, some functions related to smart contract will not work as expected.

Run development server:

```bash
pnpm run dev
```