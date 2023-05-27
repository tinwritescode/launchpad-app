import Simple from '../../../components/base/Simple';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';

const UpcomingTwo = ({ data }) => {
  return (
    <div>
      {/* Completed Project 2 Section start Here */}
      <section className="project padding-top padding-bottom project--completed2">
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <Simple subTitle="Previous" title="Completed Projects" />
              </div>
            </div>
          </div>
          <div className="project__wrapper">
            <div className="row g-4">
              <div className="col-12">
                <div
                  className="project__item2 position-relative aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="project__item2-inner">
                    {/* project name */}
                    <div className="project__item2-name">
                      <div className="project__item2-thumb">
                        <img
                          width="auto"
                          src="/images/igo/author/1.png"
                          alt="Project Image"
                        />
                      </div>
                      <div className="project__item2-content">
                        <h4>
                          <Link
                            href="/projectdetails"
                            className="stretched-link"
                          >
                            Cyber battlefield
                          </Link>
                        </h4>
                        <p>PRICE (GAC) = 0.59 BUSD</p>
                      </div>
                    </div>
                    {/* projct chain */}
                    <div className="project__item2-chain">
                      <img
                        width="auto"
                        src="/images/chain/binance.png"
                        alt="chain icon"
                      />
                    </div>
                    {/* project launching time */}
                    <div className="project__item2-time">
                      <p>2 Days Ago</p>
                    </div>
                    {/* project raised ammount */}
                    <div className="project__item-amount">
                      <p>Raised Ammount</p>
                      <h6>
                        <span className="color--theme-color">5000</span> /{' '}
                        <span>15000 BUSD</span>
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '25%' }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="project__item2 position-relative aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="project__item2-inner">
                    {/* project name */}
                    <div className="project__item2-name">
                      <div className="project__item2-thumb">
                        <img
                          width="auto"
                          src="/images/igo/author/6.png"
                          alt="Project Image"
                        />
                      </div>
                      <div className="project__item2-content">
                        <h4>
                          <Link
                            href="/projectdetails"
                            className="stretched-link"
                          >
                            Torgo IDO
                          </Link>
                        </h4>
                        <p>PRICE (TCT) = 0.59 BUSD</p>
                      </div>
                    </div>
                    {/* projct chain */}
                    <div className="project__item2-chain">
                      <img
                        width="auto"
                        src="/images/chain/solana.png"
                        alt="chain icon"
                      />
                    </div>
                    {/* project launching time */}
                    <div className="project__item2-time">
                      <p>3 Days Ago</p>
                    </div>
                    {/* project raised ammount */}
                    <div className="project__item-amount">
                      <p>Raised Ammount</p>
                      <h6>
                        <span className="color--theme-color">13600</span> /{' '}
                        <span>15000 BUSD</span>
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '90%' }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="project__item2 position-relative aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="project__item2-inner">
                    {/* project name */}
                    <div className="project__item2-name">
                      <div className="project__item2-thumb">
                        <img
                          width="auto"
                          src="/images/igo/author/3.png"
                          alt="Project Image"
                        />
                      </div>
                      <div className="project__item2-content">
                        <h4>
                          <Link
                            href="/projectdetails"
                            className="stretched-link"
                          >
                            Red Monster
                          </Link>
                        </h4>
                        <p>PRICE (MOT) = 0.39 BUSD</p>
                      </div>
                    </div>
                    {/* projct chain */}
                    <div className="project__item2-chain">
                      <img
                        width="auto"
                        src="/images/chain/eth.png"
                        alt="chain icon"
                      />
                    </div>
                    {/* project launching time */}
                    <div className="project__item2-time">
                      <p>4 Days Ago</p>
                    </div>
                    {/* project raised ammount */}
                    <div className="project__item-amount">
                      <p>Raised Ammount</p>
                      <h6>
                        <span className="color--theme-color">14000</span> /{' '}
                        <span>15000 BUSD</span>
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '90%' }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="project__item2 position-relative aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="project__item2-inner">
                    {/* project name */}
                    <div className="project__item2-name">
                      <div className="project__item2-thumb">
                        <img
                          width="auto"
                          src="/images/igo/author/4.png"
                          alt="Project Image"
                        />
                      </div>
                      <div className="project__item2-content">
                        <h4>
                          <Link
                            href="/projectdetails"
                            className="stretched-link"
                          >
                            Hulk City
                          </Link>
                        </h4>
                        <p>PRICE (HLK) = 0.34 BUSD</p>
                      </div>
                    </div>
                    {/* projct chain */}
                    <div className="project__item2-chain">
                      <img
                        width="auto"
                        src="/images/chain/aval.png"
                        alt="chain icon"
                      />
                    </div>
                    {/* project launching time */}
                    <div className="project__item2-time">
                      <p>5 Days Ago</p>
                    </div>
                    {/* project raised ammount */}
                    <div className="project__item-amount">
                      <p>Raised Ammount</p>
                      <h6>
                        <span className="color--theme-color">7500</span> /{' '}
                        <span>15000 BUSD</span>
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '50%' }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <div
                  className="project__item2 position-relative aos-init aos-animate"
                  data-aos="fade-up"
                  data-aos-duration={800}
                >
                  <div className="project__item2-inner">
                    {/* project name */}
                    <div className="project__item2-name">
                      <div className="project__item2-thumb">
                        <img
                          width="auto"
                          src="/images/igo/author/5.png"
                          alt="Project Image"
                        />
                      </div>
                      <div className="project__item2-content">
                        <h4>
                          <Link
                            href="/projectdetails"
                            className="stretched-link"
                          >
                            Servora Dex
                          </Link>
                        </h4>
                        <p>PRICE (SPC) = 0.81 BUSD</p>
                      </div>
                    </div>
                    {/* projct chain */}
                    <div className="project__item2-chain">
                      <img
                        width="auto"
                        src="/images/chain/metic.png"
                        alt="chain icon"
                      />
                    </div>
                    {/* project launching time */}
                    <div className="project__item2-time">
                      <p>1 Week Ago</p>
                    </div>
                    {/* project raised ammount */}
                    <div className="project__item-amount">
                      <p>Raised Ammount</p>
                      <h6>
                        <span className="color--theme-color">15000</span> /{' '}
                        <span>20000 BUSD</span>
                      </h6>
                      <div className="progress">
                        <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: '65%' }}
                          aria-valuenow={25}
                          aria-valuemin={0}
                          aria-valuemax={100}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <ul className="pagination mt-5 justify-content-center">
              <li className="page-item disabled">
                <span className="page-link">
                  <FontAwesomeIcon icon={faAngleLeft} />
                </span>
              </li>
              <li className="page-item active" aria-current="page">
                <Link className="page-link" href="#">
                  1
                </Link>
              </li>
              <li className="page-item">
                <span className="page-link">2</span>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  3
                </Link>
              </li>
              <li className="page-item">
                <Link className="page-link" href="#">
                  <FontAwesomeIcon icon={faAngleRight} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Completed Project 2 Section Ends Here */}
    </div>
  );
};

export default UpcomingTwo;
