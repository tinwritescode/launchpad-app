import { StandardMerkleTree } from "@openzeppelin/merkle-tree";

export class WhitelistData {
  address: string;
  amount: string;
  static abiEncoding = ["address", "uint256"];

  constructor(address: string, amount: string) {
    this.address = address;
    this.amount = amount;
  }

  toArray(): any[] {
    return [this.address, this.amount];
  }

  static fromArray(arr: any[]): WhitelistData {
    return new WhitelistData(arr[0], arr[1]);
  }
}

export class WhitelistMerkleTree {
  private tree: StandardMerkleTree<any[]>;

  constructor(values?: WhitelistData[], parsedJSON?: any) {
    if (values) {
      this.tree = StandardMerkleTree.of(
        values.map((value) => value.toArray()),
        WhitelistData.abiEncoding
      );
    } else {
      this.tree = StandardMerkleTree.load(parsedJSON);
    }
  }

  static fromJSON(data: string): WhitelistMerkleTree {
    return new WhitelistMerkleTree(undefined, JSON.parse(data));
  }

  toJSON(): string {
    return JSON.stringify(this.tree.dump());
  }

  getWhitelistData(address: string): WhitelistData | null {
    for (const [index, values] of this.tree.entries()) {
      if (values[0] === address) {
        return WhitelistData.fromArray(values);
      }
    }
    return null;
  }
}
