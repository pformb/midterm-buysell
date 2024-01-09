const getAllProducts = function (options, limit = 10) {
  // Initialize an array to store parameter values for the SQL query.
  const queryParams = [];
  // Initialize the main part of the SQL query, including the SELECT statement and the JOIN clause.
  let queryString = `
    SELECT products.*,
    FROM products
    LEFT JOIN categories ON products.category_id = categories.id
    GROUP BY products.id
    ORDER BY products.date_posted
    LIMIT $1;
  `;

  // CONDITION, filter products by category.
  if (options.category) {
    // Push category value with wildcard matching to queryParams array
    queryParams.push(`%${options.category}%`);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` category LIKE $${queryParams.length} `;
  }

  // CONDITION, filter products by price range.
  if (options.minimum_price && options.maximum_price) {
    // Push minimum and maximum price values (converted to cents) to queryParams array
    queryParams.push(options.minimum_price * 100, options.maximum_price * 100);
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
    // Push minimum price value (converted to cents) to queryParams array
    queryParams.push(options.minimum_price * 100);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` price >= $${queryParams.length} `;
  } else if (options.maximum_price) {
    // Push maximum price value (converted to cents) to queryParams array
    queryParams.push(options.maximum_price * 100);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` price <= $${queryParams.length} `;
  }

  // CONDITION, filter products by quantity.
  if (options.quantity) {
    // Push category value with wildcard matching to queryParams array
    queryParams.push(`%${options.quantity}%`);
    // Add "AND" or "WHERE" clause based on whether other conditions have been added
    if (queryParams.length > 1) {
      queryString += " AND";
    } else {
      queryString += " WHERE";
    }
    queryString += ` quantity LIKE $${queryParams.length} `;
  }

  // Add ORDER BY and LIMIT clauses to complete the query.
  queryParams.push(limit);
  queryString += `
    ORDER BY price
    LIMIT $${queryParams.length};
  `;

  // Execute the query using the pool object and return the result rows.
  return pool.query(queryString, queryParams).then((res) => res.rows);
};
