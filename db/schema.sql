DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE departments (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    department VARCHAR(30) NOT NULL
);

CREATE TABLE roles (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    department_id INT,
    salary DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES departments(id)
    ON DELETE SET NULL
);

CREATE TABLE employees (
    id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    FOREIGN KEY (role_id)
    REFERENCES roles(id)
    ON DELETE SET NULL
);

SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;