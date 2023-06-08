import Simple from "../../../components/base/Simple";
import Link from "next/link";

const Steps = [
  {
    title: "Connect Wallet",
    description: "Start by connecting your wallet to the platform.",
    image: "/images/work/1.png",
    link: "/#",
  },
  {
    title: "Start Staking",
    description: "Stake your tokens and start earning rewards instantly.",
    image: "/images/work/2.png",
    link: "/staking",
  },
  {
    title: "Join your favorite IDO",
    description: "Pick your favorite project and join the IDO.",
    image: "/images/work/3.png",
    link: "/ido-list#opening",
  },
];

function Work({ stepNum }) {
  return (
    <section className="work padding-top padding-bottom bg--primary-color">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Getting Started" title="Simple as 1, 2, 3" />
            </div>
          </div>
        </div>
        <div className="work__wrapper">
          <div className="row justify-content-center g-4">
            {Steps.map((step, index) => (
              <div className="col-lg-4 col-sm-6" key={`work-step-${index}`}>
                <div className="work__item">
                  <div className="work__item-inner">
                    <Link
                      href={step.link}
                      className={`work__item-link ${
                        stepNum > index ? "active" : ""
                      }`}
                      onClick={(e) => {
                        // if stepNum === 0 then connect wallet not redirect to /# but open modal
                        if (stepNum === 0) {
                          e.preventDefault();
                          document.getElementById("connect-wallet").click();
                        }
                      }}
                    >
                      <div className="work__item-thumb">
                        <img
                          width="auto"
                          src={step.image}
                          alt={`work step ${index + 1} image`}
                        />
                      </div>
                      <div className="work__item-content">
                        <h4>{`${index + 1}. ${step.title}`}</h4>
                        <p>{step.description}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-5">
            <Link
              href={Steps[stepNum].link}
              className="default-btn"
              onClick={(e) => {
                if (stepNum === 0) {
                  e.preventDefault();
                  document.getElementById("connect-wallet").click();
                }
              }}
            >
              {Steps[stepNum].title}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Work;
