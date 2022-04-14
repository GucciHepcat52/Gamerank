import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import ListItem from "./ListItem";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const id = window.localStorage.getItem("Gamerank-user");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(`/api/wishlist?id=${id}`);
      setData(res.data);
    };

    fetchData().catch(console.error);
  }, [id]);

  return (
    <div className="wishlist">
      <Link to="/home" id="back-home">
        <h3>Back to homepage</h3>
      </Link>
      <div className="header">
        <h1>Your Wishlist</h1>
        <h3>Items in list: {data.length}</h3>
      </div>
      <ListItem data={data} />
    </div>
  );
}
