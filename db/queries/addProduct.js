const db = require('../connection');

const addProduct = function (product, db) {
  // Destructuring product object properties, removing `id` and `date_posted`
  const {
    title,
    description,
    thumbnail,
    additional_photo,
    price,
    quantity,
    category_id,
    user_id,
    status
  } = product;

  // Using db to execute a SQL query to insert a new product into the 'products' table
  return db
    .query(
      `INSERT INTO products (title, description, thumbnail,
      additional_photo, price, quantity, category_id, user_id, status) VALUES ($1, $2, $3,
      $4, $5, $6, $7, $8, $9) RETURNING *`,
      [
        title,
        description,
        thumbnail,
        additional_photo,
        price,
        quantity,
        category_id,
        user_id,
        status
      ]
    )
    .then((result) => {
      // Returning the newly inserted product object, including the auto-generated ID
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};

module.exports = { addProduct };
