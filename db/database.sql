CREATE DATABASE IF NOT EXISTS companydb;

USE companydb;

CREATE TABLE employee (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) DEFAULT NULL,
    salary INT(5) DEFAULT NULL,
    PRIMARY KEY (id)
);

DESCRIBE employee;

INSERT INTO employee VALUES
(1, 'Joe', 1000),
(2, 'Henry', 2000),
(3, 'Sam', 2500),
(4, 'Max', 1050)


CREATE TABLE user (
    id INT(11) NOT NULL AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL,
    surname VARCHAR(45) NOT NULL,
    nick VARCHAR(45) NOT NULL,
    password TEXT NOT NULL,
    email VARCHAR(45) NOT NULL,
    role VARCHAR(20) DEFAULT "role_user", 
    image VARCHAR(100) DEFAULT "default.png",
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP ,
    PRIMARY KEY (id)
);

DESCRIBE user;