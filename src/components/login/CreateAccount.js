import React from "react";
import "../login/CreateAccount.css";
import { Link } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";

export default function CrateAccount() {
  return (
    <div className="login">
      <div className="create-box">
        <form>
          <input type="text" placeholder="Enter First Name..." required />
          <input type="text" placeholder="Enter Last Name..." required />
          <input type="text" placeholder="Enter Username..." required />
          <input type="email" placeholder="Enter Email..." required />
          <input type="password" placeholder="Enter Password..." required />
          <button>CREATE ACCOUNT</button>
        </form>
        <Link to="/" className="login-link">
          Back to Home
        </Link>
      </div>
      <BackgroundVideo />
    </div>
  );
}
