const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//path is a core node module, as is fs; inquirer is now installed
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file. NOTE the HTML is already laid out in file ./src/page-template.js

//Rough prompt layout using Inquirer, wrapped in a function
function promptUser() {
    return inquirer
      .prompt([
        {
            type: 'input',
            name: 'firstname',
            message: 'Please enter your first name',
        },
    
        {
            type: 'input',
            name: 'lastname',
            message: 'Please enter your last name',
        },
    
        {
            type: 'list',
            name: 'jobtitle',
            message: 'What is your job title?',
            choices: ['Manager', 'Engineer', 'Intern'],
    
        },
       
        {
            type: 'input',
            name: 'github',
            message: 'Please enter your GitHub username',
        },
    
        {
            type: 'input',
            name: 'email',
            message: 'Please enter your email address',
        },
      ]);
    }



    //An EMPLOYEE class and three subclasses (Manager, Engineer, Intern) need to be coded in their own separate js files, in the lib directory

    // Each person needs their name and email address from prompt
    // Each person needs to choose job title from list of three: Manager, Engineer and Intern
    // Manager will be asked for their office number
    // Engineer will be asked for their GitHub username
    // Intern will be asked for their school/Uni
    // ID is autogenerated for each person