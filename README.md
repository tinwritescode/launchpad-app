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

Run `docker-compose`:

```bash
docker-compose up
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


## Ports

| URL | Port | Description
| --- | --- | --- |
| http://localhost:3000 | 3000 | Frontend |
| http://localhost:3300 | 3300 | Dashboard |

## Useful links

| URL | Name | Description
| --- | --- | --- |
| http://localhost:3000/docs | Swagger | API docs |
