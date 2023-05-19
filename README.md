# IDO Launchpad App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## Techstacks

- [Turborepo](https://turbo.build/)
- [Next.js](https://nextjs.org)
- [Prisma](https://prisma.io)
- [tRPC](https://trpc.io)
- [Hardhat](https://hardhat.org)
- [Ethers](https://docs.ethers.io/v5/)
- [Material UI](https://material-ui.com/)

## How do I run this?

1. Run database with Docker

Install docker if you haven't installed yet.

Clone the repo

```bash
git clone https://github.com/tinwritescode/launchpad-app
cd ./launchpad-app
```

Setting up env:

```bash
cp .env.example .env
```

Run `docker-compose`:

```bash
docker-compose up
```

Setting up database:

```bash
pnpm run turbo db:push
```

2. Run local development server

Install packages:

```bash
pnpm install
```

Run development server:

```bash
pnpm run dev
```

## Reset db

When in development, for example when you restart with `pnpm run dev`, you may want to clear the database as well. Use this command:

```bash
yarn turbo db:reset
```

Then restart the development server.

```bash
pnpm run dev
```

Notice that you may want to logout (from the dashboard) and login again after resetting the database. This is because the database is cleared, but the session is not.

## Debug with VSCode

First, start the development server:

```bash
pnpm run dev
```

Then, in VSCode, attach to the process by pressing `Ctrl + Shift + D` and select `Attach to Node` then type-in the word: `web` and select the first option.

Place `debugger;` in the code where you want to debug.

## Ports

| URL | Port | Description
| --- | --- | --- |
| http://localhost:3000 | 3000 | Frontend |
| http://localhost:3300 | 3300 | Dashboard |

## Useful links

| URL | Name | Description
| --- | --- | --- |
| http://localhost:3000/docs | Swagger | API docs |
