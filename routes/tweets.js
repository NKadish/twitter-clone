const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getTweets,
  createTweet,
  getTweetsByUsername
}) => {

  /* GET all tweets */
  router.get('/', (req, res) => {
    getTweets()
    .then(tweets => res.json(tweets));
  });

  /* POST a new tweet */
  router.post('/new', (req, res) => {

    // verifies that the user is correct with the cookie.
    // gets the user id from the cookie for use in the create tweet
    jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        console.log(data);
        createTweet(data.id, req.body.content)
        .then(() => {
          res.json('Tweet submitted successfully!')
        })
        .catch(err => res.json(err));
      }
    })

  });

  /* GET tweets by user */
  router.get('/:userName', (req, res) => {
    getTweetsByUsername(req.params.userName)
    .then(tweets => res.json(tweets));
  });

  /* GET tweets by id */
  router.get('/', (req, res) => {
    getTweets()
    .then(tweets => res.json(tweets));
  });

return router;
};
