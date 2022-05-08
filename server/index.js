require("dotenv").config();
const express = require("express");
const cors = require("cors");
// const path = require("path");
const PORT = 4444;
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
// app.use(express.static(path.resolve(__dirname, "../build")));

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

// app.get("/*", function (req, res) {
//   res.sendFile(path.join(__dirname, "../build", "index.html"));
// });

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
