SwiperCore.use([Autoplay, Navigation, Pagination]);
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
import Link from "next/link";
import Image from 'next/image';



function Completed({ completed }) {
  return (
    <section className="project project--completed2 uplifted">
      <div className="container">
        <div
          className="project__wrapper aos-init"
          data-aos="fade-up"
          data-aos-duration={800}
        >
          <div className="project--completed2-slider swiper">
            <div className="swiper-wrapper">
              <Swiper
                style={{ width: "100%" }}
                direction={"vertical"}
                slidesPerView={2}
                speed={1200}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
              >
                {completed.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <div className="project__item2 position-relative">
                        <div className="project__item2-inner">
                          {/* project name */}
                          <div className="project__item2-name">
                            <div className="project__item2-thumb">
                              <Image src={item.img1Src}
                                width={90}
                                height={90}
                                alt="Project Image"
                              />
                            </div>
                            <div className="project__item2-content">
                              <h4>
                                <Link
                                  href="/projectdetails"
                                  className="stretched-link"
                                >
                                  {item.name}
                                </Link>
                              </h4>
                              <p>PRICE (GAC) = 0.59 BUSD</p>
                            </div>
                          </div>
                          {/* projct chain */}
                          <div className="project__item2-chain">
                            <Image src={item.img2Src}
                              width={40}
                              height={40}
                              alt="chain icon"
                            />
                          </div>
                          {/* project launching time */}
                          <div className="project__item2-time">
                            <p>{item.days} Ago</p>
                          </div>
                          {/* project raised ammount */}
                          <div className="project__item-amount">
                            <p>Raised Ammount</p>
                            <h6>
                              <span className="color--theme-color">
                                {item.raised}
                              </span>{" "}
                              / <span>15000 BUSD</span>
                            </h6>
                            <div className="progress">
                              <div
                                className="progress-bar"
                                role="progressbar"
                                style={{ width: "25%" }}
                                aria-valuenow={25}
                                aria-valuemin={0}
                                aria-valuemax={100}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link href="/project" className="default-btn">
            <span>View Projects</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Completed;
