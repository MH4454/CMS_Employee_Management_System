const inquirer = require("inquirer");
const mysql = require("mysql");
const connection = require("./lib/connection");
const {
    viewRoles,
    viewAllEmployees,
    viewAllEmployeesByManager,
    viewAllDepartments,
    viewDepartmentBudget
} = require("./lib/CMS-queries/view-queries");
const {
    updateEmployeeRole,
    updateEmployeeManager
} = require("./lib/CMS-queries/update-queries");
const {
    removeEmployee,
    removeRole,
    removeDepartment
} = require("./lib/CMS-queries/remove-queries");
const {
    addEmployee,
    addRole,
    addDepartment
} = require("./lib/CMS-queries/add-queries")

start()

function start(){
    inquirer.prompt({
        type: "list",
        message: "What would you like to do?",
        name: "mainMenu",
        choices: [
            "View All Roles",
            "View All Employees",
            "View All Employees By Manager",
            "View All Departments",
            "View Department Budget",
            "Update Employee Role",
            "Update Employee Manager",
            "Add Employee",
            "Remove Employee",
            "Add Role",
            "Remove Role",
            "Add Department",
            "Remove Department",
            "Quit"
        ]
    }).then((response) => {
        if (response.mainMenu === "View All Roles") {
            viewRoles();
        } else if (response.mainMenu === "View All Employees") {
            viewAllEmployees();
        } else if (response.mainMenu === "View All Employees By Manager") {
            viewAllEmployeesByManager();
        } else if (response.mainMenu === "View All Departments") {
            viewAllDepartments();
        } else if (response.mainMenu === "View Department Budget") {
            viewDepartmentBudget();
        } else if (response.mainMenu === "Update Employee Role") {
            updateEmployeeRole();
        } else if (response.mainMenu === "Update Employee Manager") {
            updateEmployeeManager();
        } else if (response.mainMenu === "Add Employee") {
            addEmployee();
        } else if (response.mainMenu === "Remove Employee") {
            removeEmployee();
        } else if (response.mainMenu === "Add Role") {
            addRole();
        } else if (response.mainMenu === "Remove Role") {
            removeRole();
        }  else if (response.mainMenu === "Add Department") {
            addDepartment();
        } else if (response.mainMenu === "Remove Department") {
            removeDepartment();
        } else {
            connection.end();
        }
    })
}