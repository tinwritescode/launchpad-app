import Link from "next/link";
import React from "react";

function Banner() {
  return (
    <section
      className="banner banner--style2"
      id="home"
      style={{ backgroundImage: "url(images/banner/bg2.png)" }}
    >
      <div className="container">
        <div className="banner__wrapper">
          <div className="row g-5 justify-content-center">
            <div className="col-lg-10">
              <div
                className="banner__content text-center aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={1000}
              >
                <h1>
                  Metaverse Web 3.0 <br /> DEX Launcepad, ICO &amp; INO{" "}
                </h1>
                <p>Multichain Gaming Ecosystem for IDOs &amp; INOs Pre-Sales</p>
                <Link href="/project" className="default-btn">
                  <span>Explore IDOs</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
