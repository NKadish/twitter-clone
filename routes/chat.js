const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getChat,
  getUserById,
  getUserByUsername,
  newChatMessage
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
            getChat(user.username, req.params.username)
            .then((chat) => {
              if (chat.length === 0) {
                res.status(404).send('404: You either have not sent or received any messages yet, or the person you are looking for does not exist, please try again!')
              } else {
                res.json(chat)
              }
            })
            .catch((err) => res.json(err));
          })
          .catch(err => res.json(err));
        }
      })
    });

    /* POST send a chat message to a user */
    router.post('/:username', (req, res) => {

      // verifies that the user is correct with the cookie.
      // gets the user id from the cookie, which we use to get the username
      jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          
          Promise.all([
            getUserByUsername(req.params.username),
            getUserById(data.id)
          ]).then((all) => {

            // Checks to make sure that the user you are trying to send a message to exists
            if (all[0] === undefined) {
              res.status(404).json('404: The user you want to send a message to does not exist, please try again!');
            } else {
              newChatMessage(all[1].username, all[0].username, req.body.content)
              .then(() => res.json('Message sent!'))
              .catch((err) => res.json(err));
            }
          })

        }
      })
    });

return router;
};
