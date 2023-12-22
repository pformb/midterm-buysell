DROP TABLE IF EXISTS products CASCADE;
CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  thumbnail VARCHAR(255),
  additional_photo VARCHAR(255),
  price MONEY NOT NULL,
  quantity INTEGER NOT NULL,
  category_id INTEGER,
  user_id INTEGER REFERENCES users (id),
  date_posted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50) DEFAULT 'Available'
);
