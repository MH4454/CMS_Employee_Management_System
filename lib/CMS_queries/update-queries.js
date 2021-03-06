const inquirer = require("inquirer");
const connection = require("../connection");
require("console.table");

function updateEmployeeRole() {
    return connection.query(`SELECT * FROM employee`,(err, res) => {
        if (err) throw err;
        let employees = res.map(({first_name, last_name, role_id}) => ({
            name: first_name + last_name,
            value: role_id
          }));
        inquirer.prompt([{
            type: "list",
            message: "Select the employee",
            name: "role_id",
            choices: employees
          }
        ]).then((employeeChoice) => {
            console.log(employeeChoice)
            employeeChoice = employeeChoice
            connection.query("SELECT * FROM role",(err, res) => {
                if (err) throw err;
                const roles = res.map(({title, id}) => ({
                    name: title,
                    value: id
                }));
                inquirer.prompt({
                    type: "list",
                    message: "Select the employee's new role.",
                    name: "newRole",
                    choices: roles
                }).then(
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [newRole.newRole , employeeChoice.role_id],
                    function(err, res) {
                    if (err) throw err;
                    console.table(res)
                    connection.end();
                }))
            

        })
    })   
})
}




















// async function updateEmployeeRole() {
    
//     const roleChoices = await getRoles();
//     console.log(roleChoices, "I am roleChoices!")
//     const employeeChoices = await getEmployees();
//     console.log(connection.query.employees)
    
//     inquirer.prompt([{
//         type: "list",
//         message: "Select the employee",
//         name: "role_id",
//         choices: employeeChoices
//       },
//       {
//           type: "list",
//           message: "What is the employee's new role?",
//           name: "new_role",
//           choices: roleChoices
//       }]).then((new_role, employee) => {
//           console.log(new_role, employee)
//         connection.query("UPDATE employee SET role_id = ? WHERE id = ?;", [role ,employee.role_id],
//         function(err, res) {
//           if (err) throw err;
//           console.table(res)
//           connection.end();
//       })
//       });
// }

// function getRoles() {
//     return connection.query("SELECT * FROM role",(err, res) => {
//         if (err) throw err;
//         const roles = res.map(({title, id}) => ({
//             name: title,
//             value: id
//         }));
//         inquirer.prompt({
//             type: "list",
//             message: "What role would you like to update?",
//             name: "newRole",
//             choices: roles
//         })
//         return roles
//     })
    
// }

// function getEmployees() {
//     return connection.query(`SELECT * FROM employee`,(err, res) => {
//         if (err) throw err;
//         let employees = res.map(({first_name, last_name, role_id}) => ({
//             name: first_name + last_name,
//             value: role_id
//           }));
//           console.log(employees, "I am employees")
//           return employees
    
//     })
    
// }

module.exports = {
    updateEmployeeRole
}