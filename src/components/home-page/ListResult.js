import React from "react";
import "./ListItem.css";
import axios from "axios";

export default function ListResult(props) {
  const gameBody = {
    id: window.localStorage.getItem("Gamerank-user"),
    game_name: props.data.game_name,
    image: props.data.image,
    developer: props.data.developer,
    release_date: props.data.release_date,
    description: props.data.description.slice(0, 502) + "...",
    platforms: props.data.platforms,
    genres: props.data.genres,
  };

  async function handleAdd(event) {
    event.preventDefault();
    try {
      await axios.post("/api/wishlist", gameBody).then((res) => {
        console.log(res);
        alert("Game was added successfully!");
      });
    } catch (error) {
      console.log(error);
      console.log(error.response.data);
    }
  }

  return (
    <div className="list-item">
      <img src={gameBody.image} alt="unavailable" />
      <div className="info-box">
        <div className="info">
          <h3 id="game-name">{gameBody.game_name}</h3>
          <p>{gameBody.developer}</p>
          <p>Release Date: {gameBody.release_date}</p>
          <p>{gameBody.description}</p>
        </div>
        <button onClick={handleAdd}>Add to Wishlist</button>
      </div>
    </div>
  );
}
