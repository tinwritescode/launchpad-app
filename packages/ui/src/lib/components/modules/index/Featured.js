import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import SwiperCore, { Autoplay, Navigation, Pagination } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import CustomSlider from '../../../components/partials/Slider';
SwiperCore.use([Autoplay, Navigation, Pagination]);

function Featured({ data }) {
  return (
    <section className="project project--featured padding-top padding-bottom">
      <div className="container">
        <div className="project__wrapper">
          <div className="row">
            <div className="col-lg-4">
              <div className="section-header section-header--left">
                <div className="section-header__content">
                  <div className="section-header__titlebar">
                    <div className="section-header__subtitle">Trending</div>
                    <h2 className="section__header__title">
                      Most Popular IDO Projects
                    </h2>
                    <p>
                      Lorem ipsum dolor sit, amet consectetur <br />
                      adipisicing elit. Cum, quod?
                    </p>
                    <div className="project__slider2-nav">
                      <div className="project__slider2-prev">
                        <FontAwesomeIcon icon={faArrowLeft} />
                      </div>
                      <div className="project__slider2-next">
                        <FontAwesomeIcon icon={faArrowRight} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-8">
              <Swiper
                spaceBetween={30}
                slidesPerView={2}
                speed={1200}
                autoplay={{ delay: 3500, disableOnInteraction: false }}
                pagination={{ el: '.project__slider-pagination' }}
                loop={true}
                navigation={{
                  nextEl: '.project__slider2-next',
                  prevEl: '.project__slider2-prev',
                }}
                breakpoints={{
                  0: {
                    slidesPerView: 1,
                  },
                  768: {
                    slidesPerView: 2,
                  },
                  992: {
                    slidesPerView: 2,
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Featured;
