import Link from "next/link";
import React from "react";

function ResetCard() {
  return (
    <div className="login-section padding-top padding-bottom">
      <div className=" container">
        <div className="account-wrapper">
          <div className="account-title">
            <h2>Reset Password</h2>
            <p>
              We’ll send you an email with a link to reset the Password to your
              account
            </p>
          </div>
          <form className="account-form">
            <div className="form-group">
              <input type="email" placeholder="Enter Your Email" name="email" />
            </div>
            <div className="form-group">
              <button className="default-btn">
                <span>Send Reset Code</span>
              </button>
            </div>
          </form>
          <div className="account-bottom">
            <span className="d-block cate pt-10">
              Remember your password ? <Link href="login"> Login</Link>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetCard;
