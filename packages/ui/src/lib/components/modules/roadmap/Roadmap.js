import RoadMapSlider from '../../../components/partials/RoadmapSlider';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';
import Simple from '../../../components/base/Simple';
SwiperCore.use([Autoplay, Navigation, Pagination]);

function Roadmap({ data }) {
  return (
    <section className="roadmap padding-top padding-bottom" id="roadmap">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Roadmap" title="How It All Started" />
            </div>
          </div>
        </div>
        <div className="roadmap__wrapper">
          <div className="swiper roadmap__slider">
            <div className="swiper-wrapper">
              <Swiper
                spaceBetween={30}
                slidesPerView={4}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                // loop={true}
                navigation={{
                  nextEl: '.roadmap__slider-next',
                  prevEl: '.roadmap__slider-prev',
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 4,
                  },
                }}
              >
                {data.map((item) => {
                  return (
                    <SwiperSlide
                      style={{ paddingBottom: '58px' }}
                      key={item.id}
                    >
                      <RoadMapSlider
                        title={item.title}
                        date={item.date}
                        text={item.text}
                        id={item.id}
                      />
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </div>
          </div>
          <div className="roadmap__slider-prev">
            <FontAwesomeIcon icon={faAngleLeft} />
          </div>
          <div className="roadmap__slider-next">
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Roadmap;
