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

//start app when app is called
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

      const { choice } = response;

      switch (choice) {
        case 'View all Departments':
          viewDepartments();
          break;

        case 'View all Roles':
          viewRoles();
          break;

        case 'View all Employees':
          viewEmployees();
          break;

        case 'Add a Department':
          addDepartment();
          break;

        case 'Add a Role':
          addRole();
          break;

        case 'Add an Employee':
          addEmployee();
          break;

        case 'Update an Employee':
          updateEmployee();
          break;

      }

    })
}

// start app
initialize();

// VIEW
const viewDepartments = () => {
  connection.query('SELECT * FROM departments', (err, data) => {
    if (err) throw err;
    console.log('Departments: ');
    console.table(data);
    initialize();
  })
}

const viewRoles = () => {
  connection.query('SELECT roles.id, roles.title, departments.department AS department, roles.salary FROM roles JOIN departments ON roles.department_id = departments.id;', (err, data) => {
    if (err) throw err;
    console.log('Roles: ');
    console.table(data);
    initialize();
  })
}

const viewEmployees = () => {
  connection.query('SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department, roles.salary, employees.manager_id FROM employees JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id ORDER BY employees.id;', (err, data) => {
    if (err) throw err;
    console.log('Employees: ');
    console.table(data);
    initialize();
  })
}

// ADD
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: 'Enter the department name.',
        name: 'department'
      },
    ]).then((choice) => {
      connection.query('INSERT INTO departments (department) VALUES (?)', choice.department, (err, data) => {
        if (err) throw err;
        console.log(`Added ${choice.department} to database.`);
        initialize();
      })
    })
}

const addRole = () => {
  //read data from department table to use for choices
  connection.query('SELECT * FROM departments', (err, data) => {
    if (err) throw err;
    //declare variable to store list of department names
    const departments = [];

    // store list of department names
    data.forEach((element) => {
      departments.push(element.department);
    })

    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter the name of the role',
          name: 'role'
        },
        {
          type: 'input',
          message: 'Enter the starting salary of the role',
          name: 'salary'
        },
        {
          type: 'list',
          message: 'Which department does the role belong to?',
          choices: departments,
          name: 'department'
        }
      ]).then((choice) => {
        let departmentID = departments.indexOf(choice.department) + 1;
        // console.log(departmentID);
        connection.query('INSERT INTO roles (title, department_id, salary) VALUES (?, ?, ?)', [choice.role, departmentID, choice.salary], (err, data) => {
          if (err) throw err;
          console.log(`Added ${choice.role} to database.`);
          initialize();
        })
      })
  })
}

const addEmployee = () => {
  //get data from roles table to use for choices
  connection.query('SELECT title FROM roles', (err, data) => {
    if (err) throw err;
    //declare variable to store list of role names
    const roles = [];

    // store list of role names
    data.forEach((title) => {
      roles.push(title.title);
    })
    console.log(roles);

    inquirer
      .prompt([
        {
          type: 'input',
          message: 'Enter the employee\'s first name.',
          name: 'fName'
        },
        {
          type: 'input',
          message: 'Enter the employee\'s last name.',
          name: 'lName'
        },
        {
          type: 'list',
          message: 'What is the employee\'s role?',
          choices: roles,
          name: 'empRole'
        },
        {
          type: 'list',
          message: 'Who is the employee\'s manager?',
          choices: ['hello', 'there'],
          name: 'manager'
        }
      ]).then((choice) => {
        console.log(choice);
        let roleID = roles.indexOf(choice.empRole) + 1;
        console.log(roleID);
        // connection.query('INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', choice.fName, choice.lName, roleID, , (err, data) => {
        // if (err) throw err;
        // console.log(`Added ${choice.department} to database.`);
        // initialize();
        // })
      })
  })
}

const updateEmployee = () => {
  //read employee data
  connection.query('SELECT first_name, last_name FROM employees', (err, data) => {
    if (err) throw err;
    const employees = [];

    data.forEach((employee) => {
      employees.push(`${employee.first_name} ` + `${employee.last_name}`);
    })

    //read role data
    connection.query('SELECT title FROM roles', (err, data) => {
      if (err) throw err;
      const roles = [];

      data.forEach((title) => {
        roles.push(title.title);
      })

      inquirer
        .prompt([
          {
            type: 'list',
            message: 'Which employee\'s role do you want to update?',
            choices: employees,
            name: 'employee'
          },
          {
            type: 'list',
            message: 'Which role do you want to assign the selected employee?',
            choices: roles,
            name: 'role'
          },
        ]).then((choice) => {
          console.log(choice);
          let employee = choice.employee.split(' ');
          let roleID = roles.indexOf(choice.role) + 1;

          connection.query('UPDATE employees SET role_id = ? WHERE first_name = ?', [roleID, employee[0]], (err, data) => {
            if (err) throw err;
            console.log(`Updated ${choice.employee}'s role to ${choice.role}`);
            initialize();
          })
        })
    })
  })
}