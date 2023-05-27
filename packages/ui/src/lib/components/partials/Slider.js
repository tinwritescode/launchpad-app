
import SwiperCore, { Autoplay, Navigation, Pagination } from "swiper";
SwiperCore.use([Autoplay, Navigation, Pagination]);
import Button from "../base/Button";
import ProgressBar from "../base/ProgressBar";
import Link from "next/link";
import Image from 'next/image';

const CustomSlider = ({ img1Src, img2Src, img3Src, title }) => {
  return (
    <div className="swiper-slide">
      <div className="project__item">
        <div className="project__item-inner">
          <div className="project__item-thumb">
            <img width="auto" src={img1Src} alt="" />

            <span className="badge">
              <Image src={img2Src}
                width={500}
                height={500}
                alt="logo"
              />
            </span>
          </div>
          <div className="project__item-content">
            <div className="project__item-top">
              <div className="project__item-author">
                <Link href="#">
                  <Image src={img3Src}
                    width={500}
                    height={500}
                    alt="logo"
                  />
                </Link>
                <h4>{title}</h4>
              </div>
            </div>
            <div className="project__item-middle">
              <ul className="project__infolist">
                <li className="project__infolist-item">
                  <p className="project__infolist-name">Round Name:</p>
                  <p className="project__infolist-data">Public</p>
                </li>
                <li className="project__infolist-item">
                  <p className="project__infolist-name">Participent</p>
                  <p className="project__infolist-data">42</p>
                </li>
                <li className="project__infolist-item">
                  <p className="project__infolist-name">Project Start</p>
                  <p className="project__infolist-data">TBA</p>
                </li>
              </ul>
              <div className="project__item-amount">
                <p>Raised Ammount</p>
                <h6>
                  <span className="color--theme-color">5000</span> /
                  <span>15000 BUSD</span>
                </h6>
                <ProgressBar />
              </div>
            </div>
            <div className="project__item-bottom">
              <Button text="View Details" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomSlider;
