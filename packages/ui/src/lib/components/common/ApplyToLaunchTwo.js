import Simple from "../base/Simple";
import { useState } from "react";

function ApplyToLaunchTwo() {
  const [show, setShow] = useState(false);

  return (
    <section
      className="cta padding-top padding-bottom aos-init aos-animate"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="cta__wrapper">
          <div className="cta__content">
            <Simple subTitle="Have any projects?" title="Apply for IDO/INO" />
            {!show && (
              <button className="default-btn" onClick={
                () => setShow(true)
              }>
                Apply To Launch
              </button>
            )}
            {show && (
              <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSe_Dc07s9iaZZAz_Gs9ueo5PqYu_sBAw7ejWqbkjbexZ_JqqA/viewform?embedded=true" width="720" height="1825" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default ApplyToLaunchTwo;
