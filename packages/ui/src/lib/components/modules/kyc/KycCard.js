import { faCloudArrowUp, faFaceAngry, faSquareCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

function KycCard({ activeID, stepForword, submit, stepBackword }) {
  return (
    <section className="kyc padding-top padding-bottom">
      <div className="container">
        <div className="kyc__wrapper">
          <form className="kyc__form" id="kycForm" action="#!">
            {/* start step indicators */}
            <div className="form-header d-flex">
              <span
                className={`stepIndicator ${activeID >= 1 ? "active" : ""} ${activeID >= 2 ? "finish" : ""
                  }`}
              >
                Account Setup
              </span>
              <span
                className={`stepIndicator ${activeID >= 2 ? "active" : ""} ${activeID >= 3 ? "finish" : ""
                  }`}
              >
                Social Profiles
              </span>

              <span
                className={`stepIndicator ${activeID >= 3 ? "active" : ""} ${activeID >= 4 ? "finish" : ""
                  }`}
              >
                Personal Details
              </span>
            </div>
            {/* end step indicators */}
            {/* step one */}
            <div
              className="step"
              style={{ display: activeID == 1 ? "block" : "none" }}
            >
              <h4 className="text-center">Choose Varification Option</h4>
              <div className="form-group mb-5">
                <h6>Select Region</h6>
                <select className="form-select" aria-label="Select Region">
                  <option>USA</option>
                  <option>UK</option>
                  <option>Canada</option>
                  <option>France</option>
                  <option>Spain</option>
                </select>
              </div>
              <div className="form-group mb-4">
                <h6>Select Identity Type</h6>
                <div className="select-group">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="identy-check"
                      id="nid-check"
                    />
                    <label className="form-check-label" htmlFor="nid-check">
                      National ID
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="identy-check"
                      id="passport-check"
                      defaultChecked=""
                    />
                    <label
                      className="form-check-label"
                      htmlFor="passport-check"
                    >
                      Passport
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="identy-check"
                      id="license-check"
                      defaultChecked=""
                    />
                    <label className="form-check-label" htmlFor="license-check">
                      Driving License
                    </label>
                  </div>
                </div>
              </div>
            </div>
            {/* step two */}
            <div
              className="step"
              style={{
                display: activeID == 2 ? "block" : "none",
                content: activeID == 2 ? "block" : "none",
              }}
            >
              <h4 className="text-center">Upload Documents</h4>
              <ul className="upload__list mb-5">
                <li className="upload__item">
                  <div className="custom-upload">
                    <span>
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                    </span>
                    <input className="fileUp" type="file" name="nid-front" />
                  </div>
                  <p>NID Front Photo</p>
                </li>
                <li className="upload__item">
                  <div className="custom-upload">
                    <span>
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                    </span>
                    <input className="fileUp" type="file" name="nid-back" />
                  </div>
                  <p>NID Back Photo</p>
                </li>
                <li className="upload__item">
                  <div className="custom-upload">
                    <span>
                      <FontAwesomeIcon icon={faCloudArrowUp} />
                    </span>
                    <input
                      className="fileUp"
                      type="file"
                      name="selfie-with-nid"
                    />
                  </div>
                  <p>Selfie With NID</p>
                </li>
              </ul>
              <ul className="rules__list mb-5">
                <li className="rules__item">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </span>{" "}
                  File Accepted: JPEG/JPG/PNG (Max size: 10 MB){" "}
                </li>
                <li className="rules__item rules__item--active">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </span>{" "}
                  Document should be good condition{" "}
                </li>
                <li className="rules__item">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </span>{" "}
                  Face must be clear visible
                </li>
                <li className="rules__item">
                  {" "}
                  <span>
                    <FontAwesomeIcon icon={faSquareCheck} />
                  </span>
                  Document must be valid period
                </li>
              </ul>
              <div className="form-group mb-5">
                <h6>Enter NID Number</h6>
                <input
                  className="form-control"
                  type="text"
                  name="nid-number"
                  placeholder="eg: 29348 9348 398"
                />
              </div>
            </div>
            {/* step three */}
            <div
              className="step"
              style={{ display: activeID == 3 ? "block" : "none" }}
            >
              <h4 className="text-center">Personal Information</h4>
              <div className="form-group mb-4">
                <h6>Full Name</h6>
                <input
                  className="form-control"
                  type="text"
                  name="Full Name"
                  placeholder="eg: Alex Hales"
                />
              </div>
              <div className="form-group mb-4">
                <h6>State/Provience</h6>
                <input
                  className="form-control"
                  type="text"
                  name="state Name"
                  placeholder="eg: Los Angeles"
                />
              </div>
              <div className="form-group mb-4">
                <h6>Address Line</h6>
                <input
                  className="form-control"
                  type="text"
                  name="address line"
                  placeholder="eg: 653 Jett Lane"
                />
              </div>
              <div className="form-group mb-4">
                <h6>City Name</h6>
                <input
                  className="form-control"
                  type="text"
                  name="city name"
                  placeholder="eg: Los Angeles"
                />
              </div>
              <div className="form-group mb-4">
                <h6>Postal Code</h6>
                <input
                  className="form-control"
                  type="text"
                  name="Postal code"
                  placeholder="eg: 90017"
                />
              </div>
            </div>
            {/* start previous / next buttons */}
            <div className="form-footer d-flex">
              {activeID >= 2 && (
                <button type="button" id="prevBtn" onClick={stepBackword}>
                  Previous
                </button>
              )}
              {activeID < 3 && (
                <button type="button" id="nextBtn" onClick={stepForword}>
                  Next
                </button>
              )}
              {activeID === 3 && (
                <button type="button" id="submitBtn" onClick={submit}>
                  Submit
                </button>
              )}
            </div>
            {/* end previous / next buttons */}
          </form>
        </div>
      </div>
    </section>
  );
}

export default KycCard;
