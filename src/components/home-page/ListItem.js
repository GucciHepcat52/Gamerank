import React from "react";
import "./ListItem.css";

export default function ListItem(props) {
  const description = props.data.description.slice(0, 502) + "...";
  return (
    <div className="list-item">
      <img
        src="https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg"
        alt="game-pic"
      />
      <div className="info-box">
        <div className="info">
          <h3 id="game-name">{props.data.game_name}</h3>
          <p>{props.data.developer}</p>
          <p>Release Date: {props.data.release_date}</p>
          <p>{description}</p>
        </div>
        <button>Remove From List</button>
      </div>
    </div>
  );
}
