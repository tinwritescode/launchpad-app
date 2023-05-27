import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Link from "next/link";


const CompletedTwo = () => {
   return (
      <div>
         {/* ==========>> Completed Project Section start Here <<==========  */}
         <section className="project padding-top padding-bottom bg--primary-color">
            <div className="container">
               <div className="section-header section-header--left">
                  <div className="section-header__content">
                     <div className="section-header__titlebar">
                        <p className="section-header__subtitle"> Completed</p>
                        <h2 className="section__header__title">Previous Projects</h2>
                     </div>
                     <Link href="#" className="default-btn default-btn--small">View Rank</Link>
                  </div>
               </div>
               <div className="project__wrapper">
                  <div className="row g-4">
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/01.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/binance.png"
                                    alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/5.png"
                                          alt="author image" /></Link>
                                       <h4>Dexer Xone</h4>
                                    </div>

                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">5000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "25%" }}
                                             aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>

                                    </div>
                                 </div>
                                 <div className="project__item-bottom">
                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/02.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/eth.png" alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/1.png"
                                          alt="author image" /></Link>
                                       <h4>Cyber Car</h4>
                                    </div>
                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">5000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "55%" }}
                                             aria-valuenow="55" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="project__item-bottom">
                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/03.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/solana.png"
                                    alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/2.png"
                                          alt="author image" /></Link>
                                       <h4>Future Ray</h4>
                                    </div>
                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">12000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "75%" }}
                                             aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="project__item-bottom">
                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/04.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/aval.png" alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/3.png"
                                          alt="author image" /></Link>
                                       <h4>Monster Paw</h4>
                                    </div>
                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">5000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "25%" }}
                                             aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="project__item-bottom">

                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/05.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/solana.png"
                                    alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/6.png"
                                          alt="author image" /></Link>
                                       <h4>Doccer city</h4>
                                    </div>
                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">14000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "95%" }}
                                             aria-valuenow="95" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="project__item-bottom">
                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="col-lg-4 col-md-6">
                        <div className="project__item project__item--completed1">
                           <div className="project__item-inner">
                              <div className="project__item-thumb">
                                 <img width="auto" src="/images/igo/item/06.jpg" alt="IGO cover" />
                                 <span className="badge"><img width="auto" src="/images/chain/binance.png"
                                    alt="chain logo" /></span>
                              </div>
                              <div className="project__item-content">
                                 <div className="project__item-top">
                                    <div className="project__item-author">
                                       <Link href="#"><img width="auto" src="/images/igo/author/5.png"
                                          alt="author image" /></Link>
                                       <h4>Space Rock</h4>
                                    </div>
                                 </div>
                                 <div className="project__item-middle">
                                    <div className="project__item-amount">
                                       <p>Raised Ammount</p>
                                       <h6><span className="color--theme-color">5000</span> / <span>15000
                                          BUSD</span>
                                       </h6>
                                       <div className="progress">
                                          <div className="progress-bar" role="progressbar" style={{ width: "35%" }}
                                             aria-valuenow="35" aria-valuemin="0" aria-valuemax="100"></div>
                                       </div>
                                    </div>
                                 </div>
                                 <div className="project__item-bottom">
                                    <Link href="project-details.html" className="default-btn default-btn--small">View
                                       Details</Link>
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
                  {/* <ul className="pagination mt-5 justify-content-center">
                     <li className="page-item disabled">
                        <span className="page-link"><i className="fa-solid fa-angle-left"></i></span>
                     </li>
                     <li className="page-item active" aria-current="page"><Link className="page-link" href="#">1</Link></li>
                     <li className="page-item">
                        <span className="page-link">2</span>
                     </li>
                     <li className="page-item"><Link className="page-link" href="#">3</Link></li>
                     <li className="page-item">
                        <Link className="page-link" href="#"><i className="fa-solid fa-angle-right"></i></Link>
                     </li>
                  </ul> */}
               </div>
            </div>
         </section>
         {/* ==========>> Completed Project Section Ends Here <<==========  */}
      </div>
   );
};

export default CompletedTwo;