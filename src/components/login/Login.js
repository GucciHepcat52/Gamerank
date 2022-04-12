import React from "react";
import "../login/Login.css";
import { Link } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";

export default function Login() {
  return (
    <div className="login">
        <div className="login-box">
          <h1 className="title-login">GAMERANK</h1>
          <form>
            <input type="text" placeholder="Enter Username..." required />
            <input type="password" placeholder="Enter Password..." required />
            <button>SUBMIT</button>
          </form>
          <Link to="/create-account" className="account-link">
            Create Account Here
          </Link>
        </div>
        <BackgroundVideo />
    </div>
  );
}
