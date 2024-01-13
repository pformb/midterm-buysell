const getAllProductsFilter = function (db, options = {}, limit = 9) {
  const queryParams = [];
  let queryString = `
    SELECT products.*
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
  `;

  // Filter products by category
  if (options.category) {
    queryParams.push(`%${options.category}%`);
    queryString += ` WHERE categories.name LIKE $${queryParams.length} `;
  }
  // CONDITION, filter products by price range.
  if (options.minimum_price && options.maximum_price) {
    // Push minimum and maximum price values (converted to cents) to queryParams array
    queryParams.push(options.minimum_price, options.maximum_price);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 2) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` price BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    } `;
  } else if (options.minimum_price) {
    // Push minimum price value to queryParams array
    queryParams.push(options.minimum_price);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` price >= $${queryParams.length} `;
  } else if (options.maximum_price) {
    // Push maximum price value to queryParams array
    queryParams.push(options.maximum_price);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` price <= $${queryParams.length} `;
  }

  // CONDITION, filter products by quantity range.
  if (options.minimum_quantity && options.maximum_quantity) {
    // Push minimum and maximum price values (converted to cents) to queryParams array
    queryParams.push(options.minimum_quantity, options.maximum_quantity);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 2) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` quantity BETWEEN $${queryParams.length - 1} AND $${
      queryParams.length
    } `;
  } else if (options.minimum_quantity) {
    // Push minimum quantity value to queryParams array
    queryParams.push(options.minimum_quantity);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` quantity >= $${queryParams.length} `;
  } else if (options.maximum_quantity) {
    // Push maximum quantity value to queryParams array
    queryParams.push(options.maximum_quantity);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` quantity <= $${queryParams.length} `;
  }

  queryParams.push(limit);

  queryString += `
    GROUP BY products.id
    ORDER BY products.date_posted
    LIMIT $${queryParams.length};
  `;
  console.log(`queryString:`, queryString);
  console.log(`queryParams:`, queryParams);

  return db.query(queryString, queryParams).then((res) => res.rows);
};

module.exports = { getAllProductsFilter };

