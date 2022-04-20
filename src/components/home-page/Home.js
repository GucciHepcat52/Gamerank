import React, { useState } from "react";
import { Routes, Route, useLocation, Link } from "react-router-dom";
import "./Home.css";
import { allGamesInfo } from "../../data/allGamesInfo";
import Results from "./Results";
import NavBar from "./NavBar";
import Wishlist from "./Wishlist";

export default function Home() {
  const [input, setInput] = useState({
    game: "",
    platform: "",
    genre: "",
  });
  const [displaySearch, setDisplaySearch] = useState(true);
  const [games, setGames] = useState([]);
  const location = useLocation();

  function handleChange(event) {
    const { name, value } = event.target;
    setInput((prevInput) => {
      return {
        ...prevInput,
        [name]: value,
      };
    });
  }

  function submitHandler() {
    setDisplaySearch(!displaySearch);

    if (input.game.length > 0 && input.platform.length === 0 && input.genre.length === 0) {
      const newInput = input.game.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
      const gameList = allGamesInfo.filter((game) =>
        game.game_name
          .replace(/[^a-zA-Z0-9_]/g, "")
          .toLowerCase()
          .includes(newInput)
      );
      setGames(gameList);
    } else if (input.platform.length > 0 && input.game.length === 0 && input.genre.length === 0) {
      const newInput = input.platform.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
      const platformList = allGamesInfo.filter((game) => {
        const valid = game.platforms.filter((platform) => platform.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase().includes(newInput));
        if (valid.length > 0) {
          return game;
        }
      })
      setGames(platformList);
    } else {
      const newInput = input.genre.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase();
      const genreList = allGamesInfo.filter((game) => {
        const valid = game.genres.filter((genre) => genre.replace(/[^a-zA-Z0-9_]/g, "").toLowerCase().includes(newInput));
        if (valid.length > 0) {
          return game;
        }
      })
      setGames(genreList)
    }
    console.log(games)
    setInput({
      game: "",
      platform: "",
      genre: "",
    });
  }

  return (
    <div className="home">
      <NavBar />
      {location.pathname !== "/home/wishlist" && (
        <div className="search-box" id={displaySearch ? null : "hidden"}>
          <div className="search">
            <h2 id="search-title">Find A Game!</h2>
            <div className="search-div">
              <input
                id="search-bar"
                type="text"
                name="game"
                value={input.game}
                onChange={handleChange}
                placeholder="Search for games by name"
              />
              <input
                id="search-bar"
                type="text"
                name="platform"
                value={input.platform}
                onChange={handleChange}
                placeholder="Search for games by platform"
              />
              <input
                id="search-bar"
                type="text"
                name="genre"
                value={input.genre}
                onChange={handleChange}
                placeholder="Search for games by genre"
              />
            </div>
            <Link to="/home/results">
              <button id="search-btn" onClick={submitHandler}>
                Search
              </button>
            </Link>
            <p>*Input only one of the three</p>
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
            <Results
              display={displaySearch}
              setDisplay={setDisplaySearch}
              games={games}
            />
          }
        />
      </Routes>
    </div>
  );
}
