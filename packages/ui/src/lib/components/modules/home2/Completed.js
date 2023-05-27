import Link from 'next/link';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CompletedSlider from '../../../components/partials/CompletedSlider';
SwiperCore.use([Autoplay, Navigation, Pagination]);

const Completed = ({ data }) => {
  return (
    <section className="project padding-top padding-bottom bg--primary-color">
      <div className="container">
        <div className="section-header section-header--left">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <p className="section-header__subtitle"> Completed</p>
              <h2 className="section__header__title">Previous Projects</h2>
            </div>
            <Link href="/project2" className="default-btn">
              View all
            </Link>
          </div>
        </div>
        <div className="project__wrapper">
          <Swiper
            spaceBetween={30}
            slidesPerView={3}
            autoplay={{ delay: 3500, disableOnInteraction: false }}
            loop={true}
            pagination={{
              el: '.project__slider-pagination',
              clickable: true,
            }}
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
            {data.map((item) => {
              return (
                <SwiperSlide key={item.id}>
                  <CompletedSlider
                    img1Src={item.img1Src}
                    img2Src={item.img2Src}
                    img3Src={item.img3Src}
                    title={item.title}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
          <div className="project__slider-pagination mt-4 text-center" />
        </div>
      </div>
    </section>
  );
};

export default Completed;
