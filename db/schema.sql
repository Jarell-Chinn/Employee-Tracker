DROP DATABASE IF EXISTS department_db;
CREATE DATABASE department_db;

USE department_db



-- - `department`

CREATE TABLE departments (
    --   - `id`: `INT PRIMARY KEY`
--   - `name`: `VARCHAR(30)` to hold department name
)

CREATE TABLE roles (
--   - `id`: `INT PRIMARY KEY`

--   - `title`: `VARCHAR(30)` to hold role title

--   - `salary`: `DECIMAL` to hold role salary

--   - `department_id`: `INT` to hold reference to department role belongs to

)

CREATE TABLE employees (
--   - `id`: `INT PRIMARY KEY`

--   - `first_name`: `VARCHAR(30)` to hold employee first name

--   - `last_name`: `VARCHAR(30)` to hold employee last name

--   - `role_id`: `INT` to hold reference to employee role

--   - `manager_id`: `INT` to hold reference to another employee that is the manager of the current employee (`null` if the employee has no manager) foreign Key
)



-- NOTE you can self reference a foreign key