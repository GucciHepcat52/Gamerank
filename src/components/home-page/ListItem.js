import React from "react";
import "./ListItem.css";

export default function ListItem(props) {
  const description = props.data.description.slice(0, 502) + "...";

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
        <a
          href={props.data.website}
          target="_blank"
          rel="noreferrer noopener"
        >
          Game Website
        </a>
        <button onClick={(e) => props.remove(e, props.data.list_id)}>
          Remove From List
        </button>
      </div>
    </div>
  );
}
