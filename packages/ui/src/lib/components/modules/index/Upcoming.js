import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import CustomSlider from '../../../components/partials/Slider';
import Link from 'next/link';

SwiperCore.use([Autoplay, Navigation, Pagination]);

function Upcoming({ data }) {
  return (
    <section className="project padding-top padding-bottom">
      <div className="container">
        {/* <div className="section-header section-header--left">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <div className="section-header__subtitle">IDO Project</div>
                <h2 className="section__header__title">Upcoming IDO</h2>
              </div>
              <Link href="/leaderboard" className="default-btn default-btn--small">View Rank</Link>
            </div>
          </div> */}

        <div className="section-header section-header--left">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <div className="section-header__subtitle">IDO Project</div>
              <h2 className="section__header__title">Upcoming IDO</h2>
            </div>
            <Link href="/project" className="default-btn default-btn--small">
              View All
            </Link>
          </div>
        </div>

        <div className="project__wrapper">
          <div className="swiper project__slider py-2">
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                slidesPerView={3}
                speed={1200}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{
                  el: '.project__slider-pagination',
                  clickable: true,
                }}
                navigation={{
                  nextEl: '.project__slider2-next',
                  prevEl: '.project__slider2-prev',
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
                {data.map((item) => {
                  return (
                    <SwiperSlide key={item.id}>
                      <CustomSlider
                        img1Src={item.img1Src}
                        img2Src={item.img2Src}
                        img3Src={item.img3Src}
                        title={item.title}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
            <div className="project__slider-pagination mt-4 text-center" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Upcoming;
