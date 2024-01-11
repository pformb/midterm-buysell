const db = require("../connection");

const userExists = function (id) {
  const query = "SELECT * FROM users WHERE id = $1 LIMIT 1";
  const values = [id];

    return db
    //[values] creates a nested array and can't pass directly into query
    .query(query, values)
    .then ((result) => {
      return result.rows[0];
      //optional boolean results.rows.length > 0
    })
    .catch((err) => {
      console.error(err.message)
    });
  };

  module.exports = {userExists};
