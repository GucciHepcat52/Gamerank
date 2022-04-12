require("dotenv").config();
const path = require("path");
const bcrypt = require("bcryptjs");
const Sequelize = require("sequelize");
const { CONNECTION_STRING } = process.env;

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = {
  createAccount: (req, res) => {
    const { firstName, lastName, username, email, password } = req.body;
    let salt = bcrypt.genSaltSync(5);
    const passwordHash = bcrypt.hashSync(password, salt);

    sequelize
      .query(
        `
            SELECT username FROM users
            WHERE username = '${username}';
        `
      )
      .then((dbRes) => {
        if (dbRes[0].length === 0) {
          sequelize
            .query(
              `
          INSERT INTO users
          (first_name, last_name, username, email, password)
          VALUES
          ('${firstName}', '${lastName}', '${username}', '${email}', '${passwordHash}');
          `
            )
            .then((dbRes) => {
              res.status(200).send(dbRes[0]);
            });
        } else {
          res.status(500).send("Username Unavailable");
        }
      })
      .catch((error) => console.log(error));
  },
};
