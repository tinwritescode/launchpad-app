import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Link from "next/link";
import Button from "../../../components/base/Button";
import { formatEther, commify } from "ethers/lib/utils";

SwiperCore.use([Autoplay, Navigation, Pagination]);

const ProjectItem = ({ project }) => (
  <div className="swiper-slide">
    <div className="project__item">
      <div className="project__item-inner">
        <div className="project__item-thumb">
          <img width="auto" src={project.bannerImage} alt="project logo" />

          <span className="badge">
            <img
              src={"/images/chain/aval.png"}
              width={500}
              height={500}
              alt="token icon"
            />
          </span>
        </div>
        <div className="project__item-content">
          <div className="project__item-top">
            <div className="project__item-author">
              <Link href="#">
                <img
                  src={project.image}
                  width={500}
                  height={500}
                  alt="project image"
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
                <p className="project__infolist-name">Project Start</p>
                <p className="project__infolist-data">
                  {new Date(project.sale.startTime).toLocaleString()}
                </p>
              </li>
              <li className="project__infolist-item">
                <p className="project__infolist-name">Project End</p>
                <p className="project__infolist-data">
                  {new Date(project.sale.endTime).toLocaleString()}
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
            <Button text="View Details" href={`/project/${project.id}`} />
          </div>
        </div>
      </div>
    </div>
  </div>
);

function Upcoming({ data, isLoading }) {
  if (data && data.length > 0) {
    //  fill empty object into data array to make it 3
    if (data.length < 3) {
      for (let i = data.length; i < 3; i++) {
        data.push(undefined);
      }
    }
  }

  return (
    <section className="project padding-top padding-bottom">
      <div className="container">
        <div className="section-header section-header--left">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <div className="section-header__subtitle">Upcoming</div>
              <h2 className="section__header__title">Next Projects</h2>
            </div>
            <Link
              href="/ido-list#upcoming"
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
              <div className="swiper project__slider py-2">
                <div className="swiper-wrapper">
                  <Swiper
                    spaceBetween={30}
                    slidesPerView={3}
                    speed={1200}
                    autoplay={{ delay: 3500, disableOnInteraction: false }}
                    pagination={{
                      el: ".project__slider-pagination",
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: ".project__slider2-next",
                      prevEl: ".project__slider2-prev",
                    }}
                    loop={true}
                    breakpoints={{
                      0: {
                        slidesPerView: 1,
                      },
                      768: {
                        slidesPerView: 2,
                      },
                      992: {
                        slidesPerView: 3,
                      },
                    }}
                  >
                    {data.map((item, index) =>
                      item ? (
                        <SwiperSlide>
                          <ProjectItem project={item} key={index} />
                        </SwiperSlide>
                      ) : (
                        <SwiperSlide></SwiperSlide>
                      )
                    )}
                  </Swiper>
                </div>
                <div className="project__slider-pagination mt-4 text-center" />
              </div>
            ) : (
              <div className="text-center">
                <h2>No Upcoming Projects</h2>
              </div>
            ))}
        </div>
      </div>
    </section>
  );
}

export default Upcoming;
