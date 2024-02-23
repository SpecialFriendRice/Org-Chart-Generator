// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Intern extends Employee { //html calls intern in lower case
    constructor(Id, school) { //sure that Id needs to go here as well?
        super (Id, Name, 'Intern', Email);

        this.school = school;
    }

}


//No module.exports?