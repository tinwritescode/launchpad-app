import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Simple from '../../../components/base/Simple';

import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import Link from 'next/link';

function Team({ team }) {
  return (
    <section className="team padding-bottom shape-1r" id="team">
      <div className="container">
        <div className="section-header section-header--middle">
          <div className="section-header__content">
            <div className="section-header__titlebar">
              <Simple subTitle="Team" title="Meet the crew" />
            </div>
          </div>
        </div>
        <div className="team__wrapper">
          <div className="row justify-content-center g-4">
            {team.slice(0, 4).map((item) => {
              return (
                <div key={item.id} className="col-lg-3 col-sm-6">
                  <div
                    className="team__item aos-init aos-animate"
                    data-aos="fade-up"
                    data-aos-duration={800}
                  >
                    <div className="team__thumb">
                      <img
                        width="auto"
                        src={item.img}
                        alt="Team Member Image"
                      />
                    </div>
                    <div className="team__content">
                      <h4>
                        <Link href="/team-member">{item.name}</Link>
                      </h4>
                      <p>{item.role}</p>
                      <ul className="social">
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faFacebookF} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faLinkedinIn} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faTwitter} />
                          </Link>
                        </li>
                        <li className="social__item">
                          <Link href="#" className="social__link">
                            <FontAwesomeIcon icon={faInstagram} />
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
