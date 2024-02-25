// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee { //html calls engineer in lower case
    constructor(id, name, email, github) { //still not sure what to duplicate with super
        super (id, name, email); 

        this.github = github;
    }

    getGithub(){
        return this.github;
    }

    getRole(){
        return 'Engineer'; 
    }
}


module.exports = Engineer;