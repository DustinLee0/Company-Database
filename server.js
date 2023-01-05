const inquirer = require('inquirer');
const table = require('console.table');
const mysql = require('mysql2');
// require dotenv pkg and configure as early as possible
require('dotenv').config();

//establish connection to mysql server
const connection = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'company_db'
  },
  console.log('Connected to company_db database.')
);

const initialize = () => {
  inquirer
    .prompt([
      {
        type: 'list',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'Add a Department', 'View all Roles', 'Add a Role', 'View all Employees', 'Add an Employee', 'Update an Employee'],
        name: 'choice'
      }
    ]).then((response) => {
      console.log(response);
      const { choice } = response;

      switch (choice) {
        case 'View all Departments':
          viewDepartments();

          break;

        case 'View all Roles':
          viewRoles();

          break;
        case 'View all Employees':

          break;
      }

    })
}

// start app
initialize();

const viewDepartments = () => {
  connection.query('SELECT * FROM departments', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
  })
}

const viewRoles = () => {
  connection.query('SELECT roles.id, roles.title, departments.department AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id;', (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
  })
}