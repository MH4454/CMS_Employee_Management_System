class Employee {
    constructor (first_name, last_name, role_id, manager_id) {
        this.first_name = first_name,
        this.last_name = last_name,
        this.role_id = role_id,
        this.manager_id = manager_id
    }
}

class Position {
    constructor (title, salary, department_id) {
        this.title = title,
        this.salary = salary,
        this.department_id = department_id
    }
}

class Department {
    constructor (name){
        this.name = name
    }
}

module.exports = {
    Employee : Employee,
    Position : Position,
    Department : Department
}