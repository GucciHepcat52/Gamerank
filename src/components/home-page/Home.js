import React, { useState } from "react";
import "./Home.css";
import NavBar from "./NavBar";
import { allGamesInfo } from "../../data/allGamesInfo";
import { Routes, Route, useLocation } from "react-router-dom";
import Wishlist from "./Wishlist";

export default function Home() {
  const [input, setInput] = useState("");
  const location = useLocation();

  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
  }
  return (
    <div className="home">
      <NavBar />
      {location.pathname !== "/home/wishlist" && (
        <div className="search-box">
          <div className="search">
            <h2 id="search-title">Find A Game!</h2>
            <input
              id="search-bar"
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Search for games by name, platform, or genre..."
            />
            <button id="search-btn">Search</button>
          </div>
        </div>
      )}
      <Routes>
        <Route path="wishlist" element={<Wishlist />} />
      </Routes>
    </div>
  );
}
