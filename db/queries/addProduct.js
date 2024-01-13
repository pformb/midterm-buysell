const addProduct = function (product) {
  // Destructuring product object properties
  const {
    id,
    title,
    description,
    thumbnail,
    additional_photo,
    price,
    quantity,
    category_id,
    user_id,
    date_posted,
    status,
  } = product;

  // Using db to execute a SQL query to insert a new product into the 'product' table
  return db
    .query(
      `INSERT INTO products (id, title, description, thumbnail,
     additional_photo, price, quantity, category_id, user_id, date_posted, status) VALUES ($1, $2, $3,
     $4, $5, $6, $7, $8, $9, $10, $11) RETURNING *`,
      [
        id,
        title,
        description,
        thumbnail,
        additional_photo,
        price,
        quantity,
        category_id,
        user_id,
        date_posted,
        status,
      ]
    )
    .then((result) => {
      // Returning the newly inserted user object, including the auto-generated ID
      return result.rows[0];
    })
    .catch((err) => {
      // Handling any errors that might occur during the database query
      console.error(err.message);
    });
};
