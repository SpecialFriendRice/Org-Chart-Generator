// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee { //html calls engineer in lower case
    constructor(id, github) { //sure that Id needs to go here as well? Def not name and email?
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