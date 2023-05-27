import Simple from '../../../components/base/Simple';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const UpcomingTwo = () => {
  return (
    <div>
      {/* ==========>> Upcomiing Project Section start Here <<========== */}
      <section className="project padding-top padding-bottom">
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <Simple subTitle="Projects" title="Upcoming IDOs" />
              </div>
            </div>
          </div>
          <div className="project__wrapper">
            <div className="row g-4">
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/01.jpg"
                        width={500}
                        height={500}
                        alt="IGO cover"
                      />

                      <span className="badge">
                        <Image
                          src="/images/chain/solana.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/1.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>Tork DEX</h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/02.jpg"
                        width={500}
                        height={500}
                        alt="IGO cover"
                      />
                      <span className="badge">
                        <Image
                          src="/images/chain/binance.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/2.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>DeFi Sol</h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                              style={{ width: '55%' }}
                              aria-valuenow={55}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/03.jpg"
                        width={500}
                        height={500}
                        alt="IGO cover"
                      />
                      <span className="badge">
                        <Image
                          src="/images/chain/aval.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/3.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>Deep Learning </h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                              style={{ width: '45%' }}
                              aria-valuenow={45}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/04.jpg"
                        width={500}
                        height={500}
                        alt="IGO cover"
                      />
                      <span className="badge">
                        <Image
                          src="/images/chain/aval.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/4.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>roBo tZ</h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                              style={{ width: '29%' }}
                              aria-valuenow={29}
                              aria-valuemin={0}
                              aria-valuemax={100}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/05.jpg"
                        width={500}
                        height={500}
                        alt="IGO cover"
                      />
                      <span className="badge">
                        <Image
                          src="/images/chain/solana.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/6.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>DocR Chain</h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-sm-6">
                <div className="project__item">
                  <div className="project__item-inner">
                    <div className="project__item-thumb">
                      <Image
                        src="/images/igo/item/06.jpg"
                        height={500}
                        width={500}
                        alt="IGO cover"
                      />
                      <span className="badge">
                        <Image
                          src="/images/chain/binance.png"
                          width={35}
                          height={35}
                          alt="chain logo"
                        />
                      </span>
                    </div>
                    <div className="project__item-content">
                      <div className="project__item-top">
                        <div className="project__item-author">
                          <Link href="#">
                            <Image
                              src="/images/igo/author/5.png"
                              width={80}
                              height={80}
                              alt="author image"
                            />
                          </Link>
                          <h4>SpeeDEX</h4>
                        </div>
                      </div>
                      <div className="project__item-middle">
                        <ul className="project__infolist">
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Round Name:
                            </p>
                            <p className="project__infolist-data">Public</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Participent
                            </p>
                            <p className="project__infolist-data">42</p>
                          </li>
                          <li className="project__infolist-item">
                            <p className="project__infolist-name">
                              Project Start
                            </p>
                            <p className="project__infolist-data">TBA</p>
                          </li>
                        </ul>
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
                      <div className="project__item-bottom">
                        <Link
                          href="/projectdetails"
                          className="default-btn default-btn--small"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ==========>> Upcomiing Project Section Ends Here <<========== */}
    </div>
  );
};

export default UpcomingTwo;
