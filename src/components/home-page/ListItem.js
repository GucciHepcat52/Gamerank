import React from "react";
import "./ListItem.css";

export default function ListItem(props) {
  const description = props.data.description.slice(0, 502) + "...";

  function removeGame(event) {
    event.preventDefault();
    console.log('clicked')
  }

  return (
    <div className="list-item">
      <img src={props.data.image} alt="game-pic" />
      <div className="info-box">
        <div className="info">
          <h3 id="game-name">{props.data.game_name}</h3>
          <p>{props.data.developer}</p>
          <p>Release Date: {props.data.release_date}</p>
          <p>{description}</p>
        </div>
        <button onClick={removeGame}>Remove From List</button>
      </div>
    </div>
  );
}
