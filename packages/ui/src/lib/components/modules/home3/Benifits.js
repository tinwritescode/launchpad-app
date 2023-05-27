import Simple from '../../../components/base/Simple';
import React from 'react';

function Benifits() {
  return (
    <section className="benifit padding-top">
      <div className="container">
        <div
          className="section-header section-header--middle aos-init"
          data-aos="fade-up"
          data-aos-duration={800}
        >
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Benifits" title="What we offer" />
            </div>
          </div>
        </div>
        <div className="benifit__wrapper">
          <div className="row g-5">
            <div className="col-lg-3 col-sm-6">
              <div
                className="benifit__item aos-init"
                data-aos="fade-up"
                data-aos-duration={800}
              >
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img
                      width="auto"
                      src="/images/benifit/01.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Cross Chain</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consec tetur adipisicing elit.
                      Provident eius eaque aspernatur amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="benifit__item aos-init"
                data-aos="fade-up"
                data-aos-duration={800}
                data-aos-delay={100}
              >
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img
                      width="auto"
                      src="/images/benifit/02.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Stack Pad</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consec tetur adipisicing elit.
                      Provident eius eaque aspernatur amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="benifit__item aos-init"
                data-aos="fade-up"
                data-aos-duration={800}
                data-aos-delay={200}
              >
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img
                      width="auto"
                      src="/images/benifit/03.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Multi Layer</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consec tetur adipisicing elit.
                      Provident eius eaque aspernatur amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div
                className="benifit__item aos-init"
                data-aos="fade-up"
                data-aos-duration={800}
                data-aos-delay={300}
              >
                <div className="benifit__item-inner">
                  <div className="benifit__item-thumb">
                    <img
                      width="auto"
                      src="/images/benifit/04.png"
                      alt="Benifit image"
                    />
                  </div>
                  <div className="benifit__item-content">
                    <h4>Elite Projects</h4>
                    <p>
                      Lorem ipsum dolor, sit amet consec tetur adipisicing elit.
                      Provident eius eaque aspernatur amet
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Benifits;
