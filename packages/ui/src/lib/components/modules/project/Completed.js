import React from "react";
import { usePagination } from "../../partials/Pagination2";
import Link from "next/link";
import { formatEther, commify } from "ethers/lib/utils";
import { BigNumber } from "ethers";

const ProjectItem = ({ project }) => (
  <div className="col-lg-4 col-md-6">
    <div className="project__item project__item--completed1">
      <div className="project__item-inner">
        <div className="project__item-thumb">
          <img width="auto" src={project.bannerImage} alt="IGO cover" />
          <span className="badge">
            <img width="auto" src="/images/chain/metic.png" alt="chain logo" />
          </span>
        </div>
        <div className="project__item-content">
          <div className="project__item-top">
            <div className="project__item-author">
              <Link href="#">
                <img width="auto" src={project.image} alt="author image" />
              </Link>
              <h4>{project.name}</h4>
            </div>
          </div>
          <div className="project__item-middle">
            <ul className="project__infolist">
              <li className="project__infolist-item">
                <p className="project__infolist-name">Token</p>
                <p className="project__infolist-data">
                  {project.token.name} ({project.token.symbol})
                </p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Completed On</p>
                <p className="project__infolist-data">
                  {new Date(project.sale.endTime).toLocaleDateString()}
                </p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Purchasers</p>
                <p className="project__infolist-data">
                  {project.sale.totalParticipants}
                </p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Whitelisted Users</p>
                <p className="project__infolist-data">
                  {project.sale.whitelistedUsers}
                </p>
              </li>
            </ul>
            <div className="project__item-amount">
              <p>Raised Amount</p>
              <h6>
                <span className="color--theme-color">
                  {commify(formatEther(project.sale.totalRaised))}
                </span>{" "}
                /{" "}
                <span>
                  {commify(formatEther(project.targettedRaise))} STRAW
                </span>
              </h6>
              <div className="progress">
                <div
                  className="progress-bar"
                  role="progressbar"
                  style={{
                    width: `${BigNumber.from(project.sale.totalRaised)
                      .mul(100)
                      .div(project.targettedRaise)
                      .toNumber()}%`,
                  }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
          </div>
          <div className="project__item-bottom">
            <Link
              href={`/project/${project.id}`}
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

const Completed = ({ data, isLoading }) => {
  const pagination = usePagination({ data, perPage: 6 });

  return (
    <div id="closed">
      {/* ==========>> Completed Project Section start Here <<==========  */}
      <section className="project padding-top padding-bottom bg--primary-color">
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <p className="section-header__subtitle">Completed</p>
                <h2 className="section__header__title">Previous Projects</h2>
              </div>
            </div>
          </div>
          <div className="project__wrapper">
            {!isLoading &&
              data &&
              (data.length > 0 ? (
                <div className="row g-4">
                  {pagination.displayItems().map((project, index) => (
                    <ProjectItem project={project} key={index} />
                  ))}
                  <ul className="pagination mt-5 justify-content-center">
                    <pagination.Pagination />
                  </ul>
                </div>
              ) : (
                <div className="text-center">
                  <h2>No Completed Projects Yet</h2>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* ==========>> Completed Project Section Ends Here <<==========  */}
    </div>
  );
};

export default Completed;
