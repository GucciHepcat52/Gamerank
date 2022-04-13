import React, { useState } from "react";
import "../login/Login.css";
import { Link, useNavigate } from "react-router-dom";
import BackgroundVideo from "./BackgroundVideo";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLogin((prevLogin) => {
      return {
        ...prevLogin,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    let userId = 0;
    let loggedIn = false;
    try {
      await axios
        .get(`/api/users?username=${login.username}&password=${login.password}`)
        .then((res) => {
          const userTmp = res.data[0];
          userId = userTmp.user_id;
          loggedIn = true;
        });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
      alert("Invalid Username or Password");
    }

    if (loggedIn === true) {
      window.localStorage.setItem("Gamerank-user", userId);
      window.localStorage.setItem("Gamerank-username", login.username);
      navigate("/home");
    }

    setLogin({
      username: "",
      password: "",
    });
  }

  return (
    <div className="login">
      <div className="login-box">
        <h1 className="title-login">GAMERANK</h1>
        <form>
          <input
            type="text"
            placeholder="Enter Username..."
            name="username"
            value={login.username}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Password..."
            name="password"
            value={login.password}
            onChange={handleChange}
            required
          />
          <button onClick={handleSubmit}>SUBMIT</button>
        </form>
        <Link to="/create-account" className="account-link">
          Create Account Here
        </Link>
      </div>
      <BackgroundVideo />
    </div>
  );
}
