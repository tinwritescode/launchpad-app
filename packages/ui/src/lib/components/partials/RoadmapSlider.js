import React from "react";

const RoadMapSlider = ({ date, title, text, id }) => {
  return (
    // skipped: data-aos="fade-up"
    // data-aos-duration="1000" insole roadmap item
    <div className="roadmap__item">
      <div className="roadmap__item-inner roadmap__item-inner--vertical-line">
        <div className="roadmap__item-year">
          <h6>{date}</h6>
          <img width="auto" src="/images/roadmap/arrow-icon.png" alt="Arrow Icon" />
        </div>
        <div className="roadmap__item-content">
          <div className="roadmap__item-icon">{id}</div>
          <div className="roadmap__item-text">
            <h4>{title}</h4>
            <p>{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RoadMapSlider;
