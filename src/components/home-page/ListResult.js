import React from "react";
import "./ListItem.css";

export default function ListResult(props) {
    const description = props.data.description.slice(0, 502) + "...";

    return (
        <div className="list-item">
      <img
        src={props.data.image}
        alt="unavailable"
      />
      <div className="info-box">
        <div className="info">
          <h3 id="game-name">{props.data.game_name}</h3>
          <p>{props.data.developer}</p>
          <p>Release Date: {props.data.release_date}</p>
          <p>{description}</p>
        </div>
        <button>Add to Wishlist</button>
      </div>
    </div>
    )
}