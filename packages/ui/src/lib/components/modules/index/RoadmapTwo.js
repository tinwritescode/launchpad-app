import Simple from '../../../components/base/Simple';
import DefaultButton from '../../../components/base/DefaultButton';
import { useRouter } from 'next/router';

function RoadmapTwo() {
  const route = useRouter();
  return (
    <section className="roadmap padding-bottom padding-top" id="roadmap">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Explore" title="Our Roadmap" />
            </div>
          </div>
        </div>
        <div className="roadmap__wrapper2">
          <div className="row gy-4 gy-md-0 gx-5">
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Launchpad Initialized</h4>
                      <p>01</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Website Creation</h4>
                      <p>02</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Seed Sale</h4>
                      <p>03</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Torkgo Farming</h4>
                      <p>04</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6 offset-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-left"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Stacking Program</h4>
                      <p>05</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="roadmap__item2 ms-auto me-md-4 aos-init aos-animate"
                data-aos="fade-right"
                data-aos-duration={800}
              >
                <div className="roadmap__item2-inner">
                  <div className="roadmap__item2-content">
                    <div className="roadmap__item2-header">
                      <h4>Multichain Launchpad</h4>
                      <p>06</p>
                    </div>
                    <p>
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Sunt, accusant ium! Dolores maxime numquam animi saepe
                      sapiente tempora, veritatis velit delectus debitis
                      provident dolore alias reiciendis cupiditate facere
                      aliquid iusto inventore!
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

export default RoadmapTwo;
