import React from "react";
import Link from "next/link";

const Banner = () => {
  return (
    <section
      className="banner banner--style2"
      id="home"
      style={{ backgroundImage: "url(images/banner/bg.jpg)" }}
    >
      <div className="container">
        <div className="banner__wrapper">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-10">
              <div
                className="banner__content text-center aos-init aos-animate"
                data-aos="zoom-in"
                data-aos-duration={900}
              >
                <h1>
                  Metaverse Web 3.0 <br /> Gaming Launcepad &amp; IDO{" "}
                </h1>
                <p>Multichain Gaming Ecosystem for IDOs &amp; INO Pre-Sales</p>
                <Link href="/project" className="default-btn">
                  <span>ExploreIDOs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
