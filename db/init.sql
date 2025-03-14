-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS electroshop;

-- Use the database
USE electroshop;

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) NOT NULL UNIQUE
);

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  rating DECIMAL(3, 1) NOT NULL,
  image VARCHAR(255) NOT NULL,
  category VARCHAR(36) NOT NULL,
  description TEXT NOT NULL,
  specifications JSON NOT NULL,
  images JSON NOT NULL,
  inStock BOOLEAN NOT NULL DEFAULT TRUE,
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category) REFERENCES categories(id)
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id VARCHAR(36) PRIMARY KEY,
  productId VARCHAR(36) NOT NULL,
  quantity INT NOT NULL DEFAULT 1,
  price DECIMAL(10, 2) NOT NULL,
  userId VARCHAR(36),
  createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (productId) REFERENCES products(id)
);

-- Insert categories data
INSERT INTO categories (id, name, slug) VALUES
('all', 'All Products', 'all'),
('phones', 'Mobile Phones', 'mobile-phones'),
('laptops', 'Laptops', 'laptops'),
('tablets', 'Tablets', 'tablets'),
('accessories', 'Accessories', 'accessories');

-- Insert products data
INSERT INTO products (id, name, price, rating, image, category, description, specifications, images, inStock) VALUES
('1', 'iPhone 13 Pro', 999.99, 4.5, 'https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=400&q=80', 'phones', 'The latest iPhone with pro camera system, A15 Bionic chip, and Super Retina XDR display with ProMotion.', '{"Display": "6.1-inch Super Retina XDR", "Processor": "A15 Bionic chip", "Camera": "Pro 12MP camera system", "Battery": "Up to 22 hours video playback", "Storage": "128GB, 256GB, 512GB, 1TB"}', '["https://images.unsplash.com/photo-1603891128711-11b4b03bb138?w=600&q=80", "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&q=80", "https://images.unsplash.com/photo-1565536421961-1f165e0c981e?w=600&q=80"]', TRUE),
('2', 'MacBook Pro 14"', 1999.99, 4.8, 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&q=80', 'laptops', 'The most powerful MacBook Pro ever is here. With the blazing-fast M1 Pro or M1 Max chip — the first Apple silicon designed for pros.', '{"Display": "14.2-inch Liquid Retina XDR", "Processor": "Apple M1 Pro or M1 Max chip", "Memory": "16GB to 64GB unified memory", "Battery": "Up to 17 hours video playback", "Storage": "512GB to 8TB SSD"}', '["https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600&q=80", "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=600&q=80", "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=600&q=80"]', TRUE),
('3', 'iPad Air', 599.99, 4.6, 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&q=80', 'tablets', 'The iPad Air features a stunning 10.9-inch Liquid Retina display, powerful A14 Bionic chip, and support for Apple Pencil and Magic Keyboard.', '{"Display": "10.9-inch Liquid Retina", "Processor": "A14 Bionic chip", "Camera": "12MP Wide camera", "Battery": "Up to 10 hours", "Storage": "64GB or 256GB"}', '["https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=600&q=80", "https://images.unsplash.com/photo-1557825835-70d97c4aa567?w=600&q=80", "https://images.unsplash.com/photo-1569770218135-bea267ed7e84?w=600&q=80"]', TRUE),
('4', 'AirPods Pro', 249.99, 4.7, 'https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=400&q=80', 'accessories', 'AirPods Pro feature Active Noise Cancellation, Transparency mode, and a customizable fit for all-day comfort.', '{"Audio": "Active Noise Cancellation", "Battery": "Up to 4.5 hours of listening time", "Charging": "Wireless charging case", "Connectivity": "Bluetooth 5.0", "Features": "Sweat and water resistant"}', '["https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=600&q=80", "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=600&q=80", "https://images.unsplash.com/photo-1603351154351-5e2d0600bb77?w=600&q=80"]', TRUE);

-- Insert cart items data
INSERT INTO cart_items (id, productId, quantity, price) VALUES
('1', '1', 1, 999.99),
('2', '2', 1, 1999.99),
('3', '4', 2, 249.99);
