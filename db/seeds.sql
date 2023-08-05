INSERT INTO departments (department_name) VALUES
    ('Human Resources'),
    ('Finance'),
    ('Marketing'),
    ('Operations');

-- Seed data for the roles table
INSERT INTO roles (title, salary, department_id) VALUES
    ('HR Manager', 60000, 1),
    ('HR Specialist', 45000, 1),
    ('Finance Manager', 75000, 2),
    ('Finance Analyst', 55000, 2),
    ('Marketing Manager', 65000.00, 3),
    ('Marketing Coordinator', 40000, 3),
    ('Operations Manager', 70000, 4),
    ('Operations Associate', 50000, 4);

-- Seed data for the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
    ('Damien', 'Hernandez', 1, NULL),
    ('Nathan', 'Iskander', 2, 1), 
    ('Michael', 'Scott', 3, NULL), 
    ('Jim', 'Halpert', 4, 3),
    ('Jonah', 'Everett', 5, NULL), 
    ('Squidward', 'Tentacles', 6, 5),
    ('Jarell', 'Chinn', 7, NULL),
    ('Mr', 'Clean', 8, 7);


