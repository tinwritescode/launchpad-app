import React, { useState } from 'react';
import Simple from '../../../components/base/Simple';
import Accordion from 'react-bootstrap/Accordion';
import { useRouter } from 'next/router';

function FAQ() {
  const [faqtab, setFaqtab] = useState(1);

  const route = useRouter();

  const handelFaq = (id) => {
    setFaqtab(id);
  };
  return (
    <section className="faq padding-bottom shape-1r" id="faq">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="FAQ" title="Common Queries" />
            </div>
          </div>
        </div>
        <div
          className="faq__wrapper"
          data-aos="fade-up"
          data-aos-duration={1000}
        >
          <ul
            className="faq__tab nav nav-pills mb-5"
            id="pills-tab"
            role="tablist"
          >
            <li className="nav-item" role="presentation">
              <button
                onClick={() => handelFaq(1)}
                className={faqtab === 1 ? 'nav-link active' : 'nav-link'}
                id="pills-general-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-general"
                type="button"
                role="tab"
                aria-controls="pills-general"
                aria-selected="true"
              >
                General Questions
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                onClick={() => handelFaq(2)}
                className={faqtab === 2 ? 'nav-link active' : 'nav-link'}
                id="pills-token-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-token"
                type="button"
                role="tab"
                aria-controls="pills-token"
                aria-selected="false"
              >
                Token Sales
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                onClick={() => handelFaq(3)}
                className={faqtab === 3 ? 'nav-link active' : 'nav-link'}
                id="pills-investor-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-investor"
                type="button"
                role="tab"
                aria-controls="pills-investor"
                aria-selected="false"
              >
                Investor Guides
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                onClick={() => handelFaq(4)}
                className={faqtab === 4 ? 'nav-link active' : 'nav-link'}
                id="pills-security-tab"
                data-bs-toggle="pill"
                data-bs-target="#pills-security"
                type="button"
                role="tab"
                aria-controls="pills-security"
                aria-selected="false"
              >
                Security
              </button>
            </li>
          </ul>
          <div className="tab-content faq__content" id="pills-tabContent">
            <div
              className={
                faqtab === 1 ? 'tab-pane fade show active' : 'tab-pane fade'
              }
              id="pills-general"
              role="tabpanel"
              aria-labelledby="pills-general-tab"
            >
              <div className="row gy-3 gx-5">
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        What is IDO Launching?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        How can I launch an IDO in Torkgo
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Initial IDO Launching Platforms
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How do I participate inIDOs?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What are the steps of anIDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Can I unstake after eachIDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div
              className={
                faqtab === 2 ? 'tab-pane fade show active' : 'tab-pane fade'
              }
              id="pills-token"
              role="tabpanel"
              aria-labelledby="pills-token-tab"
            >
              <div className="row gy-3 gx-5">
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Do I have to register for each IDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What can I fund my allocation with?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Want to launch your project?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        Can I stake after eachIDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What is the payment method of Torkgo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Is cryptocurrency used for illegal activities?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div
              className={
                faqtab === 3 ? 'tab-pane fade show active' : 'tab-pane fade'
              }
              id="pills-investor"
              role="tabpanel"
              aria-labelledby="pills-investor-tab"
            >
              <div className="row gy-3 gx-5">
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How do I participate in IDOs?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        What are the steps of anIDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        who can participate inIDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How to Find IDO Token?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Do I have to register for each IDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        How to start trading in Metaverse?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
            <div
              className={
                faqtab === 4 ? 'tab-pane fade show active' : 'tab-pane fade'
              }
              id="pills-security"
              role="tabpanel"
              aria-labelledby="pills-security-tab"
            >
              <div className="row gy-3 gx-5">
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="1">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        How can I Launch my IDO?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Who is allowed in Torkgo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        What is the Benifits in Torkgo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
                <div className="col-lg-6">
                  <Accordion defaultActiveKey="2">
                    <Accordion.Item eventKey="0">
                      <Accordion.Header>
                        {' '}
                        How can I Make Money viaIDO
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1">
                      <Accordion.Header>
                        Is it secure to launch game in Torkgo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2">
                      <Accordion.Header>
                        Which Blockchain is used in Torkgo?
                      </Accordion.Header>
                      <Accordion.Body>
                        Fundamentally seller sells their currency to gain cash
                        and a buyer buys expecting hold the currency until value
                        increases in dollar/rupee terms In mid-August 202 total
                        market value of all cryptocurrency exceeded $2 trillion,
                        with Bitcoin alone making up 44% of that.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    // <section className="faq padding-bottom shape-1r" id="faq">
    //   <div className="container">
    //     <div className="section-header section-header--middle">
    //       <div className="section-header__content">
    //         <div className="section-header__titlebar">
    //           <Simple subTitle="FAQ" title="Common Queries" />
    //         </div>
    //       </div>
    //     </div>
    //     <div
    //       className="faq__wrapper aos-init aos-animate"
    //       data-aos="fade-up"
    //       data-aos-duration={1000}
    //     >
    //       <ul
    //         className="faq__tab nav nav-pills mb-5"
    //         id="pills-tab"
    //         role="tablist"
    //       >
    //         <li className="nav-item" role="presentation">
    //           <button
    //             className="nav-link active"
    //             id="pills-general-tab"
    //             data-bs-toggle="pill"
    //             data-bs-target="#pills-general"
    //             type="button"
    //             role="tab"
    //             aria-controls="pills-general"
    //             aria-selected="true"
    //             tabIndex="-1"
    //           >
    //             General Questions
    //           </button>
    //         </li>
    //         <li className="nav-item" role="presentation">
    //           <button
    //             className="nav-link"
    //             id="pills-token-tab"
    //             data-bs-toggle="pill"
    //             data-bs-target="#pills-token"
    //             type="button"
    //             role="tab"
    //             aria-controls="pills-token"
    //             aria-selected="false"
    //             tabIndex="-1"
    //           >
    //             Token Sales
    //           </button>
    //         </li>
    //         <li className="nav-item" role="presentation">
    //           <button
    //             className="nav-link"
    //             id="pills-investor-tab"
    //             data-bs-toggle="pill"
    //             data-bs-target="#pills-investor"
    //             type="button"
    //             role="tab"
    //             aria-controls="pills-investor"
    //             aria-selected="false"
    //             tabIndex="-1"
    //           >
    //             Investor Guides
    //           </button>
    //         </li>
    //         <li className="nav-item" role="presentation">
    //           <button
    //             className="nav-link"
    //             id="pills-security-tab"
    //             data-bs-toggle="pill"
    //             data-bs-target="#pills-security"
    //             type="button"
    //             role="tab"
    //             aria-controls="pills-security"
    //             aria-selected="false"
    //             tabIndex="-1"
    //           >
    //             Security
    //           </button>
    //         </li>
    //       </ul>
    //       <div className="tab-content faq__content" id="pills-tabContent">
    //         <div
    //           className="tab-pane fade show active"
    //           id="pills-general"
    //           role="tabpanel"
    //           aria-labelledby="pills-general-tab"
    //         >
    //           <div className="row gy-3 gx-5">
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionGeneral1"
    //               >
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="general1-headingOne">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general1-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="general1-collapseOne"
    //                     >
    //                       What is IDO Launching?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general1-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="general1-headingOne"
    //                     data-bs-parent="#accordionGeneral1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="general-headingTwo">
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="general-collapseTwo"
    //                     >
    //                       How can I launch an IDO in Torkgo
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general-collapseTwo"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="general-headingTwo"
    //                     data-bs-parent="#accordionGeneral1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="general-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="general-collapseThree"
    //                     >
    //                       Initial IDO Launching Platforms
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general-collapseThree"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="general-headingThree"
    //                     data-bs-parent="#accordionGeneral1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionGeneral2"
    //               >
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="general2-headingOne">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general2-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="general2-collapseOne"
    //                     >
    //                       How do I participate inIDOs?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general2-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="general2-headingOne"
    //                     data-bs-parent="#accordionGeneral2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="general2-headingTwo">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general2-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="general2-collapseTwo"
    //                     >
    //                       What are the steps of anIDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general2-collapseTwo"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="general2-headingTwo"
    //                     data-bs-parent="#accordionGeneral2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="general2-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#general2-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="general2-collapseThree"
    //                     >
    //                       Can I unstake after eachIDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="general2-collapseThree"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="general2-headingThree"
    //                     data-bs-parent="#accordionGeneral2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className="tab-pane fade"
    //           id="pills-token"
    //           role="tabpanel"
    //           aria-labelledby="pills-token-tab"
    //         >
    //           <div className="row gy-3 gx-5">
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionToken1"
    //               >
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token1-headingOne">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token1-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="token1-collapseOne"
    //                     >
    //                       Do I have to register for each IDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token1-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="token1-headingOne"
    //                     data-bs-parent="#accordionToken1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token-headingTwo">
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="token-collapseTwo"
    //                     >
    //                       What can I fund my allocation with?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token-collapseTwo"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="token-headingTwo"
    //                     data-bs-parent="#accordionToken1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token-headingThree">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="token-collapseThree"
    //                     >
    //                       Want to launch your project?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token-collapseThree"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="token-headingThree"
    //                     data-bs-parent="#accordionToken1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionToken2"
    //               >
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token2-headingOne">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token2-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="token2-collapseOne"
    //                     >
    //                       Can I stake after eachIDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token2-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="token2-headingOne"
    //                     data-bs-parent="#accordionToken2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token2-headingTwo">
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token2-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="token2-collapseTwo"
    //                     >
    //                       What is the payment method of Torkgo?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token2-collapseTwo"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="token2-headingTwo"
    //                     data-bs-parent="#accordionToken2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="token2-headingThree">
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#token2-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="token2-collapseThree"
    //                     >
    //                       Is cryptocurrency used for illegal activities?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="token2-collapseThree"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="token2-headingThree"
    //                     data-bs-parent="#accordionToken2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className="tab-pane fade"
    //           id="pills-investor"
    //           role="tabpanel"
    //           aria-labelledby="pills-investor-tab"
    //         >
    //           <div className="row gy-3 gx-5">
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionInvestor1"
    //               >
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="investor1-headingOne"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor1-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="investor1-collapseOne"
    //                     >
    //                       How do I participate in IDOs?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor1-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="investor1-headingOne"
    //                     data-bs-parent="#accordionInvestor1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="investor-headingTwo">
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="investor-collapseTwo"
    //                     >
    //                       What are the steps of anIDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor-collapseTwo"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="investor-headingTwo"
    //                     data-bs-parent="#accordionInvestor1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="investor-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="investor-collapseThree"
    //                     >
    //                       who can participate inIDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor-collapseThree"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="investor-headingThree"
    //                     data-bs-parent="#accordionInvestor1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionInvestor2"
    //               >
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="investor2-headingOne"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor2-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="investor2-collapseOne"
    //                     >
    //                       How to Find IDO Token?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor2-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="investor2-headingOne"
    //                     data-bs-parent="#accordionInvestor2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="investor2-headingTwo"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor2-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="investor2-collapseTwo"
    //                     >
    //                       Do I have to register for each IDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor2-collapseTwo"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="investor2-headingTwo"
    //                     data-bs-parent="#accordionInvestor2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="investor2-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#investor2-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="investor2-collapseThree"
    //                     >
    //                       How to start trading in Metaverse?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="investor2-collapseThree"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="investor2-headingThree"
    //                     data-bs-parent="#accordionInvestor2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //         <div
    //           className="tab-pane fade"
    //           id="pills-security"
    //           role="tabpanel"
    //           aria-labelledby="pills-security-tab"
    //         >
    //           <div className="row gy-3 gx-5">
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionSecurity1"
    //               >
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="security1-headingOne"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security1-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="security1-collapseOne"
    //                     >
    //                       How can I Launch my IDO?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security1-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="security1-headingOne"
    //                     data-bs-parent="#accordionSecurity1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6 className="accordion-header" id="security-headingTwo">
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="security-collapseTwo"
    //                     >
    //                       Who is allowed in Torkgo?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security-collapseTwo"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="security-headingTwo"
    //                     data-bs-parent="#accordionSecurity1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="security-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="security-collapseThree"
    //                     >
    //                       What is the Benifits in Torkgo?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security-collapseThree"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="security-headingThree"
    //                     data-bs-parent="#accordionSecurity1"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //             <div className="col-lg-6">
    //               <div
    //                 className="accordion accordion-flush"
    //                 id="accordionSecurity2"
    //               >
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="security2-headingOne"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security2-collapseOne"
    //                       aria-expanded="false"
    //                       aria-controls="security2-collapseOne"
    //                     >
    //                       How can I Make Money viaIDO
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security2-collapseOne"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="security2-headingOne"
    //                     data-bs-parent="#accordionSecurity2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="security2-headingTwo"
    //                   >
    //                     <button
    //                       className="accordion-button collapsed"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security2-collapseTwo"
    //                       aria-expanded="false"
    //                       aria-controls="security2-collapseTwo"
    //                     >
    //                       Is it secure to launch game in Torkgo?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security2-collapseTwo"
    //                     className="accordion-collapse collapse"
    //                     aria-labelledby="security2-headingTwo"
    //                     data-bs-parent="#accordionSecurity2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //                 <div className="accordion-item">
    //                   <h6
    //                     className="accordion-header"
    //                     id="security2-headingThree"
    //                   >
    //                     <button
    //                       className="accordion-button"
    //                       type="button"
    //                       data-bs-toggle="collapse"
    //                       data-bs-target="#security2-collapseThree"
    //                       aria-expanded="false"
    //                       aria-controls="security2-collapseThree"
    //                     >
    //                       Which Blockchain is used in Torkgo?
    //                     </button>
    //                   </h6>
    //                   <div
    //                     id="security2-collapseThree"
    //                     className="accordion-collapse collapse show"
    //                     aria-labelledby="security2-headingThree"
    //                     data-bs-parent="#accordionSecurity2"
    //                   >
    //                     <div className="accordion-body">
    //                       Fundamentally seller sells their currency to gain cash
    //                       and a buyer buys expecting hold the currency until
    //                       value increases in dollar/rupee terms In mid-August
    //                       202 total market value of all cryptocurrency exceeded
    //                       $2 trillion, with Bitcoin alone making up 44% of that.
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </section>
  );
}

export default FAQ;
