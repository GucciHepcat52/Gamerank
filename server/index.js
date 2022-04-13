require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const { createAccount, getUser } = require("../server/controller");

app.use(express.json());
app.use(cors());

// Create new user
app.post("/api/users", createAccount);
// Get user info
app.get("/api/users", getUser);


app.listen(4444, () => console.log(`Server running on port 4444`));
