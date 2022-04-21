require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const {
  createAccount,
  getUser,
  getWishlist,
  addGame,
  deleteGame,
} = require("../server/controller");

app.use(express.json());
app.use(cors());

// Create new user
app.post("/api/users", createAccount);
// Get user info
app.get("/api/users", getUser);
// Get wishlist info
app.get("/api/wishlist", getWishlist);
// Add game to wishlist
app.post("/api/wishlist", addGame);
// Delete game from wishlist
app.delete("/api/wishlist/:id", deleteGame);

app.listen(4444, () => console.log(`Server running on port 4444`));
