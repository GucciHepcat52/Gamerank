import React from "react";
import "../home-page/NavBar.css";
import { Link } from "react-router-dom";

export default function NavBar() {
  const username = window.localStorage.getItem("Gamerank-username");

  function handleLogout() {
    window.localStorage.clear();
  }

  return (
    <div className="navbar">
      <h1 className="title-home">GAMERANK</h1>
      <div className="hello-box">
        <h2>Hello, {username}!</h2>
      </div>
      <Link to="/home/wishlist" id="wishlist">
        <h3>+ Your Wishlist</h3>
      </Link>
      <Link to="/" id="logout">
        <button onClick={handleLogout} id="logout-btn">Logout</button>
      </Link>
    </div>
  );
}
