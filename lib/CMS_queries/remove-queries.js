const inquirer = require("inquirer");
const connection = require("../connection");
require("console.table");

function removeEmployee() {
    connection.query("SELECT * FROM employee", function(err, res){
        if (err) throw err;
        let employees = res.map(({first_name, last_name, id}) => ({
          name: first_name + last_name,
          value: id
        }))
        inquirer.prompt({
            type: "list",
            message: "Which employee would you like to remove?",
            name: "terminate",
            choices: employees,
        }).then((choice) => {
            connection.query("DELETE FROM employee WHERE id = ?", choice.terminate)
            console.log("Employee Removed!")
            connection.end();
        })
    })
};

function removeRole() {
    connection.query(`SELECT r.id, r.title, r.salary, r.department_id, d.name AS department_name
    FROM role AS r
     INNER JOIN department AS d
     ON r.department_id = d.id;`, function(err, res) {
        if (err) throw err;
        let roles = res.map(({id, title, salary, department_id, department_name}) => ({
            name: `${title}  ${salary}  ${department_id}  ${department_name},`,
            value: id
          }))
          inquirer.prompt({
              type: "list",
              message: "What role would you like to remove?",
              name: "remRole",
              choices: roles
          }).then((choice) => {
              connection.query("DELETE FROM role WHERE id = ?", choice.remRole)
              console.log("Role Removed!")
              connection.end();
          })
    })
};

function removeDepartment() {
connection.query("Select * FROM department", function (err, res){
    if (err) throw err
    console.log(res)
    inquirer.prompt({
        type: "list",
        message: "What department would you like to remove?",
        name: "remDept",
        choices: res
    }).then((choice) => {
        connection,query("DELETE FROM department WHERE id = ?", choice.remDept)
        console.log("Department Removed!")
        connection.end();
    })
})
};

module.exports = {
    removeEmployee,
    removeRole,
    removeDepartment
}