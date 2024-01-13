const db = require('../connection');

const getOrders = (email) => {
  return db.query(`
    SELECT products.title, products.description, products.price, orders.amount, orders.status
    FROM products
    JOIN orders ON products.id = orders.product_id
    JOIN users ON users.id = orders.user_id
    WHERE users.email = $1
  `, [email])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.error(err.message)
      throw err;
    });
};


module.exports = getOrders;

