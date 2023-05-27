import React from 'react';
import Simple from '../../../components/base/Simple';
import Link from 'next/link';

function Upcoming({ data }) {
  return (
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
            {data.map((item) => {
              return (
                <div key={item.id} className="col-lg-4 col-sm-6">
                  <div className="project__item">
                    <div className="project__item-inner">
                      <div className="project__item-thumb">
                        <img width="auto" src={item.img1Src} alt="IGO cover" />
                        <span className="badge">
                          <img
                            width="auto"
                            src={item.img2Src}
                            alt="chain logo"
                          />
                        </span>
                      </div>
                      <div className="project__item-content">
                        <div className="project__item-top">
                          <div className="project__item-author">
                            <Link href="#">
                              <img
                                width="auto"
                                src={item.img3Src}
                                alt="author image"
                              />
                            </Link>
                            <h4>{item.title}</h4>
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
              );
            })}
          </div>
          <div className="text-center mt-5">
            <Link href="/project" className="default-btn">
              <span>View More</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Upcoming;
