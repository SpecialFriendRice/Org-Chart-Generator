// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee { //html calls engineer in lower case
    constructor(Id, gitHub) { //sure that Id needs to go here as well?
        super (Id, Name, 'Engineer', Email);

        this.gitHub = gitHub;
    }

}


//No module.exports?