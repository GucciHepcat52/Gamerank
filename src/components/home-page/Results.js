import React from "react";
import "./Results.css";
import { Link } from "react-router-dom";
import ListResult from "./ListResult";

export default function Results(props) {
  function handleHomeClick() {
    props.setDisplay(!props.display);
  }

  return (
    <div className="results-div">
      <Link to="/home" id="back-home">
        <button onClick={handleHomeClick}>Back to home</button>
      </Link>
      <div className="header">
        <h1>Your Results</h1>
        <h3>Items in list: {props.games.length}</h3>
      </div>
      {props.games.map((game) => {
        return <ListResult data={game} key={game.game_name} />;
      })}
    </div>
  );
}
