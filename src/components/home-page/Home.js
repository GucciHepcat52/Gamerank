import React from "react";
import "./Home.css";
import NavBar from "./NavBar";
import SearchPage from "./SearchPage";
// import Wishlist from "./Wishlist";

export default function Home() {
  return (
    <div className="home">
      <NavBar />
      <SearchPage />
    </div>
  );
}
