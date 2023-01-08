INSERT INTO departments (department)
VALUES  ('Sales'),
        ('Engineering'),
        ('Finance'),
        ('Legal');

INSERT INTO roles (title, salary, department_id)
VALUES      ('Sales Lead', 1000000, 1),
            ('Salesperson', 80000, 1),
            ('Lead Engineer', 150000, 2),
            ('Software Engineer', 120000, 2),
            ('Accountant Manager', 160000, 3),
            ('Accountant', 125000, 3),
            ('Legal Team Lead', 250000, 4),
            ('Lawyer', 190000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES  ('Anthony', 'Reagan', 5, null),
        ('Elaine', 'Marshall', 6, 5),
        ('Artie', 'Adams', 1, null),
        ('Beth', 'Rus', 2, 1),
        ('Spongebob', 'Squarepants', 4, 3),
        ('Patrick', 'Star', 3, null),
        ('Walter', 'White', 7, null),
        ('Hank', 'Schrader', 8, 7),
        ('John', 'Doe', 2, 1),
        ('Bob', 'Smith', 4, 3);
