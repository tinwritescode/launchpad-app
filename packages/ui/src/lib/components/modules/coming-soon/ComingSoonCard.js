import {
  faInstagram,
  faTwitter,
  faDiscord,
  faTwitch,
  faLinkedinIn,
  faFacebookF,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";


function ComingSoonCard() {
  return (
    <div
      className="coming-soon"
      style={{ backgroundImage: "url(images/error/coming.png)" }}
    >
      <div className="container-fluid">
        <div className="coming-soon__wrapper text-center">
          <div className="coming-soon__content">
            <Link className="mb-4 d-inline-block" href="/">
              <img width="auto" src="/images/logo/logo.png" alt="Torkgo logo" />
            </Link>
            <h2>We are Coming soon</h2>
            <p>
              We are almost there ! If your wanna get notify when the website is
              live,
              <br /> Subscribe to out mailing list
            </p>
            <div className="mail-collect">
              <div className="form-floating mb-4">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <button type="button" className="default-btn">Notify Me</button>
            </div>
            <ul className="social justify-content-center">
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faTwitter} />
                </Link>
              </li>
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faDiscord} />
                </Link>
              </li>
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faTwitch} />
                </Link>
              </li>
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faInstagram} />
                </Link>
              </li>
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faLinkedinIn} />
                </Link>
              </li>
              <li className="social__item">
                <Link href="#" className="social__link">
                  <FontAwesomeIcon icon={faFacebookF} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ComingSoonCard;
