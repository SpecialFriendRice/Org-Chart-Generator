// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee { //html calls manager in lower case
    constructor(id, name, email, officeNumber) { //still not sure what to duplicate with super
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