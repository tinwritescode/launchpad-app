# IDO Thesis Smart Contract

This is smart contract repo. Running this repo is required for the d-app to run on local.


## Local development

### Running node

You will need to run these commands for the node to run.

```shell
pnpm install
pnpm hardhat node # localnet work as default
```

Open another terminal, run: 
```shell
pnpm run deploy --network localhost
```

Then open the dapp repo, run `pnpm run dev` command.
Be sure that your `.env` is setup to listen to `http://127.0.0.1:8545` for accessing the node.