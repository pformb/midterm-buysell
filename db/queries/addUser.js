
const db = require('../connection');

const addUser = (db, user) => {
  return db.query(`
    INSERT INTO users (first_name, last_name, email, password)
    VALUES ($1, $2, $3, $4)
    RETURNING *;
  `, [user.firstName, user.lastName, user.email, user.password])
    .then((data) => {
      const user = data.rows[0];
      return user;
    })
    .catch((err) => {
      return err;
    });
}

module.exports = { addUser };
