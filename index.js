//
const db = require("./config/connection");
const inquirer = require("inquirer");

const questions = ["What would you like to do?"];
const options = [
  "View departments",
  "View roles",
  "View employees",
  "Add Department",
  "Add roles",
  "Add employee",
  "Update employee",
  "Leave",
];

function init() {
  inquirer
    .prompt([
      {
        type: "list",
        name: "select",
        message: questions[0],
        choices: options,
      },
    ])
    .then((data) => {
      const selection = data.select;
      console.log(selection);

      switch (selection) {
        case "View departments":
          viewAllDept();
          break;
        case "View roles":
          viewAllRoles();
          break;
        case "View employees":
          viewAllEmployees();
          break;
        case "Add Department":
          addDepartments();
          break;
        case "Add roles":
          addRoles();
          break;
        case "Add employee":
          addEmployees();
          break;
        case "Update employee":
          updateEmployeeRole();
          break;
        case "Leave":
          quit();
          break;
        default:
          console.log("Invalid selection.");
      }
    });
}
//   if (selection === "Leave") {
//     quit();
//   } else if (selection === "View Departments") {
//     viewAllDept();
//   }
// });
// options
// VIEW
// departments
// roles
// employees
//   ADD
// departments
// roles
// employees
// update employee role

init();

function viewAllDept() {
  // db query from departments

  db.query("SELECT * FROM departments", (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.log(results);
  });
  return;
}
function viewAllRoles() {
  // db query from roles table
  db.query("SELECT * FROM roles", (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.log(results);
  });
  return;
}
function viewAllEmployees() {
  // db query from employees table
  db.query("SELECT * FROM employees", (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.log(results);
  });
  return;
}
function addDepartments() {
  // prompt for department name
  inquirer
    .prompt([
      {
        type: "input",
        name: "newDepartment",
        message: "What is the new Department called?",
      },
    ])
    .then((data) => {
      db.query(`INSERT INTO departments (department_name) VALUES
    ('${data.newDepartment}')`);
    });
  //  // make new variable for department name
  // .then db query insert into department value
}
function addRoles() {
  // prompt for role name (text)
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRole",
        message: "What is the new Role called?",
      },
      // prompt role salery (int)
      {
        type: "number",
        name: "salary",
        message: "What is the salary",
      },
    ])
    .then((data) => {});

  // db query departments
  // prompt for which department (list)
  // db query roles insert new role
}
function addEmployees() {
  // PROMPT
  // first name (text)
  // last name (text)
  // db query roles
  // role (list)
  // query employees for managers
  // manager (list)
  // db query  employees insert new employee
}
function updateEmployeeRole() {
  // PROMPT
  //  Which employee (list)
  //
  // db query  employees seach employee id
}

function quit() {
  return console.log("Have a nice day!");
}
