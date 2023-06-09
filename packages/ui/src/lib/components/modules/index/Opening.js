import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import Link from "next/link";
import { ethers } from "ethers";

const ProjectItem = ({ project }) => (
  <div className="col-lg-4 col-md-6">
    <div className="project__item project__item--completed1">
      <div className="project__item-inner">
        <div className="project__item-thumb">
          <img width="auto" src="/images/igo/item/01.jpg" alt="IGO cover" />
          <span className="badge">
            <img
              width="auto"
              src="/images/chain/binance.png"
              alt="chain logo"
            />
          </span>
        </div>
        <div className="project__item-content">
          <div className="project__item-top">
            <div className="project__item-author">
              <Link href="#">
                <img
                  width="auto"
                  src="/images/igo/author/5.png"
                  alt="author image"
                />
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
                <p className="project__infolist-name">Project End</p>
                <p className="project__infolist-data">
                  {new Date(project.sale.endTime).toLocaleString()}
                </p>
              </li>
              <div className="project__item-amount">
                <p>Raised Amount</p>
                <h6>
                  <span className="color--theme-color">
                    {ethers.utils.formatEther(project.sale.totalRaised)}
                  </span>{" "}
                  /{" "}
                  <span>
                    {ethers.utils.formatEther(project.targettedRaise)} STRAW
                  </span>
                </h6>
                <div className="progress">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{
                      width: `${ethers.BigNumber.from(project.sale.totalRaised)
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
            </ul>
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

function Opening({ data, isLoading }) {
  const [page, setPage] = React.useState(1);
  const [totalPage, setTotalPage] = React.useState(1);

  React.useEffect(() => {
    if (data) {
      setTotalPage(Math.ceil(data.length / 6));
    }
  }, [data]);

  const handleNext = (e) => {
    e.preventDefault();
    if (page < totalPage) setPage((page) => page + 1);
  };

  const handlePrev = (e) => {
    e.preventDefault();
    if (page > 1) setPage((page) => page - 1);
  };

  const handlePage = (e) => {
    e.preventDefault();
    setPage(parseInt(e.target.id));
  };

  const currentItems = () => {
    if (data) {
      return data.slice((page - 1) * 6, page * 6);
    }
  };

  const renderPagination = () => {
    if (data) {
      let items = [];
      items.push(
        <li
          className={"page-item " + (page === 1 ? "disabled" : "")}
          onClick={handlePrev}
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleLeft} />
          </span>
        </li>
      );
      for (let i = 1; i <= totalPage; i++) {
        items.push(
          <li
            className={"page-item " + (page === i ? "active" : "")}
            aria-current={page === i ? "page" : null}
            onClick={handlePage}
            id={i}
          >
            <Link className="page-link" href={"#"}>
              {i}
            </Link>
          </li>
        );
      }
      items.push(
        <li
          className={"page-item " + (page === totalPage ? "disabled" : "")}
          onClick={handleNext}
        >
          <span className="page-link">
            <FontAwesomeIcon icon={faAngleRight} />
          </span>
        </li>
      );
      return items;
    }
    return null;
  };

  return (
    <div>
      {/* ==========>> Opening Project Section start Here <<==========  */}
      <section
        className="project"
        style={{
          backgroundImage: "url(images/project/bg.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed",
        }}
      >
        <div className="container">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <p className="section-header__subtitle">Opening</p>
                <h2 className="section__header__title">Ongoing Projects</h2>
              </div>
              <Link
                href="/ido-list#opening"
                className="default-btn default-btn--small"
              >
                View All
              </Link>
            </div>
          </div>
          <div className="project__wrapper">
            {!isLoading &&
              data &&
              (data.length > 0 ? (
                <div className="row g-4">
                  {currentItems().map((project, index) => (
                    <ProjectItem project={project} />
                  ))}
                  <ul className="pagination mt-5 justify-content-center">
                    {renderPagination()}
                  </ul>
                </div>
              ) : (
                <div className="text-center">
                  <h2>No Opening Projects</h2>
                </div>
              ))}
          </div>
        </div>
      </section>
      {/* ==========>> Completed Project Section Ends Here <<==========  */}
    </div>
  );
}

export default Opening;
