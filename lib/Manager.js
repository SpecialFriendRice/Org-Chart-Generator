// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee { 
    constructor(id, name, email, officeNumber) { 
        
        super (id, name, email);

        this.officeNumber = officeNumber;
    }

    //any reason getOfficeNumber below is not specified in the README?
    getOfficeNumber(){
        return this.officeNumber;
    }

    getRole(){
        return 'Manager'; 
    }

}


module.exports = Manager;