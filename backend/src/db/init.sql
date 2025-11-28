-- src/db/init.sql
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  orderDescription VARCHAR(100) NOT NULL,
  createdAt TIMESTAMP NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id INT PRIMARY KEY,
  productName VARCHAR(100) NOT NULL,
  productDescription TEXT
);

CREATE TABLE IF NOT EXISTS orderProductMap (
  id SERIAL PRIMARY KEY,
  orderId INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  productId INT NOT NULL REFERENCES products(id)
);

-- seed products
INSERT INTO products (id, productName, productDescription)
VALUES
  (1, 'HP laptop', 'This is HP laptop'),
  (2, 'lenovo laptop', 'This is lenovo'),
  (3, 'Car', 'This is Car'),
  (4, 'Bike', 'This is Bike')
ON CONFLICT (id) DO NOTHING;
