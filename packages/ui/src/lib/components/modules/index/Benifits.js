import Simple from '../../../components/base/Simple';
import DefaultButton from '../../../components/base/DefaultButton';

function Benefits() {
  return (
    <section className="benifit bg--primary-color padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Benefits" title="What we offer" />
            </div>
          </div>
        </div>
        <div className="benifit__wrapper">
          <div className="row g-5">
            <div className="col-lg-3 col-sm-6">
              <div className="benifit__item">
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
              <div className="benifit__item">
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
              <div className="benifit__item">
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
              <div className="benifit__item">
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

export default Benefits;
