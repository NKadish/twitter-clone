const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getChat,
  getUserById
}) => {

    /* GET chat messages between the logged in user and another user */
    router.get('/:username', (req, res) => {

      // verifies that the user is correct with the cookie.
      // gets the user id from the cookie, which we use to get the username
      jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          getUserById(data.id)
          .then((user) => {
            console.log('hello world')
            console.log(user);
            getChat(user.username, req.params.username)
            .then((chat) => res.json(chat))
            .catch((err) => res.json(err));
          })
          .catch(err => res.json(err));
        }
      })
    });

return router;
};
