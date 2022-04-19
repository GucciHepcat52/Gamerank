import React from "react";
import "./Results.css";
import { Link } from "react-router-dom";

export default function Results(props) {

  function handleHomeClick() {
    props.setDisplay(!props.display)
  }

  return (
    <div className="results-div">
      <Link to="/home" id="back-home">
        <button onClick={handleHomeClick}>Back to home</button>
      </Link>
      <div className="header">
        <h1>Your Results</h1>
        <h3>Items in list: 2</h3>
      </div>
    </div>
  );
}
