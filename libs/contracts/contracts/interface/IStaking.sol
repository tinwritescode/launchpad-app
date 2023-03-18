// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/extension/Staking20.sol";


interface IStaking is IStaking20 {
     function getStakersLength() external view returns (uint256);
     function getStakerAtIndex(uint256 _index) external view returns (address);
}