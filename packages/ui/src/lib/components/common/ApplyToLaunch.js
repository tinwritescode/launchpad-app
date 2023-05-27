import Simple from "../base/Simple";
import Link from "next/link";


function ApplyToLaunch() {

  return (
    <section
      className="cta padding-bottom aos-init aos-animate"
      data-aos="fade-up"
      data-aos-duration={1000}
    >
      <div className="container">
        <div className="cta__wrapper">
          <div className="cta__content">
            <Simple subTitle="Have any projects?" title="Apply For IDO/INO" />
            <Link href="/apply-project" className="default-btn">
              Apply To Launch
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
export default ApplyToLaunch;
