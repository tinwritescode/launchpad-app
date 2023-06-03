import { ApplyToLaunch } from '@strawberry/ui';
import { PageHeader } from '@strawberry/ui';
import CountUp from 'react-countup';
import { useState } from 'react';

const Stacking = () => {
  const [tab, setTab] = useState(1);

  const handelStaking = (id) => {
    setTab(id);
  };

  return (
    <>
      <PageHeader title="Stacking" text="stacking" />
      {/* ================> stacking start here <================== */}
      <div className="stacking padding-top padding-bottom">
        <div className="container">
          <div className="stacking__wrapper">
            <div className="stacking__project">
              <div className="row g-4">
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        ${' '}
                        <span
                          className="purecounter"
                          data-purecounter-start={639499}
                          data-purecounter-end={63939379}
                        >
                          <CountUp end={63939379} duration={5} />
                        </span>{' '}
                      </h3>
                      <p>Total Value Locked</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        <span
                          className="purecounter"
                          data-purecounter-start={0}
                          data-purecounter-end="136.99"
                        >
                          <CountUp end={136} duration={5} />
                        </span>
                        .99 %
                      </h3>
                      <p>Apy</p>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="stacking__project-item">
                    <div className="stacking__project-itemInner">
                      <h3>
                        <span
                          className="purecounter"
                          data-purecounter-start={0}
                          data-purecounter-end={69899}
                        >
                          <CountUp end={69899} duration={5} />
                        </span>{' '}
                      </h3>
                      <p>Number of Stakers</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="stacking__details">
              <div className="stacking__title">
                <h3>Participate IDO Stack</h3>
              </div>
              <div className="stacking__content">
                <div className="row align-items-center g-5">
                  <div className="col-lg-7">
                    <div className="stacking__ammount">
                      <p>Total Stake</p>
                      <h4>350.70 BUSD</h4>
                    </div>
                    {/* <div className="stacking__period">
                      <ul
                        className="stacking__period-list nav nav-pills"
                        id="stackingPeriod"
                        role="tablist"
                      >
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => handelStaking(1)}
                            className={
                              tab === 1 ? 'nav-link active' : 'nav-link'
                            }
                            id="period-tab1"
                            data-bs-toggle="tab"
                            data-bs-target="#period-tab1-pane"
                            type="button"
                            role="tab"
                            aria-controls="period-tab1-pane"
                            aria-selected="true"
                          >
                            7 Days
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => handelStaking(2)}
                            className={
                              tab === 2 ? 'nav-link active' : 'nav-link'
                            }
                            id="period-tab2"
                            data-bs-toggle="tab"
                            data-bs-target="#period-tab2-pane"
                            type="button"
                            role="tab"
                            aria-controls="period-tab2-pane"
                            aria-selected="false"
                          >
                            14 Days
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => handelStaking(3)}
                            className={
                              tab === 3 ? 'nav-link active' : 'nav-link'
                            }
                            id="period-tab3"
                            data-bs-toggle="tab"
                            data-bs-target="#period-tab3-pane"
                            type="button"
                            role="tab"
                            aria-controls="period-tab3-pane"
                            aria-selected="false"
                          >
                            30 Days
                          </button>
                        </li>
                        <li className="nav-item" role="presentation">
                          <button
                            onClick={() => handelStaking(4)}
                            className={
                              tab === 4 ? 'nav-link active' : 'nav-link'
                            }
                            id="period-tab4"
                            data-bs-toggle="tab"
                            data-bs-target="#period-tab4-pane"
                            type="button"
                            role="tab"
                            aria-controls="period-tab4-pane"
                            aria-selected="false"
                          >
                            60 Days
                          </button>
                        </li>
                      </ul>
                      <div className="tab-content" id="myTabContent">
                        <div
                          className={
                            tab === 1
                              ? 'tab-pane fade show active'
                              : 'tab-pane fade'
                          }
                          id="period-tab1-pane"
                          role="tabpanel"
                          aria-labelledby="period-tab1"
                          tabIndex={0}
                        >
                          <div className="stacking__info">
                            <div className="row align-items-center g-5">
                              <div className="col-sm-8">
                                <ul className="stacking__info-list">
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Lock Period:
                                      <span className="stacking__info-value">
                                        7 Days
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Re-locks on registration:
                                      <span className="stacking__info-value">
                                        Yes
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Early unstake fee:
                                      <span className="stacking__info-value">
                                        23%
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Status:
                                      <span className="stacking__info-value">
                                        Unlocked
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-4">
                                <div className="stacking__apy">
                                  <p>APY Rate </p>
                                  <h3>10%</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            tab === 2
                              ? 'tab-pane fade show active'
                              : 'tab-pane fade'
                          }
                          id="period-tab2-pane"
                          role="tabpanel"
                          aria-labelledby="period-tab2"
                          tabIndex={0}
                        >
                          <div className="stacking__info">
                            <div className="row align-items-center g-5">
                              <div className="col-sm-8">
                                <ul className="stacking__info-list">
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Lock Period:
                                      <span className="stacking__info-value">
                                        14 Days
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Re-locks on registration:
                                      <span className="stacking__info-value">
                                        Yes
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Early unstake fee:
                                      <span className="stacking__info-value">
                                        23%
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Status:
                                      <span className="stacking__info-value">
                                        Unlocked
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-4">
                                <div className="stacking__apy">
                                  <p>APY Rate </p>
                                  <h3>20%</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            tab === 3
                              ? 'tab-pane fade show active'
                              : 'tab-pane fade'
                          }
                          id="period-tab3-pane"
                          role="tabpanel"
                          aria-labelledby="period-tab3"
                          tabIndex={0}
                        >
                          <div className="stacking__info">
                            <div className="row align-items-center g-5">
                              <div className="col-sm-8">
                                <ul className="stacking__info-list">
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Lock Period:
                                      <span className="stacking__info-value">
                                        30 Days
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Re-locks on registration:
                                      <span className="stacking__info-value">
                                        Yes
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Early unstake fee:
                                      <span className="stacking__info-value">
                                        23%
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Status:
                                      <span className="stacking__info-value">
                                        Unlocked
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-4">
                                <div className="stacking__apy">
                                  <p>APY Rate </p>
                                  <h3>30%</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div
                          className={
                            tab === 4
                              ? 'tab-pane fade show active'
                              : 'tab-pane fade'
                          }
                          id="period-tab4-pane"
                          role="tabpanel"
                          aria-labelledby="period-tab4"
                          tabIndex={0}
                        >
                          <div className="stacking__info">
                            <div className="row align-items-center g-5">
                              <div className="col-sm-8">
                                <ul className="stacking__info-list">
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Lock Period:
                                      <span className="stacking__info-value">
                                        60 Days
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Re-locks on registration:
                                      <span className="stacking__info-value">
                                        Yes
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Early unstake fee:
                                      <span className="stacking__info-value">
                                        23%
                                      </span>
                                    </p>
                                  </li>
                                  <li className="stacking__info-item">
                                    <p className="stacking__info-name">
                                      Status:
                                      <span className="stacking__info-value">
                                        Unlocked
                                      </span>
                                    </p>
                                  </li>
                                </ul>
                              </div>
                              <div className="col-sm-4">
                                <div className="stacking__apy">
                                  <p>APY Rate </p>
                                  <h3>45%</h3>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div> */}

                    <div className="stacking__info">
                      <div className="row align-items-center g-5">
                        <div className="col-sm-8">
                          <ul className="stacking__info-list">
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Lock Period:
                                <span className="stacking__info-value">
                                  30 Days
                                </span>
                              </p>
                            </li>
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Re-locks on registration:
                                <span className="stacking__info-value">
                                  Yes
                                </span>
                              </p>
                            </li>
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Early unstake fee:
                                <span className="stacking__info-value">
                                  23%
                                </span>
                              </p>
                            </li>
                            <li className="stacking__info-item">
                              <p className="stacking__info-name">
                                Status:
                                <span className="stacking__info-value">
                                  Unlocked
                                </span>
                              </p>
                            </li>
                          </ul>
                        </div>
                        <div className="col-sm-4">
                          <div className="stacking__apy">
                            <p>APY Rate </p>
                            <h3>30%</h3>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5 col-md-8">
                    <div className="stacking__approve">
                      <div className="stacking__approve-field mb-5">
                        <label htmlFor="approve-stack" className="form-label">
                          Balance: <span>3529.00 BUSD</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Approve Stack"
                            id="approve-stack"
                            step="0.01"
                            placeholder="0.00"
                          />
                          <span className="input-group-text">Max</span>
                          <button className="input-group-btn withdraw-btn min-w-[144px]">
                            Approve
                          </button>
                        </div>
                      </div>
                      <div className="stacking__approve-withdraw mb-5">
                        <label htmlFor="withdraw-stack" className="form-label">
                          Staked: <span>350.70 BUSD</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Withdraw Stack"
                            id="withdraw-stack"
                            placeholder="0.00"
                          />
                          <span className="input-group-text">Max</span>
                          <button className="input-group-btn withdraw-btn min-w-[144px]">
                            Withdraw
                          </button>
                        </div>
                      </div>
                      <div className="stacking__approve-field">
                        <label htmlFor="approve-stack" className="form-label">
                          Unclaimed Rewards: <span>3529.00 BUSD</span>
                        </label>
                        <div className="input-group">
                          <input
                            type="text"
                            className="form-control"
                            aria-label="Approve Stack"
                            id="approve-stack"
                            step="0.01"
                            placeholder="0.00"
                          />
                          <span className="input-group-text">Max</span>
                          <button className="input-group-btn withdraw-btn min-w-[144px]">
                            Claim
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="note-text">
                  <strong>Note:</strong> Lorem ipsum dolor sit, amet consectetur
                  adipisicing elit. Molestiae expedita error quod! Eaque,
                  laudantium hic.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ================> stacking end here <================== */}
      <ApplyToLaunch />
    </>
  );
};
export default Stacking;
