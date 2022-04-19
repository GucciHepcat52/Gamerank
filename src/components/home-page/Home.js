import React, { useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "./Home.css";
import { allGamesInfo } from "../../data/allGamesInfo";
import Results from "./Results";
import NavBar from "./NavBar";
import Wishlist from "./Wishlist";

export default function Home() {
  const [input, setInput] = useState("");
  const [displaySearch, setDisplaySearch] = useState(true);
  const [games, setGames] = useState([]);
  const location = useLocation();
  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function submitHandler() {
    setDisplaySearch(!displaySearch);
    const newInput = input.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
    const list = allGamesInfo.filter((game) =>
      game.game_name
        .replace(/[^a-zA-Z0-9_]/g, "")
        .toLowerCase()
        .includes(newInput)
    );
    // const list = allGamesInfo.filter((game) =>
    //   game.platforms[0]
    //     .replace(/[^a-zA-Z0-9_]/g, "")
    //     .toLowerCase()
    //     .includes(newInput)
    // );
    console.log(list);
    console.log(newInput);
    setGames(list);
    setInput("");
  }

  return (
    <div className="home">
      <NavBar />
      {location.pathname !== "/home/wishlist" && (
        <div className="search-box" id={displaySearch ? null : "hidden"}>
          <div className="search">
            <h2 id="search-title">Find A Game!</h2>
            <input
              id="search-bar"
              type="text"
              value={input}
              onChange={handleChange}
              placeholder="Search for games by name, platform, or genre..."
            />
            <Link to="/home/results">
              <button id="search-btn" onClick={submitHandler}>
                Search
              </button>
            </Link>
          </div>
        </div>
      )}
      <Routes>
        <Route
          path="wishlist"
          element={
            <Wishlist display={displaySearch} setDisplay={setDisplaySearch} />
          }
        />
        <Route
          path="results"
          element={
            <Results display={displaySearch} setDisplay={setDisplaySearch} />
          }
        />
      </Routes>
    </div>
  );
}
