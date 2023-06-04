import CountUp from 'react-countup';
import { useRouter } from 'next/router';
const Counter = () => {
  const route = useRouter();

  return (
    <div className="counter__section counter__section--uplift">
      <div className="container padding-top padding-bottom">
        <div
          className="counter__wrapper aos-init aos-animate"
          data-aos="fade-up"
          data-aos-duration={1000}
        >
          <div className="row g-5 justify-content-center align-items-center">
            <div className="col-lg-3 col-sm-6">
              <div className="counter__item">
                <h3>
                  $
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={565}
                    className="purecounter"
                  >
                    <CountUp end={565} duration={5} />
                  </span>
                  M
                </h3>
                <p>Total Ammount Raised</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter__item">
                <h3>
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={120}
                    className="purecounter"
                  >
                    <CountUp end={120} duration={5} />
                  </span>
                  M+
                </h3>
                <p>Accredited investors</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter__item">
                <h3>
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={999}
                    className="purecounter"
                  >
                    <CountUp end={999} duration={5} />
                  </span>
                  +
                </h3>
                <p>Project Completed</p>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6">
              <div className="counter__item">
                <h3>
                  <span
                    data-purecounter-start={0}
                    data-purecounter-end={65}
                    className="purecounter"
                  >
                    <CountUp end={65} duration={5} />
                  </span>
                  M
                </h3>
                <p>Varified User</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Counter;
