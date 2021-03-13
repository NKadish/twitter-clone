const express = require('express');
const router = express.Router();

module.exports = ({
  getTweets
}) => {

  /* GET all tweets */
  router.get('/', (req, res) => {
    getTweets()
    .then(tweets => res.json(tweets));
  });

return router;
};
