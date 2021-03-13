module.exports = (db) => {
  const getUsers = () => {
    const query = {
      text: 'SELECT * FROM users',
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };
  
  const getUserByUsername = username => {
    const query = {
        text: `SELECT * FROM users WHERE username = $1`,
        values: [username]
    }

    return db
      .query(query)
      .then(result => result.rows[0])
      .catch((err) => err);
  };

  const addUser = (username, password) => {
    const query = {
      text: `INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *` ,
      values: [username, password]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const deleteUser = (username) => {
    const query = {
      text: `DELETE FROM users WHERE username = $1` ,
      values: [username]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getTweets = () => {
    const query = {
      text: `SELECT tweets.id, users.username AS username, tweets.content, tweets.created_at 
      FROM tweets
      JOIN users ON tweets.user_id = users.id`,
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getTweetsByUsername = (username) => {
    const query = {
      text: `SELECT tweets.id, users.username AS username, tweets.content, tweets.created_at 
      FROM tweets
      JOIN users ON tweets.user_id = users.id
      WHERE username = $1`,
      values: [username]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const getTweetById = (tweetId) => {
    const query = {
      text: `SELECT tweets.id, users.username AS username, tweets.content, tweets.created_at 
      FROM tweets
      JOIN users ON tweets.user_id = users.id
      WHERE tweets.id = $1`,
      values: [tweetId]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  const createTweet = (userId, content) => {
    const query = {
      text: `INSERT INTO tweets (user_id, content) VALUES ($1, $2) RETURNING *` ,
      values: [userId, content]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  return {
    getUsers,
    getUserByUsername,
    addUser,
    deleteUser,
    getTweets,
    getTweetsByUsername,
    getTweetById,
    createTweet
  };
};