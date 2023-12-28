const getAllProducts = function (limit = 10) {
  return pool
    .query(
      `SELECT products.id, products.title, products.description, products.thumbnail, products.additional_photo, products.price, products.quantity
      FROM products
      GROUP BY products.id
      ORDER BY products.date_posted
      LIMIT $1;`,
      [limit]
    )
    .then((result) => {
      // Assuming user IDs are unique, so we only expect one result
      return result.rows;
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
      throw err; // Re-throw the error to handle it in the calling code
    });
};
