DROP TABLE IF EXISTS histories CASCADE;
CREATE TABLE histories (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users (id),
  order_id INTEGER REFERENCES orders (id)
);
