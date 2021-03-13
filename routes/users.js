var express = require('express');
var router = express.Router();

module.exports = ({
  getUsers
}) => {


  router.get('/', (req, res) => {
    getUsers()
    .then(users => res.json(users));
  });

return router;
};
