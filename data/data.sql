USE gamingo_db;

INSERT INTO categories (name) VALUES ('XBOX ONE');
INSERT INTO categories (name) VALUES ('XBOX 360');
INSERT INTO categories (name) VALUES ('SWITCH');
INSERT INTO categories (name) VALUES ('PLAY 4');
INSERT INTO categories (name) VALUES ('PLAY 5');

INSERT INTO payment_types (name) VALUES ('PAYPAL');
INSERT INTO payment_types (name) VALUES ('TARJETA DE DEBITO');
INSERT INTO payment_types (name) VALUES ('TARJETA DE CREDITO');
INSERT INTO payment_types (name) VALUES ('PAGO EN OXXO');

INSERT INTO user_types (name) VALUES ('MASTER');
INSERT INTO user_types (name) VALUES ('ADMIN');
INSERT INTO user_types (name) VALUES ('CLIENTE');

INSERT INTO users (firstname, lastname, email, password, id_typeUser, user_image) VALUES ('Gamingo', 'Master', 'gamingo@hotmail.com', '$2a$10$1mMcSDuMHtdHvPT2NEiIQO1QjW9Fm1e1WnHG65Xh4dLUUp8YPBTT.', '1', 'user.png');
INSERT INTO users (firstname, lastname, email, password, id_typeUser, user_image) VALUES ('Christian', 'Gomez', 'christian@hotmail.com', '$2a$10$1mMcSDuMHtdHvPT2NEiIQO1QjW9Fm1e1WnHG65Xh4dLUUp8YPBTT.', '2', 'user.png');
INSERT INTO users (firstname, lastname, email, password, id_typeUser, user_image) VALUES ('Ana', 'Hernandez', 'ana@hotmail.com', '$2a$10$1mMcSDuMHtdHvPT2NEiIQO1QjW9Fm1e1WnHG65Xh4dLUUp8YPBTT.', '3', 'user.png');

INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Luigi Mansion 3', 3, 800, 'Videojuego Luigi Mansion 3a Edicion para Nintendo Switch 2021 lorem ipsum lorem ipsum xd xd', 'default-image.png', 50, 1);
INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Luigi Mansion 3', 4, 500, 'Videojuego Generico lorem ipsum xd Videojuego Generico lorem ipsum xd Videojuego Generico lorem ipsum xd', 'default-image.png', 10, 2);
INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Luigi Mansion 3', 5, 1000, 'Videojuego Generico lorem ipsum xd Videojuego Generico lorem ipsum xd Videojuego Generico lorem ipsum xd', 'default-image.png', 0, 3);
INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Halo 3 New Edition', 1, 1200, 'Videojuego Halo 3, nueva edicion etcetera, Videojuego Halo 3, nueva edicion etcetera Videojuego Halo 3, nueva edicion etcetera Videojuego Halo 3, nueva edicion etcetera', 'default-image.png', 0, 4);
INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Midnight Club 3', 2, 1600, 'Juego de Midnight club 3 remix, etcetera, xd lorem ipsum, Juego de Midnight club 3 remix, etcetera, xd lorem ipsum, Juego de Midnight club 3 remix, etcetera, xd lorem ipsum, Juego de Midnight club 3 remix, etcetera, xd lorem ipsum', 'default-image.png', 50, 5);
INSERT INTO products (name, id_category, price, description, product_image, discount, stock) VALUES ('Mortal Kombat 11', 1, 900, 'Videojuego de peleas mortales y artes marciales con superpoderes y nosequemas xd, Videojuego de peleas mortales y artes marciales con superpoderes y nosequemas xd', 'default-image.png', 10, 6);

INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-01', 1, '800', '3');
INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-02', 2, '500', '3');
INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-03', 3, '1000', '3');
INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-04', 4, '1200', '3');
INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-05', 1, '800', '3');
INSERT INTO tickets (date, id_payment_type, total, id_user) VALUES ('2021-11-06', 2, '4660', '3');

INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (1, 1, 2, 800);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (2, 2, 1, 500);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (3, 3, 1, 1000);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (4, 4, 1, 1200);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (5, 5, 1, 800);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 1, 1, 400);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 2, 1, 450);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 3, 1, 1000);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 4, 1, 1200);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 5, 1, 800);
INSERT INTO sales (id_ticket, id_product, quantity, subtotal) VALUES (6, 6, 1, 810);