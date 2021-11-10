CREATE DATABASE gamingo_db;

USE gamingo_db;

CREATE TABLE payment_types(
id_payment_type INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id_payment_type)
);

CREATE TABLE user_types(
id_typeUser INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id_typeUser)
);

CREATE TABLE categorys(
id_category INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
PRIMARY KEY (id_category)
);

CREATE TABLE users(
id_user INT NOT NULL AUTO_INCREMENT,
firstname VARCHAR(100) NOT NULL,
lastname VARCHAR(100) NOT NULL,
email VARCHAR(100) NOT NULL UNIQUE,
password VARCHAR(100) NOT NULL,
user_image VARCHAR(100) NOT NULL,
id_typeUser INT NOT NULL,
PRIMARY KEY (id_user),
FOREIGN KEY (id_typeUser) REFERENCES user_types(id_typeUser)
);

CREATE TABLE tickets(
id_ticket INT NOT NULL AUTO_INCREMENT,
date DATE NOT NULL,
id_payment_type INT NOT NULL,
total INT NOT NULL,
id_user INT NOT NULL,
PRIMARY KEY (id_ticket),
FOREIGN KEY (id_payment_type) REFERENCES payment_types(id_payment_type),
FOREIGN KEY (id_user) REFERENCES users(id_user)
);

CREATE TABLE products(
id_product INT NOT NULL AUTO_INCREMENT,
name VARCHAR(100) NOT NULL,
id_category INT NOT NULL,
price INT NOT NULL,
description VARCHAR(300) NOT NULL,
product_image VARCHAR(100) NOT NULL,
discount INT NOT NULL,
stock INT NOT NULL,
PRIMARY KEY (id_product),
FOREIGN KEY (id_category) REFERENCES categorys(id_category) 
);

CREATE TABLE sales(
id_sale INT NOT NULL AUTO_INCREMENT,
id_ticket INT NOT NULL,
id_product INT NOT NULL,
quantity INT NOT NULL,
subtotal INT NOT NULL,
PRIMARY KEY (id_sale),
FOREIGN KEY (id_ticket) REFERENCES  tickets(id_ticket),
FOREIGN KEY (id_product) REFERENCES products(id_product)
);

-- DROP TABLE sales;