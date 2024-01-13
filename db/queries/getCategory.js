const db = require('../connection');

const getCategory = (db) => {
  return db.query('SELECT id, name FROM categories')
    .then(result => result.rows)
    .catch(err => console.error(err));
};

module.exports = { getCategory };
