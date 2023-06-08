import Simple from "../../../components/base/Simple";
import DefaultButton from "../../../components/base/DefaultButton";
import Link from "next/link";
import { ethers } from "ethers";

const ProjectItem = ({ project }) => (
  <div className="col-12">
    <div
      className="project__item2 position-relative aos-init aos-animate"
      data-aos="fade-up"
      data-aos-duration={800}
    >
      <div className="project__item2-inner">
        <div className="project__item2-name">
          <div className="project__item2-thumb">
            <img
              width="auto"
              src="/images/igo/author/5.png"
              alt="Project Image"
            />
          </div>
          <div className="project__item2-content">
            <h4>
              <Link href={`/project/${project.id}`} className="stretched-link">
                {project.name}
              </Link>
            </h4>
            <p>
              {project.token.name} ({project.token.symbol})
            </p>
          </div>
        </div>

        <div className="project__item2-chain">
          <img width="auto" src="/images/chain/metic.png" alt="chain icon" />
        </div>

        <div className="project__item2-time">
          <p>
            Completed on {new Date(project.sale.endTime).toLocaleDateString()}
          </p>
        </div>
        <div className="project__item-amount">
          <div>Raised Amount</div>
          <h6>
            <span className="color--theme-color">
              {ethers.utils.formatEther(project.sale.totalRaised)}
            </span>
            <span>
              {" "}
              / {ethers.utils.formatEther(project.targettedRaise)} STRAW
            </span>
          </h6>
          <div className="progress">
            <div
              className="progress-bar"
              role="progressbar"
              style={{
                width: "25%",
              }}
              aria-valuenow={25}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Completed = ({ data, isLoading }) => {
  return (
    <section className="project padding-bottom project--completed2">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Previous" title="Completed Projects" />
            </div>
          </div>
        </div>
        <div className="project__wrapper">
          <div className="row g-4">
            {!isLoading &&
              data
                ?.slice(0, 5)
                .map((project) => (
                  <ProjectItem key={project.id} project={project} />
                ))}
          </div>
          <div
            className="text-center mt-5 aos-init aos-animate"
            data-aos="fade-up"
            data-aos-duration={800}
          >
            <Link href="/ido-list#closed" className="default-btn">
              View More
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Completed;
