// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./interface/IIdoContract.sol";
import "hardhat/console.sol";

// write a contract that can receive ERC20 tokens
contract Dividend is Ownable {
    constructor() Ownable() {}

    struct TransferItem {
        address to;
        uint256 amount;
    }

    event Received(address indexed from, address indexed token, uint256 amount);

    // divide the amount of tokens received by the number of addresses
    function distribute(
        address token,
        TransferItem[] memory items
    ) public onlyOwner {
        uint256 totalAmount = 0;
        for (uint256 i = 0; i < items.length; i++) {
            totalAmount += items[i].amount;
        }

        if (totalAmount > IERC20(token).balanceOf(address(this))) {
            revert("Not enough tokens");
        }

        for (uint256 i = 0; i < items.length; i++) {
            IERC20(token).approve(items[i].to, items[i].amount);
            IIDOContract(items[i].to).depositTokens(
                address(this),
                items[i].amount
            );

            emit Received(items[i].to, token, items[i].amount);
        }
    }
}
