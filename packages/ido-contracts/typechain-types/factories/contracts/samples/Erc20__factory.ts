/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import {
  Signer,
  utils,
  Contract,
  ContractFactory,
  BigNumberish,
  Overrides,
} from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Erc20, Erc20Interface } from "../../../contracts/samples/Erc20";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_totalSupply",
        type: "uint256",
      },
      {
        internalType: "string",
        name: "_name",
        type: "string",
      },
      {
        internalType: "string",
        name: "_symbol",
        type: "string",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
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
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "_amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
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
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
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
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
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
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
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
  "0x60806040523480156200001157600080fd5b506040516200217a3803806200217a8339818101604052810190620000379190620004ad565b818181600390816200004a919062000788565b5080600490816200005c919062000788565b5050506200007f620000736200009a60201b60201c565b620000a260201b60201c565b6200009133846200016860201b60201c565b5050506200098a565b600033905090565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603620001da576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401620001d190620008d0565b60405180910390fd5b620001ee60008383620002d560201b60201c565b806002600082825462000202919062000921565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051620002b591906200096d565b60405180910390a3620002d160008383620002da60201b60201c565b5050565b505050565b505050565b6000604051905090565b600080fd5b600080fd5b6000819050919050565b6200030881620002f3565b81146200031457600080fd5b50565b6000815190506200032881620002fd565b92915050565b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b620003838262000338565b810181811067ffffffffffffffff82111715620003a557620003a462000349565b5b80604052505050565b6000620003ba620002df565b9050620003c8828262000378565b919050565b600067ffffffffffffffff821115620003eb57620003ea62000349565b5b620003f68262000338565b9050602081019050919050565b60005b838110156200042357808201518184015260208101905062000406565b60008484015250505050565b6000620004466200044084620003cd565b620003ae565b90508281526020810184848401111562000465576200046462000333565b5b6200047284828562000403565b509392505050565b600082601f8301126200049257620004916200032e565b5b8151620004a48482602086016200042f565b91505092915050565b600080600060608486031215620004c957620004c8620002e9565b5b6000620004d98682870162000317565b935050602084015167ffffffffffffffff811115620004fd57620004fc620002ee565b5b6200050b868287016200047a565b925050604084015167ffffffffffffffff8111156200052f576200052e620002ee565b5b6200053d868287016200047a565b9150509250925092565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806200059a57607f821691505b602082108103620005b057620005af62000552565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026200061a7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82620005db565b620006268683620005db565b95508019841693508086168417925050509392505050565b6000819050919050565b600062000669620006636200065d84620002f3565b6200063e565b620002f3565b9050919050565b6000819050919050565b620006858362000648565b6200069d620006948262000670565b848454620005e8565b825550505050565b600090565b620006b4620006a5565b620006c18184846200067a565b505050565b5b81811015620006e957620006dd600082620006aa565b600181019050620006c7565b5050565b601f82111562000738576200070281620005b6565b6200070d84620005cb565b810160208510156200071d578190505b620007356200072c85620005cb565b830182620006c6565b50505b505050565b600082821c905092915050565b60006200075d600019846008026200073d565b1980831691505092915050565b60006200077883836200074a565b9150826002028217905092915050565b620007938262000547565b67ffffffffffffffff811115620007af57620007ae62000349565b5b620007bb825462000581565b620007c8828285620006ed565b600060209050601f831160018114620008005760008415620007eb578287015190505b620007f785826200076a565b86555062000867565b601f1984166200081086620005b6565b60005b828110156200083a5784890151825560018201915060208501945060208101905062000813565b868310156200085a578489015162000856601f8916826200074a565b8355505b6001600288020188555050505b505050505050565b600082825260208201905092915050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000620008b8601f836200086f565b9150620008c58262000880565b602082019050919050565b60006020820190508181036000830152620008eb81620008a9565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006200092e82620002f3565b91506200093b83620002f3565b9250828201905080821115620009565762000955620008f2565b5b92915050565b6200096781620002f3565b82525050565b60006020820190506200098460008301846200095c565b92915050565b6117e0806200099a6000396000f3fe608060405234801561001057600080fd5b50600436106100f55760003560e01c806370a0823111610097578063a457c2d711610066578063a457c2d714610276578063a9059cbb146102a6578063dd62ed3e146102d6578063f2fde38b14610306576100f5565b806370a0823114610200578063715018a6146102305780638da5cb5b1461023a57806395d89b4114610258576100f5565b806323b872dd116100d357806323b872dd14610166578063313ce5671461019657806339509351146101b457806340c10f19146101e4576100f5565b806306fdde03146100fa578063095ea7b31461011857806318160ddd14610148575b600080fd5b610102610322565b60405161010f9190610f29565b60405180910390f35b610132600480360381019061012d9190610fe4565b6103b4565b60405161013f919061103f565b60405180910390f35b6101506103d7565b60405161015d9190611069565b60405180910390f35b610180600480360381019061017b9190611084565b6103e1565b60405161018d919061103f565b60405180910390f35b61019e610410565b6040516101ab91906110f3565b60405180910390f35b6101ce60048036038101906101c99190610fe4565b610419565b6040516101db919061103f565b60405180910390f35b6101fe60048036038101906101f99190610fe4565b610450565b005b61021a6004803603810190610215919061110e565b610466565b6040516102279190611069565b60405180910390f35b6102386104ae565b005b6102426104c2565b60405161024f919061114a565b60405180910390f35b6102606104ec565b60405161026d9190610f29565b60405180910390f35b610290600480360381019061028b9190610fe4565b61057e565b60405161029d919061103f565b60405180910390f35b6102c060048036038101906102bb9190610fe4565b6105f5565b6040516102cd919061103f565b60405180910390f35b6102f060048036038101906102eb9190611165565b610618565b6040516102fd9190611069565b60405180910390f35b610320600480360381019061031b919061110e565b61069f565b005b606060038054610331906111d4565b80601f016020809104026020016040519081016040528092919081815260200182805461035d906111d4565b80156103aa5780601f1061037f576101008083540402835291602001916103aa565b820191906000526020600020905b81548152906001019060200180831161038d57829003601f168201915b5050505050905090565b6000806103bf610722565b90506103cc81858561072a565b600191505092915050565b6000600254905090565b6000806103ec610722565b90506103f98582856108f3565b61040485858561097f565b60019150509392505050565b60006012905090565b600080610424610722565b90506104458185856104368589610618565b6104409190611234565b61072a565b600191505092915050565b610458610bf5565b6104628282610c73565b5050565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6104b6610bf5565b6104c06000610dc9565b565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905090565b6060600480546104fb906111d4565b80601f0160208091040260200160405190810160405280929190818152602001828054610527906111d4565b80156105745780601f1061054957610100808354040283529160200191610574565b820191906000526020600020905b81548152906001019060200180831161055757829003601f168201915b5050505050905090565b600080610589610722565b905060006105978286610618565b9050838110156105dc576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016105d3906112da565b60405180910390fd5b6105e9828686840361072a565b60019250505092915050565b600080610600610722565b905061060d81858561097f565b600191505092915050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b6106a7610bf5565b600073ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff1603610716576040517f08c379a000000000000000000000000000000000000000000000000000000000815260040161070d9061136c565b60405180910390fd5b61071f81610dc9565b50565b600033905090565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610799576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610790906113fe565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610808576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016107ff90611490565b60405180910390fd5b80600160008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925836040516108e69190611069565b60405180910390a3505050565b60006108ff8484610618565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff8114610979578181101561096b576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610962906114fc565b60405180910390fd5b610978848484840361072a565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109ee576040517f08c379a00000000000000000000000000000000000000000000000000000000081526004016109e59061158e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610a5d576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610a5490611620565b60405180910390fd5b610a68838383610e8f565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610aee576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610ae5906116b2565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550816000808573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef84604051610bdc9190611069565b60405180910390a3610bef848484610e94565b50505050565b610bfd610722565b73ffffffffffffffffffffffffffffffffffffffff16610c1b6104c2565b73ffffffffffffffffffffffffffffffffffffffff1614610c71576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610c689061171e565b60405180910390fd5b565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610ce2576040517f08c379a0000000000000000000000000000000000000000000000000000000008152600401610cd99061178a565b60405180910390fd5b610cee60008383610e8f565b8060026000828254610d009190611234565b92505081905550806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055508173ffffffffffffffffffffffffffffffffffffffff16600073ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610db19190611069565b60405180910390a3610dc560008383610e94565b5050565b6000600560009054906101000a900473ffffffffffffffffffffffffffffffffffffffff16905081600560006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055508173ffffffffffffffffffffffffffffffffffffffff168173ffffffffffffffffffffffffffffffffffffffff167f8be0079c531659141344cd1fd0a4f28419497f9722a3daafe3b4186f6b6457e060405160405180910390a35050565b505050565b505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610ed3578082015181840152602081019050610eb8565b60008484015250505050565b6000601f19601f8301169050919050565b6000610efb82610e99565b610f058185610ea4565b9350610f15818560208601610eb5565b610f1e81610edf565b840191505092915050565b60006020820190508181036000830152610f438184610ef0565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610f7b82610f50565b9050919050565b610f8b81610f70565b8114610f9657600080fd5b50565b600081359050610fa881610f82565b92915050565b6000819050919050565b610fc181610fae565b8114610fcc57600080fd5b50565b600081359050610fde81610fb8565b92915050565b60008060408385031215610ffb57610ffa610f4b565b5b600061100985828601610f99565b925050602061101a85828601610fcf565b9150509250929050565b60008115159050919050565b61103981611024565b82525050565b60006020820190506110546000830184611030565b92915050565b61106381610fae565b82525050565b600060208201905061107e600083018461105a565b92915050565b60008060006060848603121561109d5761109c610f4b565b5b60006110ab86828701610f99565b93505060206110bc86828701610f99565b92505060406110cd86828701610fcf565b9150509250925092565b600060ff82169050919050565b6110ed816110d7565b82525050565b600060208201905061110860008301846110e4565b92915050565b60006020828403121561112457611123610f4b565b5b600061113284828501610f99565b91505092915050565b61114481610f70565b82525050565b600060208201905061115f600083018461113b565b92915050565b6000806040838503121561117c5761117b610f4b565b5b600061118a85828601610f99565b925050602061119b85828601610f99565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b600060028204905060018216806111ec57607f821691505b6020821081036111ff576111fe6111a5565b5b50919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b600061123f82610fae565b915061124a83610fae565b925082820190508082111561126257611261611205565b5b92915050565b7f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f7760008201527f207a65726f000000000000000000000000000000000000000000000000000000602082015250565b60006112c4602583610ea4565b91506112cf82611268565b604082019050919050565b600060208201905081810360008301526112f3816112b7565b9050919050565b7f4f776e61626c653a206e6577206f776e657220697320746865207a65726f206160008201527f6464726573730000000000000000000000000000000000000000000000000000602082015250565b6000611356602683610ea4565b9150611361826112fa565b604082019050919050565b6000602082019050818103600083015261138581611349565b9050919050565b7f45524332303a20617070726f76652066726f6d20746865207a65726f2061646460008201527f7265737300000000000000000000000000000000000000000000000000000000602082015250565b60006113e8602483610ea4565b91506113f38261138c565b604082019050919050565b60006020820190508181036000830152611417816113db565b9050919050565b7f45524332303a20617070726f766520746f20746865207a65726f20616464726560008201527f7373000000000000000000000000000000000000000000000000000000000000602082015250565b600061147a602283610ea4565b91506114858261141e565b604082019050919050565b600060208201905081810360008301526114a98161146d565b9050919050565b7f45524332303a20696e73756666696369656e7420616c6c6f77616e6365000000600082015250565b60006114e6601d83610ea4565b91506114f1826114b0565b602082019050919050565b60006020820190508181036000830152611515816114d9565b9050919050565b7f45524332303a207472616e736665722066726f6d20746865207a65726f20616460008201527f6472657373000000000000000000000000000000000000000000000000000000602082015250565b6000611578602583610ea4565b91506115838261151c565b604082019050919050565b600060208201905081810360008301526115a78161156b565b9050919050565b7f45524332303a207472616e7366657220746f20746865207a65726f206164647260008201527f6573730000000000000000000000000000000000000000000000000000000000602082015250565b600061160a602383610ea4565b9150611615826115ae565b604082019050919050565b60006020820190508181036000830152611639816115fd565b9050919050565b7f45524332303a207472616e7366657220616d6f756e742065786365656473206260008201527f616c616e63650000000000000000000000000000000000000000000000000000602082015250565b600061169c602683610ea4565b91506116a782611640565b604082019050919050565b600060208201905081810360008301526116cb8161168f565b9050919050565b7f4f776e61626c653a2063616c6c6572206973206e6f7420746865206f776e6572600082015250565b6000611708602083610ea4565b9150611713826116d2565b602082019050919050565b60006020820190508181036000830152611737816116fb565b9050919050565b7f45524332303a206d696e7420746f20746865207a65726f206164647265737300600082015250565b6000611774601f83610ea4565b915061177f8261173e565b602082019050919050565b600060208201905081810360008301526117a381611767565b905091905056fea2646970667358221220a107c160b23be3efaeab483e4188e7d9bb86152ba40cba404ba196269d8933dc64736f6c63430008120033";

type Erc20ConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: Erc20ConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Erc20__factory extends ContractFactory {
  constructor(...args: Erc20ConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _totalSupply: PromiseOrValue<BigNumberish>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Erc20> {
    return super.deploy(
      _totalSupply,
      _name,
      _symbol,
      overrides || {}
    ) as Promise<Erc20>;
  }
  override getDeployTransaction(
    _totalSupply: PromiseOrValue<BigNumberish>,
    _name: PromiseOrValue<string>,
    _symbol: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(
      _totalSupply,
      _name,
      _symbol,
      overrides || {}
    );
  }
  override attach(address: string): Erc20 {
    return super.attach(address) as Erc20;
  }
  override connect(signer: Signer): Erc20__factory {
    return super.connect(signer) as Erc20__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): Erc20Interface {
    return new utils.Interface(_abi) as Erc20Interface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Erc20 {
    return new Contract(address, _abi, signerOrProvider) as Erc20;
  }
}
