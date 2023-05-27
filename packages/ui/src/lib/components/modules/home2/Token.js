import SalesChart from '../../../components/partials/SalesChart';
import { useRouter } from 'next/router';
import React from 'react';

function Token({ tokenomics }) {
  const route = useRouter();
  return (
    <section className="token padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--left">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <p className="section-header__subtitle"> Statistics</p>
              <h2 className="section__header__title">Tokenomics</h2>
            </div>
          </div>
        </div>
        <div className="token__wrapper">
          <div className="row g-5">
            <div className="col-lg-6">
              <div className="token__info">
                <ul className="token__info-list">
                  <li key={tokenomics.key} className="token__info-list-item">
                    <p className="token__info-list-name">Total Supply</p>
                    <p className="token__info-list-value">
                      {tokenomics.totalSupply}
                    </p>
                  </li>

                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Public sale</p>
                    <p className="token__info-list-value">
                      ${tokenomics.publicSale}
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Farming Pool</p>
                    <p className="token__info-list-value">
                      {tokenomics.farmingPool}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Staking</p>
                    <p className="token__info-list-value">
                      {tokenomics.staking}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Ecosystem</p>
                    <p className="token__info-list-value">
                      {tokenomics.ecosystem}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Advisor</p>
                    <p className="token__info-list-value">
                      {tokenomics.advisor}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Private Sale</p>
                    <p className="token__info-list-value">
                      {tokenomics.privateSale}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Liquidity</p>
                    <p className="token__info-list-value">
                      {tokenomics.liquidity}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Marketing</p>
                    <p className="token__info-list-value">
                      {tokenomics.marketing}%
                    </p>
                  </li>
                  <li className="token__info-list-item">
                    <p className="token__info-list-name">Team</p>
                    <p className="token__info-list-value">{tokenomics.team}%</p>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <SalesChart />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Token;
