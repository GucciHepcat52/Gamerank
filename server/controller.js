require("dotenv").config();
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
  getUser: async (req, res) => {
    const { username, password } = req.query;
    let userTmp;

    await sequelize
      .query(
        `
      SELECT user_id, username, password
      FROM users
      WHERE username = '${username}';
    `
      )
      .then((dbRes) => {
        if (dbRes[0].length > 0) {
          userTmp = dbRes[0];
          console.log(`${userTmp[0].user_id}`);
        }
      })
      .catch((error) => {
        console.log(error);
        res.status(400).send("Username is invalid");
      });

    try {
      const verified = bcrypt.compareSync(password, userTmp[0].password);

      if (verified) {
        delete userTmp[0].password;
        res.status(200).send(userTmp);
      } else {
        res.status(400).send("Wrong password");
      }
    } catch (error) {
      res.status(400).send(error);
    }
  },
  getWishlist: async (req, res) => {
    const { id } = req.query;
    await sequelize
      .query(
        `
      SELECT * FROM wishlist
      WHERE user_id = ${id};
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((error) => res.status(400).send(error));
  },
  addGame: (req, res) => {
    const {
      id,
      game_name,
      image,
      developer,
      release_date,
      description,
      platforms,
      genres,
      website
    } = req.body;
    const newDescription = description.replace(/["']/g, "");
    const newPlatforms = JSON.stringify(platforms)
      .replace(/\[/g, "{")
      .replace(/]/g, "}");
    const newGenres = JSON.stringify(genres)
      .replace(/\[/g, "{")
      .replace(/]/g, "}");

    sequelize
      .query(
        `
      INSERT INTO wishlist
      (user_id, game_name, image, developer, release_date, description, platforms, genres, website)
      VALUES
      (${id}, '${game_name}', '${image}', '${developer}', '${release_date}', '${newDescription}', '${newPlatforms}', '${newGenres}', '${website}');
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((error) => console.log(error));
  },
  deleteGame: async (req, res) => {
    const { id } = req.params;
    await sequelize
      .query(
        `
      DELETE FROM wishlist
      WHERE list_id = ${id}

      RETURNING *;
    `
      )
      .then((dbRes) => res.status(200).send(dbRes[0]))
      .catch((error) => console.log(error));
  },
};
