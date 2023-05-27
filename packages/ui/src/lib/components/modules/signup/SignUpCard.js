import { faDiscord, faFacebook, faFacebookF, faLinkedin, faLinkedinIn, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

function SignUpCard() {
  const route = useRouter()
  return (
    <div className={route.asPath === "/signup" ? "login-section padding-top" : "login-section padding-top padding-bottom"}>
      <div className=" container">
        <div className="account-wrapper">
          <div className="account-title">
            <h2>Sign Up</h2>
            <p>Enter your all information to create a new account</p>
          </div>
          <form className="account-form">
            <div className="form-group">
              <input type="text" placeholder="First Name" name="Fname" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Last Name" name="Lname" />
            </div>
            <div className="form-group">
              <input type="text" placeholder="Email" name="email" />
            </div>
            <div className="form-group">
              <input type="password" placeholder="Password" name="password" />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password"
              />
            </div>
            <div className="form-group">
              <button className="d-block default-btn">
                <span>Create Account</span>
              </button>
            </div>
          </form>
          <div className="account-bottom">
            <span className="d-block cate pt-10">
              Have any Account? <Link href="login"> Login</Link>
            </span>
            <span className="or">
              <span>or</span>
            </span>
            <h5 className="subtitle">Register With Social Media</h5>
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

export default SignUpCard;
