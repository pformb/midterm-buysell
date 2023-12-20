//changed '' to "". Please note will cause syntax error if used in PSQL queries
const getUserByEmail = function (email) {
  return pool
  .query("SELECT * FROM users WHERE email = $LIMIT 1", [email])
  .then ((result) => {
    return result.rows[0];
  })
  .catc((err) => {
    console.error(err.message)
  });
};

module.exports = {getUserByEmail};
