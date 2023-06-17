import { formatEther, commify } from "ethers/lib/utils";
import { usePagination } from "../../partials/Pagination2";
import Link from "next/link";

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
              <li className="project__infolist-item">
                <p className="project__infolist-name">Qualified Stakers</p>
                <p className="project__infolist-data">
                  {project.sale.eligibleStakers}
                </p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Targetted Raise:</p>
                <p className="project__infolist-data">
                  {commify(formatEther(project.targettedRaise))} STRAW
                </p>
              </li>
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
  const pagination = usePagination({ data, perPage: 3 });

  return (
    <div>
      {/* ==========>> Opening Project Section start Here <<==========  */}
      <section
        className="project bg--primary-color"
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
                  {pagination.displayItems().map((project, index) => (
                    <ProjectItem project={project} key={index} />
                  ))}
                  <ul className="pagination mt-5 justify-content-center">
                    <pagination.Pagination />
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
