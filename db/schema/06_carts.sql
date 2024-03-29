DROP TABLE IF EXISTS carts CASCADE;
CREATE TABLE carts (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users (id),
  product_id INTEGER REFERENCES products (id),
  quantity INTEGER NOT NULL
);
