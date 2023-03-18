// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@thirdweb-dev/contracts/extension/Staking20.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC20.sol";
import "@thirdweb-dev/contracts/eip/interface/IERC20Metadata.sol";
import "./interface/IStaking.sol"; 

contract Staking is IStaking, Staking20 {
    // ERC20 Reward Token address. See {_mintRewards}.
    address public rewardToken;

    /**
     *  We store the contract deployer's address only for the purposes of the example
     *  in the code comment below.
     *
     *  Doing this is not necessary to use the `Staking20` extension.
     */
    address public deployer;

    /**
     * Lock time for staking in seconds.
     */
    uint256 public lockTime;
    mapping(address => uint256) public lockTimeOf;

    constructor(
        uint256 _timeUnit,
        uint256 _rewardRatioNumerator,
        uint256 _rewardRatioDenominator,
        address _stakingToken,
        address _rewardToken,
        address _nativeTokenWrapper,
        uint256 _lockTime
    )
        Staking20(
            _nativeTokenWrapper,
            _stakingToken,
            IERC20Metadata(_stakingToken).decimals(),
            IERC20Metadata(_rewardToken).decimals()
        )
    {
        _setStakingCondition(
            _timeUnit,
            _rewardRatioNumerator,
            _rewardRatioDenominator
        );

        rewardToken = _rewardToken;
        deployer = msg.sender;
        lockTime = _lockTime;
    }

    /**
     *  @dev    Mint/Transfer ERC20 rewards to the staker. Must override.
     *
     *  @param _staker    Address for sending rewards to.
     *  @param _rewards   Amount of tokens to be given out as reward.
     *
     */
    function _mintRewards(address _staker, uint256 _rewards) internal override {
        IERC20(rewardToken).transfer(_staker, _rewards);
    }

    // Returns whether staking restrictions can be set in given execution context.
    function _canSetStakeConditions() internal view override returns (bool) {
        return msg.sender == deployer;
    }

    function getRewardTokenBalance()
        external
        view
        virtual
        override
        returns (uint256 _rewardsAvailableInContract)
    {
        _rewardsAvailableInContract = IERC20(rewardToken).balanceOf(
            address(this)
        );

        if (stakingToken == rewardToken) {
            _rewardsAvailableInContract =
                _rewardsAvailableInContract -
                stakingTokenBalance;
        }
    }

    function _claimRewards() internal override {
        require(lockTimeOf[msg.sender] < block.timestamp, "Staking is locked");

        super._claimRewards();
    }

    function _withdraw(uint256 _amount) internal override {
        require(lockTimeOf[msg.sender] < block.timestamp, "Staking is locked");

        super._withdraw(_amount);
    }

    /// @dev When staking, set new lock time.
    function _stake(uint256 _amount) internal override {
        lockTimeOf[msg.sender] = block.timestamp + lockTime;
        super._stake(_amount);
    }

    function getStakersLength() external view override returns (uint256) {
        return stakersArray.length;
    }

    function getStakerAtIndex(uint256 _index)
        external
        view
        override
        returns (address)
    {
        return stakersArray[_index];
    }
}
