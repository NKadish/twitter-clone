const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getUsers,
  getUserByUsername,
  addUser
}) => {

  /* GET all users, strictly for testing */
  router.get('/', (req, res) => {
    getUsers()
    .then(users => res.json(users));
  });

  /* POST registers a new user */
  router.post('/register', (req, res) => {

    const {
      username,
      password
    } = req.body;

    // Checks to make sure that no one with that username exists 
    getUserByUsername(username)
    .then((name) => {

      if (name) {
        res.status(401).json({error: 'Sorry, a user with this name already exists'});
      } else {

        // Hashes the password before adding it to the database
        const hashedPass = bcrypt.hashSync(password, process.env.SALT_ROUNDS | 0);
        addUser(username, hashedPass)
        .then(user => {
          // Creates a cookie with the jsonwebtoken inside of it
          res.cookie('user', jsonwebtoken.sign({ id: user.id }, process.env.JWT_SECRET), { maxAge: 900000, httpOnly:true});
          res.json('Registered and logged in!');
        });

      }

    }).catch(err => res.json({
      error: err.message
    }));

  });

return router;
};
