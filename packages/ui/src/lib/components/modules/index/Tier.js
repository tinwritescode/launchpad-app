import Simple from '../../../components/base/Simple';
import DefaultButton from '../../../components/base/DefaultButton';
import Link from 'next/link';

function Tier() {
  return (
    <div className="tier padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Choose" title="Tier System" />
            </div>
          </div>
        </div>
        <div className="section__wrapper">
          <div className="row g-4 justify-content-center row-cols-xl-4 row-cols-lg-3 row-cols-sm-2 row-cols-1">
            <div className="col">
              <div className="tier__item">
                <div className="tier__inner">
                  <div className="tier__head">
                    <h4>TIER 1</h4>
                    <div className="tier__thumb">
                      <img width="auto" src="/images/tier/01.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="tier__body">
                    <h4>Basic</h4>
                    <ul>
                      <li>
                        <p className="tier__title">Staking Requirements</p>
                        <p className="tier__value">300 BUSD</p>
                      </li>
                      <li>
                        <p className="tier__title">Allocation Type</p>
                        <p className="tier__value">Lottery (100 Among all)</p>
                      </li>
                      <li>
                        <p className="tier__title">Minimam Staking</p>
                        <p className="tier__value">0 Days</p>
                      </li>
                      <li>
                        <p className="tier__title">Pool Weight</p>
                        <p className="tier__value">05</p>
                      </li>
                    </ul>
                  </div>
                  <div className="tier__footer">
                    <Link href="/login" className="default-btn reverse">
                      <span>Select Plan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="tier__item">
                <div className="tier__inner">
                  <div className="tier__head">
                    <h4>Tier 2</h4>
                    <div className="tier__thumb">
                      <img width="auto" src="/images/tier/02.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="tier__body">
                    <h4>Bronze</h4>
                    <ul>
                      <li>
                        <p className="tier__title">Staking Requirements</p>
                        <p className="tier__value">500 BUSD</p>
                      </li>
                      <li>
                        <p className="tier__title">Allocation Type</p>
                        <p className="tier__value">Lottery (50% Among all)</p>
                      </li>
                      <li>
                        <p className="tier__title">Minimam Staking</p>
                        <p className="tier__value">7 Days</p>
                      </li>
                      <li>
                        <p className="tier__title">Pool Weight</p>
                        <p className="tier__value">10</p>
                      </li>
                    </ul>
                  </div>
                  <div className="tier__footer">
                    <Link href="/login" className="default-btn">
                      <span>Select Plan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="tier__item">
                <div className="tier__inner">
                  <div className="tier__head">
                    <h4>Tier 3</h4>
                    <div className="tier__thumb">
                      <img width="auto" src="/images/tier/03.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="tier__body">
                    <h4>Gold</h4>
                    <ul>
                      <li>
                        <p className="tier__title">Staking Requirements</p>
                        <p className="tier__value">10,000 BUSD</p>
                      </li>
                      <li>
                        <p className="tier__title">Allocation Type</p>
                        <p className="tier__value">Guaranteed</p>
                      </li>
                      <li>
                        <p className="tier__title">Minimam Staking</p>
                        <p className="tier__value">30 Days</p>
                      </li>
                      <li>
                        <p className="tier__title">Pool Weight</p>
                        <p className="tier__value">15</p>
                      </li>
                    </ul>
                  </div>
                  <div className="tier__footer">
                    <Link href="/login" className="default-btn reverse">
                      <span>Select Plan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col">
              <div className="tier__item">
                <div className="tier__inner">
                  <div className="tier__head">
                    <h4>Tier 4 </h4>
                    <div className="tier__thumb">
                      <img width="auto" src="/images/tier/04.png" alt="Icon" />
                    </div>
                  </div>
                  <div className="tier__body">
                    <h4>Platinum</h4>
                    <ul>
                      <li>
                        <p className="tier__title">Staking Requirements</p>
                        <p className="tier__value">20,000 BUSD</p>
                      </li>
                      <li>
                        <p className="tier__title">Allocation Type</p>
                        <p className="tier__value">Guaranteed</p>
                      </li>
                      <li>
                        <p className="tier__title">Minimam Staking</p>
                        <p className="tier__value">60 Days</p>
                      </li>
                      <li>
                        <p className="tier__title">Pool Weight</p>
                        <p className="tier__value">25</p>
                      </li>
                    </ul>
                  </div>
                  <div className="tier__footer">
                    <Link href="/login" className="default-btn reverse">
                      <span>Select Plan</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tier;
