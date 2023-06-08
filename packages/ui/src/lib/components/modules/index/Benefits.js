import Simple from "../../../components/base/Simple";

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
                    <h4>Access to a Wide Investor Community</h4>
                    <p>
                      By launching your project on our IDO launchpad, you gain
                      access to a large and diverse investor community,
                      increasing your chances of attracting potential investors
                      and raising funds for your project.
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
                    <h4>Credibility and Trust</h4>
                    <p>
                      Our platform is known for its credibility and
                      trustworthiness in the crypto space. By choosing our
                      launchpad, your project benefits from our established
                      reputation, which can enhance investor confidence and
                      attract more participation.
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
                    <h4>Technical Support and Expertise</h4>
                    <p>
                      Our experienced team provides comprehensive technical
                      support throughout the IDO launch process. We assist with
                      token creation, smart contract audits, token distribution,
                      and other technical aspects, ensuring a smooth and secure
                      launch for your project.
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
                    <h4>Marketing Exposure</h4>
                    <p>
                      We actively promote IDOs on our platform, leveraging our
                      marketing channels and community outreach. By launching
                      through our platform, your project gains visibility and
                      exposure to a wider audience, helping to generate interest
                      and attract potential investors.
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
