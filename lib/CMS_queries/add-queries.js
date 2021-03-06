const inquirer = require("inquirer");
const connection = require("../connection");
const Class = require("../classes");
require("console.table");

function addEmployee() {
    connection.query("Select * FROM role", function(err, res) {
        if (err) throw err
        let roles = res.map(({id, title}) => ({
            name: title,
            value: id
          }))
        inquirer.prompt([{
            type: "list",
            message: "What is the employee's role?",
            name: "role_id",
            choices: roles
        },
        {
            type: "input",
            message: "What is the employee's first name?",
            name: "first_name"
        },
        {
            type: "input",
            message: "What is the employee's last name?",
            name: "last_name"
        }]        
        ).then((choosen) => {
            let newEmployee = new Class.Employee (choosen.first_name, choosen.last_name, choosen.role_id, choosen.manager_id)
            connection.query("INSERT INTO employee SET ?", newEmployee)
            console.log("Employee Added!")
            connection.end();
        })
    })
};

function addRole() {
    connection.query("Select * FROM department", function (err, res){
        if (err) throw err
        let deptChoices = res.map(({id, name}) => ({
            name: name,
            value: id
          }))
        inquirer.prompt([
            {
                type: "input",
                message: "What is the title for the new role?",
                name: "title"
            },
            {
                type: "number",
                message: "What is the salary?",
                name: "salary"
            },
            {
                type: "list",
                message: "Select the department",
                name: "deptRole",
                choices: deptChoices
            }
        ]).then((choosen) => {
            let newRole = new Class.Position (choosen.title, choosen.salary, choosen.deptRole)
            connection.query("INSERT INTO role SET ?", newRole)
            console.log(newRole)
            connection.end();
        })
    })
};

function  addDepartment() {
    inquirer.prompt({
        type: "input",
        message: "What is the department name?",
        name: "deptName"
    }).then((choosen) => {
        let newDept = choosen.deptName
        connection.query("INSERT INTO department SET ?", newDept)
        console.log("Department Added!")
        connection.end();
    })
};

module.exports = {
    addEmployee,
    addRole,
    addDepartment
}