import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

export default function Wishlist(props) {
  const [data, setData] = useState([]);
  console.log(data);

  useEffect(() => {
    const id = window.localStorage.getItem("Gamerank-user");
    const fetchData = async () => {
      const res = await axios.get(`/api/wishlist?id=${id}`);
      setData(res.data);
    };

    fetchData().catch(console.error);
  }, []);

  function handleHomeClick() {
    props.setDisplay(true);
  }

  return (
    <div className="wishlist">
      <Link to="/home" id="back-home">
        <button onClick={handleHomeClick}>Back to home</button>
      </Link>
      <div className="header">
        <h1>Your Wishlist</h1>
        <h3>Items in list: {data.length}</h3>
      </div>
      {data.map((game) => {
        return <ListItem data={game} key={game.list_id} />;
      })}
    </div>
  );
}
