-- DROP DATABASE IF EXISTS bamazon_DB; 

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products (
item_id INT(5) NOT NULL AUTO_INCREMENT PRIMARY KEY,
product_name VARCHAR(100) NOT NULL,
department_name VARCHAR(100) NOT NULL,
price DECIMAL(10,2) NOT NULL,
stock_quantity INT(20) NOT NULL
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Nintendo Switch", "Video Games", 299.00, 100),
		("Mario Party", "Video Games", 49.95, 30),
        ("iPad Air", "Electronics", 499.00, 50),
        ("Fossil Watch", "Fashion", 249.95, 10),
        ("Chelsea Boots", "Fashion", 79.99, 20),
        ("6 Pack Socks", "Fashion", 19.99, 50),
        ("Funko Pop! Pikachu", "Toys & Games", 10.99, 50),
        ("Funko Pop! Goku", "Toys & Games", 10.99, 5),
        ("Airpods", "Electronics", 199.00, 10),
        ("Wallet", "Handbags & Accessories", 21.00, 30);
        