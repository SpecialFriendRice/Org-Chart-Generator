// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee { //html calls manager in lower case
    constructor(id, officeNumber) { //sure that Id needs to go here as well? Def not name and email?
        super (id, name, email);

        this.officeNumber = officeNumber;
    }

// In addition to Employee's properties and methods, Manager will also have the following: getRole()—overridden to return 'Manager'
    getRole(){
        return 'Manager'; 
    }

}


module.exports = Manager;