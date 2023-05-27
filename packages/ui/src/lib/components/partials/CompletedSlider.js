import Button from "../base/Button";
import ProgressBar from "../base/ProgressBar";
import Link from "next/link";


const CompletedSlider = ({ img1Src, img2Src, img3Src, title }) => {
  return (
    <div className="swiper-slide">
      <div className="project__item project__item--completed1">
        <div className="project__item-inner">
          <div className="project__item-thumb">
            <img width="auto" src={img1Src} alt="IGO cover" />
            <span className="badge">
              <img width="auto" src={img2Src} alt="chain logo" />
            </span>
          </div>
          <div className="project__item-content">
            <div className="project__item-top">
              <div className="project__item-author">
                <Link href="#">
                  <img width="auto" src={img3Src} alt="author image" />
                </Link>
                <h4>{title}</h4>
              </div>
            </div>
            <div className="project__item-middle">
              <div className="project__item-amount">
                <p>Raised Ammount</p>
                <h6>
                  <span className="color--theme-color">5000</span> /{" "}
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
export default CompletedSlider;
