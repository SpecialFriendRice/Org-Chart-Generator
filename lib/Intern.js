// TODO: Write code to define and export the Intern class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Intern extends Employee { //html calls intern in lower case
    constructor(id, school) { //sure that Id needs to go here as well?
        super (id, name, email);

        this.school = school;
    }

    getSchool(){
        return this.school;
    }

// STARTER code: In addition to Employee's properties and methods, Intern will also have the following: getRole()—overridden to return 'Intern'
    getRole(){
        return 'Intern'; //should this be in quotes? Capitalised?
    }

}


module.exports = Intern;