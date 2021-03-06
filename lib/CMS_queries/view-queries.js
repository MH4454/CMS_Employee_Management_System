const inquirer = require("inquirer");
const Choices = require("inquirer/lib/objects/choices");
const connection = require("../connection");
require("console.table");



function viewRoles() {
    connection.query("SELECT * FROM role", function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }

  function viewAllEmployees() {
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
      console.table(res);
      connection.end();
    });
  }

  function viewAllEmployeesByManager() {
    connection.query(`SELECT role_id, first_name, last_name, manager_id
    FROM employee
    WHERE manager_id IS NOT NULL
    `, function (err, res) {
        if (err) throw err;
        let managers = res.map(({first_name, last_name, manager_id}) => ({
          name: first_name + last_name,
          value: manager_id
        }))

        inquirer.prompt({
          type: "list",
          message: "Select the Manager",
          name: "id",
          choices: managers
        },
        {}).then((manager) => {
          connection.query("SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;", [manager.id],
          function(err, res) {
            if (err) throw err;
            console.table(res)
            connection.end();
        })
        })
    })
  }

  function viewAllDepartments() {
      connection.query("SELECT * FROM department", function (err, res) {
          if (err) throw err;
          console.table(res)
          connection.end();
      })
  }

  function viewDepartmentBudget() {
      connection.query(`SELECT department.id, department.name, SUM(role.salary) AS utilized_budget 
      FROM department LEFT JOIN role ON role.department_id = department.id 
      LEFT JOIN employee ON employee.role_id = role.id GROUP BY department.id, department.name;`,
      function (err, res) {
        if (err) throw err;
          console.table(res)
          connection.end();
      })
  }

  module.exports = {
      viewRoles,
      viewAllEmployees,
      viewAllEmployeesByManager,
      viewAllDepartments,
      viewDepartmentBudget
  }