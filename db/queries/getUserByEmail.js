//changed '' to "". Please note will cause syntax error if used in PSQL queries
const db = require('../connection');

const getUserByEmail = function (email) {
  return db
  .query("SELECT * FROM users WHERE email = $1 LIMIT 1", [email])
  .then ((result) => {
    console.log(result.rows[0]);
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err.message)
    throw err;
  });
};

module.exports = {getUserByEmail};
