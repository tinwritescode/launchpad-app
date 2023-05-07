/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../common";
import type { Dividend, DividendInterface } from "../../contracts/Dividend";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "previousOwner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnershipTransferred",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        components: [
          {
            internalType: "address",
            name: "to",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
        ],
        internalType: "struct Dividend.TransferItem[]",
        name: "items",
        type: "tuple[]",
      },
    ],
    name: "distribute",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "renounceOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwnership",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x608060405234801561001057600080fd5b5061002d61002261003260201b60201c565b61003a60201b60201c565b6100fe565b600033905090565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b610bc88061010d6000396000f3fe608060405234801561001057600080fd5b506004361061004c5760003560e01c8063715018a6146100515780638da5cb5b1461005b578063adda9eec14610079578063f2fde38b14610095575b600080fd5b6100596100b1565b005b6100636100c5565b6040516100709190610596565b60405180910390f35b610093600480360381019061008e91906107d5565b6100ee565b005b6100af60048036038101906100aa9190610831565b610388565b005b6100b961040b565b6100c36000610489565b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6100f661040b565b6000805b8251811015610142578281815181106101165761011561085e565b5b6020026020010151602001518261012d91906108bc565b9150808061013a906108f0565b9150506100fa565b508273ffffffffffffffffffffffffffffffffffffffff166370a08231306040518263ffffffff1660e01b815260040161017c9190610596565b602060405180830381865afa158015610199573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906101bd919061094d565b8111156101ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016101f6906109d7565b60405180910390fd5b60005b8251811015610382578373ffffffffffffffffffffffffffffffffffffffff1663095ea7b384838151811061023a5761023961085e565b5b6020026020010151600001518584815181106102595761025861085e565b5b6020026020010151602001516040518363ffffffff1660e01b8152600401610282929190610a06565b6020604051808303816000875af11580156102a1573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102c59190610a67565b508281815181106102d9576102d861085e565b5b60200260200101516000015173ffffffffffffffffffffffffffffffffffffffff166366168bd7308584815181106103145761031361085e565b5b6020026020010151602001516040518363ffffffff1660e01b815260040161033d929190610a06565b600060405180830381600087803b15801561035757600080fd5b505af115801561036b573d6000803e3d6000fd5b50505050808061037a906108f0565b915050610202565b50505050565b61039061040b565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff16036103ff576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016103f690610b06565b60405180910390fd5b61040881610489565b50565b61041361054d565b73ffffffffffffffffffffffffffffffffffffffff166104316100c5565b73ffffffffffffffffffffffffffffffffffffffff1614610487576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161047e90610b72565b60405180910390fd5b565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff169050816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061058082610555565b9050919050565b61059081610575565b82525050565b60006020820190506105ab6000830184610587565b92915050565b6000604051905090565b600080fd5b600080fd5b6105ce81610575565b81146105d957600080fd5b50565b6000813590506105eb816105c5565b92915050565b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b61063f826105f6565b810181811067ffffffffffffffff8211171561065e5761065d610607565b5b80604052505050565b60006106716105b1565b905061067d8282610636565b919050565b600067ffffffffffffffff82111561069d5761069c610607565b5b602082029050602081019050919050565b600080fd5b600080fd5b6000819050919050565b6106cb816106b8565b81146106d657600080fd5b50565b6000813590506106e8816106c2565b92915050565b600060408284031215610704576107036106b3565b5b61070e6040610667565b9050600061071e848285016105dc565b6000830152506020610732848285016106d9565b60208301525092915050565b600061075161074c84610682565b610667565b90508083825260208201905060408402830185811115610774576107736106ae565b5b835b8181101561079d578061078988826106ee565b845260208401935050604081019050610776565b5050509392505050565b600082601f8301126107bc576107bb6105f1565b5b81356107cc84826020860161073e565b91505092915050565b600080604083850312156107ec576107eb6105bb565b5b60006107fa858286016105dc565b925050602083013567ffffffffffffffff81111561081b5761081a6105c0565b5b610827858286016107a7565b9150509250929050565b600060208284031215610847576108466105bb565b5b6000610855848285016105dc565b91505092915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006108c7826106b8565b91506108d2836106b8565b92508282019050808211156108ea576108e961088d565b5b92915050565b60006108fb826106b8565b91507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff820361092d5761092c61088d565b5b600182019050919050565b600081519050610947816106c2565b92915050565b600060208284031215610963576109626105bb565b5b600061097184828501610938565b91505092915050565b600082825260208201905092915050565b7f4e6f7420656e6f75676820746f6b656e73000000000000000000000000000000600082015250565b60006109c160118361097a565b91506109cc8261098b565b602082019050919050565b600060208201905081810360008301526109f0816109b4565b9050919050565b610a00816106b8565b82525050565b6000604082019050610a1b6000830185610587565b610a2860208301846109f7565b9392505050565b60008115159050919050565b610a4481610a2f565b8114610a4f57600080fd5b50565b600081519050610a6181610a3b565b92915050565b600060208284031215610a7d57610a7c6105bb565b5b6000610a8b84828501610a52565b91505092915050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000610af060268361097a565b9150610afb82610a94565b604082019050919050565b60006020820190508181036000830152610b1f81610ae3565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000610b5c60208361097a565b9150610b6782610b26565b602082019050919050565b60006020820190508181036000830152610b8b81610b4f565b905091905056fea2646970667358221220079a27d85202924d11a5b0c59f931520bad38670d5a7743038796d15dbf46ce464736f6c63430008120033";

type DividendConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: DividendConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Dividend__factory extends ContractFactory {
  constructor(...args: DividendConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Dividend> {
    return super.deploy(overrides || {}) as Promise<Dividend>;
  }
  override getDeployTransaction(
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Dividend {
    return super.attach(address) as Dividend;
  }
  override connect(signer: Signer): Dividend__factory {
    return super.connect(signer) as Dividend__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): DividendInterface {
    return new utils.Interface(_abi) as DividendInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): Dividend {
    return new Contract(address, _abi, signerOrProvider) as Dividend;
  }
}