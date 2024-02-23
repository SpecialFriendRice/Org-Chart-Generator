// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Manager extends Employee { //html calls manager in lower case
    constructor(Id, offNum) { //sure that Id needs to go here as well?
        super (Id, Name, 'Manager', Email);

        this.offNum = offNum;
    }

}


//No module.exports?