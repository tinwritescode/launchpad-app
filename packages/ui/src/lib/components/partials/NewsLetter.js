import React from "react";

function NewsLetter() {
  return (
    <section
      className="newsletter padding-bottom"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="newsletter__wrapper newsletter__wrapper--bg-shapes">
          <div className="section-header section-header--middle">
            <div className="section-header__content">
              <div className="section-header__titlebar">
                <p className="section-header__subtitle"> Stay Updated</p>
                <h3 className="section__header__title">
                  {" "}
                  Subscribe For newsletter
                </h3>
              </div>
            </div>
          </div>
          <div className="newsletter__form">
            <div className="row justify-content-center">
              <div className="col-lg-6">
                <form action="#">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email address"
                    aria-label="newsletter Email"
                  />
                  <button type="submit">Subscribe</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default NewsLetter;
