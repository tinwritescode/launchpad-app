// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Erc20 is ERC20 {
    constructor(
        uint256 _totalSupply,
        string memory _name,
        string memory _symbol
    ) ERC20(_name, _symbol) {
        _mint(msg.sender, _totalSupply);
    }

    function mint(address _to, uint256 _amount) public {
        _mint(_to, _amount);
    }
}
