import React, { useState } from "react";
import "../login/CreateAccount.css";
import { Link } from "react-router-dom";
import axios from "axios";
import BackgroundVideo from "./BackgroundVideo";

export default function CreateAccount() {
  const [newUser, setNewUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;

    setNewUser((prevNewUser) => {
      return {
        ...prevNewUser,
        [name]: value,
      };
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      await axios.post("/api/users", newUser).then((res) => {
        alert("Account was created successfully!");
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }

    setNewUser({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
    });
  }

  return (
    <div className="login">
      <div className="create-box">
        <form>
          <input
            type="text"
            placeholder="Enter First Name..."
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Enter Last Name..."
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            placeholder="Enter Username..."
            name="username"
            value={newUser.username}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Enter Email..."
            name="email"
            value={newUser.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Enter Password..."
            name="password"
            value={newUser.password}
            onChange={handleChange}
            required
          />
          <button onClick={handleSubmit}>CREATE ACCOUNT</button>
        </form>
        <Link to="/" className="login-link">
          Back to Home
        </Link>
      </div>
      <BackgroundVideo />
    </div>
  );
}
