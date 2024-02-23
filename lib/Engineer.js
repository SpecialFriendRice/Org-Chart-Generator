// TODO: Write code to define and export the Engineer class.  HINT: This class should inherit from Employee.

const Employee = require('./Employee');

class Engineer extends Employee { //html calls engineer in lower case
    constructor(id, github) { //sure that Id needs to go here as well?
        super (id, name, email);

        this.github = github;
    }

    //below function needs writing
    getGithub(){
        
    }

// In addition to Employee's properties and methods, Engineer will also have the following: getRole()—overridden to return 'Engineer'
    getRole(){
        return 'Engineer' //should this be in quotes?
    }
}


//No module.exports?