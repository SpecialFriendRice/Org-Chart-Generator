// TODO: Write code to define and export the Employee class

class Employee {
    constructor (id, name, email) { 
        this.id = id;
        this.name = name;
        this.email = email; 
    }

    getName(){
        return this.name;
    }


    getId(){
        return this.id;
    }

    getEmail(){
        return this.email
    }

    getRole(){
        return 'Employee';
    }

}

//temporary code for testing functions
// const newbie = new Employee(7, "Solomon", "solomon@temple.com");
// console.log(newbie.getName());

module.exports = Employee;