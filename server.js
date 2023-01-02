const inquirer = require('inquirer');
const cTable = require('console.table');
const mysql = require('mysql2');
// require dotenv pkg and configure as early as possible
require('dotenv').config();