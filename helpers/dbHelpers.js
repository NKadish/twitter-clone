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

  const getUserById = userId => {
    const query = {
        text: `SELECT * FROM users WHERE id = $1`,
        values: [userId]
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
      text: `SELECT tweets.id, tweets.user_id AS user_id, users.username AS username, tweets.content, tweets.created_at, tweets.updated_at 
      FROM tweets
      JOIN users ON tweets.user_id = users.id`,
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTweetsByUsername = (username) => {
    const query = {
      text: `SELECT tweets.id, tweets.user_id AS user_id, users.username AS username, tweets.content, tweets.created_at, tweets.updated_at 
      FROM tweets
      JOIN users ON tweets.user_id = users.id
      WHERE username = $1`,
      values: [username]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const getTweetById = (tweetId) => {
    const query = {
      text: `SELECT tweets.id, tweets.user_id AS user_id, users.username AS username, tweets.content, tweets.created_at, tweets.updated_at 
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

  const updateTweet = (tweetId, content) => {
    const query = {
      text: `UPDATE tweets 
      SET content = $2, updated_at = NOW() 
      WHERE id = $1` ,
      values: [tweetId, content]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const deleteTweet = (tweetId) => {
    const query = {
      text: `DELETE FROM tweets WHERE id = $1` ,
      values: [tweetId]
    };

    return db.query(query)
      .then(result => result.rows[0])
      .catch(err => err);
  };

  const getChat = (currentUser, otherUser) => {
    const query = {
      text: `SELECT sender, receiver, content, sent_at
      FROM chat
      WHERE (sender = $1 AND receiver = $2) OR (sender = $2 AND receiver = $1)`,
      values: [currentUser, otherUser]
    };

    return db
      .query(query)
      .then((result) => result.rows)
      .catch((err) => err);
  };

  const newChatMessage = (currentUser, otherUser, content) => {
    const query = {
      text: `INSERT INTO chat (sender, receiver, content) VALUES ($1, $2, $3) RETURNING *`,
      values: [currentUser, otherUser, content]
    };

    return db
      .query(query)
      .then((result) => result.rows[0])
      .catch((err) => err);
  };

  return {
    getUsers,
    getUserByUsername,
    getUserById,
    addUser,
    deleteUser,
    getTweets,
    getTweetsByUsername,
    getTweetById,
    createTweet,
    updateTweet,
    deleteTweet,
    getChat,
    newChatMessage
  };
};