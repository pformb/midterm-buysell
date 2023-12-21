const emailExists = function (email) {
const query = "SELECT * FROM users WHERE email = $1 LIMIT 1";
const values = [email];

  return pool
  //[values] creates a nested array and can't pass directly into query
  .query(query, values)
  .then ((result) => {
    return result.rows[0];
  })
  .catch((err) => {
    console.error(err.message)
  });
};

module.exports = {emailExists};
