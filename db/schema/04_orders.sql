DROP TABLE IF EXISTS orders CASCADE;
CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users (id),
  product_id INTEGER REFERENCES products (id),
  transaction_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  amount MONEY NOT NULL,
  status VARCHAR(50) DEFAULT 'Pending'
);
