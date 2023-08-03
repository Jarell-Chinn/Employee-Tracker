//
const db = require("db");

function init() {
  // inquier prompt
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
}

function viewAllDept() {
  // db query from departments
  db.query("SELECT * FROM departments", (err, results) => {
    if (err) {
      return console.log(err);
    }
    console.log(results);
  });
}
function viewAllRoles() {
  // db query from roles table
}
function viewAllEmployees() {
  // db query from employees table
}
function addDepartments() {
  // prompt for department name
  //  // make new variable for department name
  // .then db query insert into department value
}
function addRoles() {
  // prompt for role name (text)
  // prompt role salery (int)
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

function quit() {}
