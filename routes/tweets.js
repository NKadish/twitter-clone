const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getTweets,
  createTweet,
  getTweetsByUsername,
  getTweetById
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
    .then(tweets => {

      // Error handling for when the user does not exist 
      if (tweets === undefined) {
        res.sendStatus(404);
      } else {
        res.json(tweets);
      }
    })
    .catch(err => res.json(err));
  });

  /* GET tweets by id */
  router.get('/tweet/:tweetId', (req, res) => {
    getTweetById(req.params.tweetId)
    .then(tweet => {

      // Error handling for when the tweet does not exist
      if (tweet === undefined) {
        res.sendStatus(404);
      } else {
        res.json(tweet);
      }

    })
    .catch(err => res.json(err));
  });

return router;
};
