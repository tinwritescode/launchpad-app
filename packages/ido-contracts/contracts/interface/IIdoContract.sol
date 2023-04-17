// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

interface IIDOContract {
    function depositTokens(address from, uint256 amount) external;
}