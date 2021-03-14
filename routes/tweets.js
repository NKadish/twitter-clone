const express = require('express');
const router = express.Router();
const jsonwebtoken = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');

module.exports = ({
  getTweets,
  createTweet,
  getTweetsByUsername,
  getTweetById,
  updateTweet,
  deleteTweet
}) => {

  /* GET all tweets */
  router.get('/', (req, res) => {
    getTweets()
    .then(tweets => res.json(tweets));
  });

  /* POST a new tweet */
  router.post('/', (req, res) => {

    // verifies that the user is correct with the cookie.
    // gets the user id from the cookie for use in the create tweet
    jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        createTweet(data.id, req.body.content)
        .then(() => {
          res.json('Tweet submitted successfully!')
        })
        .catch(err => res.json(err));
      }
    })

  });

  /* PUT update a tweet */
  router.put('/:tweetId', (req, res) => {

    // verifies that the user is correct with the cookie.
    // gets the user id from the cookie to make sure that the user owns the tweet they want to update
    jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        res.sendStatus(403);
      } else {
        getTweetById(req.params.tweetId)
        .then((tweet) => {
          // Checks to make sure the tweet exists
          if (tweet === undefined) {
            res.sendStatus(404);
          // Checks to make sure that the tweet is actually theirs 
          } else if (data.id !== tweet.user_id) {
            res.sendStatus(403);
          } else {
            updateTweet(req.params.tweetId, req.body.content)
            .then(() => res.json('Tweet successfully updated!'))
            .catch((err) => res.jsob(err));
          }
        })
        .catch(err => res.json(err));
      }
    })

  });

    /* DELETE a tweet */
    router.delete('/:tweetId', (req, res) => {

      // verifies that the user is correct with the cookie.
      // gets the user id from the cookie to make sure that the user owns the tweet they want to update
      jsonwebtoken.verify(req.cookies.user, process.env.JWT_SECRET, (err, data) => {
        if (err) {
          res.sendStatus(403);
        } else {
          getTweetById(req.params.tweetId)
          .then((tweet) => {
            // Checks to make sure the tweet exists
            if (tweet === undefined) {
              res.sendStatus(404);
            // Checks to make sure that the tweet is actually theirs 
            } else if (data.id !== tweet.user_id) {
              res.sendStatus(403);
            } else {
              deleteTweet(req.params.tweetId)
              .then(() => res.json('Tweet successfully deleted!'))
              .catch((err) => res.jsob(err));
            }
          })
          .catch(err => res.json(err));
        }
      })
  
    });

    /* GET tweets by id */
    router.get('/:tweetId', (req, res) => {
      getTweetById(req.params.tweetId)
      .then(tweet => {
  
        // Error handling for when the tweet does not exist
        if (tweet === undefined) {
          res.status(404).send('404: Tweet not found');
        } else {
          res.json(tweet);
        }
  
      })
      .catch(err => res.json(err));
    });

return router;
};
