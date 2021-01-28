DROP DATABASE IF EXISTS hamburger_db;
CREATE DATABASE hamburger_db;
USE hamburger_db;

CREATE TABLE hamburgers (
	id int NOT NULL AUTO_INCREMENT,
	burger_name varchar(255) NOT NULL,
	devoured BOOLEAN DEFAULT false,
	PRIMARY KEY (id)
);