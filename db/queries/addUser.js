
const db = require('../connection');

const addUser = function (user) {

  return db
    .query(`INSERT INTO users (username, first_name, last_name, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING *;`, [user.username, user.firstName, user.lastName, user.email, user.password])
    .then((results) => {
      return results.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

module.exports = { addUser };
