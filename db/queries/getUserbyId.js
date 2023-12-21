const db = require('../connection');

// Function to retrieve a user based on their ID using the buy/sell database
const getUserById = (id) => {
  return pool
    .query("SELECT * FROM users WHERE id = $1 LIMIT 1", [id])
    .then((result) => {
      // IDs are unique, so we only expect one result
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

module.exports = { getUserById };

