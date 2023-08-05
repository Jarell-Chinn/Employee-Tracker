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
  db.query("SELECT * FROM departments", (error, departments) => {
    if (error) {
      console.error("Cannot get departments", error);
      return;
    }
    const departmentChoices = departments.map((department) => ({
      name: department.department_name,
      value: department.id,
    }));

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
        {
          type: "list",
          name: "departmentId",
          message: "Which department will this role be in?",
          choices: departmentChoices,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO roles (title, salary, department_id) VALUES ('${data.newRole}', '${data.salary}', '${data.departmentId}')`
        );
      });
  });

  // db query departments
  // prompt for which department (list)
  // db query roles insert new role
}
function addEmployees() {
  // db query roles
  db.query("SELECT * FROM roles", (error, roles) => {
    if (error) {
      console.error("error getting roles:", error);
      return;
    }

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    // query employees for managers
    db.query(
      "SELECT id, first_name, last_name FROM employees",
      (error, employees) => {
        if (error) {
          console.error("Error fetching employees:", error);
          return;
        }

        const employeeChoices = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));
        // PROMPT
        inquirer
          .prompt([
            {
              // first name (text)
              type: "input",
              name: "firstName",
              message: "What is the employee's first name?",
            },
            {
              // last name (text)
              type: "input",
              name: "lastName",
              message: "What is the employee's last name?",
            },
            {
              // role (list)
              type: "list",
              name: "roleId",
              message: "Select the employee's role:",
              choices: roleChoices,
            },
            {
              // manager (list)
              type: "list",
              name: "managerId",
              message: "Select the employee's manager:",
              choices: [
                { name: "None", value: null }, // incase of no manager
                ...employeeChoices,
              ],
            },
          ])
          .then((data) => {
            const firstName = data.firstName;
            const lastName = data.lastName;
            const roleId = data.roleId;
            const managerId = data.managerId;

            //database query to insert the new employee with the role and manager
            db.query(
              `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${firstName}', '${lastName}', ${roleId}, ${managerId})`,
              (error, result) => {
                if (error) {
                  console.error("Error adding employee:", error);
                } else {
                  console.log("New employee added");
                }
              }
            );
          });
      }
    );
  });
}
function updateEmployeeRole() {
  // getting role list
  db.query("SELECT * FROM roles", (error, roles) => {
    if (error) {
      console.error("Error getting roles:", error);
      return;
    }

    const roleChoices = roles.map((role) => ({
      name: role.title,
      value: role.id,
    }));

    // query to get the list of employees for the managers
    db.query(
      "SELECT id, first_name, last_name FROM employees",
      (error, employees) => {
        if (error) {
          console.error("Error fetching employees:", error);
          return;
        }
        const employeeChoices = employees.map((employee) => ({
          name: `${employee.first_name} ${employee.last_name}`,
          value: employee.id,
        }));

        inquirer
          .prompt([
            {
              type: "list",
              name: "employeeId",
              message: "Select the employee whose role you want to update:",
              choices: employeeChoices,
            },
            {
              type: "list",
              name: "roleId",
              message: "Select the employee's new role:",
              choices: roleChoices,
            },
          ])
          .then((data) => {
            const employeeId = data.employeeId;
            const roleId = data.roleId;

            // query to update the employee's role
            db.query(
              `UPDATE employees SET role_id = ${roleId} WHERE id = ${employeeId}`,
              (error, result) => {
                if (error) {
                  console.error("Error updating employee role:", error);
                } else {
                  console.log("Employee role updated successfully!");
                }
              }
            );
          });
      }
    );
  });
}

function quit() {
  return console.log("Have a nice day!");
}
