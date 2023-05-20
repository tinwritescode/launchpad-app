import { deployContract, getErc20Contract, waitForTx } from '../utils';
import { NonceManager } from '@ethersproject/experimental';
import { anyValue } from '@nomicfoundation/hardhat-chai-matchers/withArgs';
import { loadFixture, time } from '@nomicfoundation/hardhat-network-helpers';
import { expect } from 'chai';
import { BigNumber } from 'ethers';
import { ethers } from 'hardhat';

describe('Lock', function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployOneYearLockFixture() {
    const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
    const ONE_GWEI = 1_000_000_000;

    const lockedAmount = ONE_GWEI;

    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners().then((signers) =>
      signers.map((signer) => {
        return new NonceManager(signer);
      })
    );

    const address: Record<string, string> = {};

    const timeUnitInSecs = 60;
    const rewardRatio = {
      numerator: 1,
      denominator: 10000,
    };
    const totalSupply = BigNumber.from('1000000000');
    const lockTime = ONE_YEAR_IN_SECS;

    address['stakingToken'] = await deployContract(
      'Erc20',
      totalSupply,
      'Staking Token',
      'STK'
    );
    address['rewardToken'] = address['stakingToken'];
    address['WETH'] = await deployContract(
      'Erc20',
      totalSupply,
      'Wrapped Ether',
      'WETH'
    );

    const Staking = await ethers.getContractFactory('Staking');
    const stakingContract = await Staking.deploy(
      timeUnitInSecs,
      rewardRatio.numerator,
      rewardRatio.denominator,
      address['stakingToken'],
      address['rewardToken'],
      address['WETH'],
      lockTime
    );

    // approve
    {
      const stakingTokenContract = await (
        await ethers.getContractAt('Erc20', address['stakingToken'])
      ).deployed();

      const tx = await stakingTokenContract.approve(
        stakingContract.address,
        lockedAmount
      );

      await waitForTx(tx);
    }

    // stake
    {
      const tx = await stakingContract.connect(owner).stake(lockedAmount);
      await waitForTx(tx);
    }

    return {
      stakingContract,
      lockedAmount,
      owner,
      otherAccount,
      stakingToken: address['stakingToken'],
      rewardToken: address['rewardToken'],
      unlockTime: lockTime + (await time.latest()),
    };
  }

  describe('Deployment', function () {
    it('Should receive and store the funds to lock', async function () {
      const { stakingContract, stakingToken, lockedAmount } = await loadFixture(
        deployOneYearLockFixture
      );

      const stakingTokenContract = await getErc20Contract(stakingToken);
      const balance = await stakingTokenContract.balanceOf(
        stakingContract.address
      );

      expect(balance).to.equal(lockedAmount);
    });

    it('Should set the unlockTime to the current time plus the lockTime', async function () {
      const { stakingContract, lockedAmount, owner } = await loadFixture(
        deployOneYearLockFixture
      );

      const lockTime = await stakingContract.lockTime();
      const unlockTime = await stakingContract.lockTimeOf(owner.getAddress());

      expect(unlockTime).to.equal(lockTime.add(await time.latest()));
    });
  });

  describe('Withdrawals', function () {
    describe('Validations', function () {
      it('Should revert with the right error if called too soon', async function () {
        const { stakingContract, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await expect(stakingContract.withdraw(lockedAmount)).to.be.revertedWith(
          'Staking is locked'
        );
      });

      it('Should revert with the right error if called from another account', async function () {
        const { stakingContract, lockedAmount, otherAccount, unlockTime } =
          await loadFixture(deployOneYearLockFixture);

        // We can increase the time in Hardhat Network
        await time.increaseTo(unlockTime);

        // We use lock.connect() to send a transaction from another account
        await expect(
          stakingContract.connect(otherAccount).withdraw(lockedAmount)
        ).to.be.revertedWith('Withdrawing more than staked');
      });

      it("Shouldn't fail if the unlockTime has arrived and the owner calls it", async function () {
        const { stakingContract, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        // Transactions are sent using the first signer by default
        await time.increaseTo(unlockTime);

        await expect(stakingContract.withdraw(lockedAmount)).not.to.be.reverted;
      });
    });

    describe('Events', function () {
      it('Should emit an event on withdrawals', async function () {
        const { stakingContract, unlockTime, lockedAmount } = await loadFixture(
          deployOneYearLockFixture
        );

        await time.increaseTo(unlockTime);

        await expect(stakingContract.withdraw(lockedAmount))
          .to.emit(stakingContract, 'TokensWithdrawn')
          .withArgs(anyValue, lockedAmount); // We accept any value as `when` arg
      });
    });

    describe('Transfers', function () {
      it('Should transfer the funds to the owner', async function () {
        const {
          stakingContract,
          unlockTime,
          lockedAmount,
          owner,
          rewardToken,
        } = await loadFixture(deployOneYearLockFixture);

        await time.increaseTo(unlockTime);

        await expect(
          stakingContract.withdraw(lockedAmount)
        ).to.changeTokenBalances(
          await getErc20Contract(rewardToken),
          [owner, stakingContract],
          [lockedAmount, -lockedAmount]
        );
      });
    });
  });
});
