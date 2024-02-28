const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//HTML itself is already laid out in page-template.js, which is pulled in below. The module.exports from page-template is a function that returns an object which is a string of html; as the function is anonymous, it can be called anything when it's imported into another file, hence 'render' here
const render = require("./src/page-template.js");
let team = [];

//STARTER CODE The two path module methods 'resolve' and 'join' are used to where dictate where the resulting html file should go: into a directory called output. 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Function to create output directory if one does not exist already, and write the html string (= 'render') to a file called team.html within it
function createHtmlFile(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      } else {
        fs.writeFileSync(outputPath, render(team));
      }  
};



async function createMgr() {
    return inquirer
      .prompt([
        {
            type: 'input',
            name: 'name', 
            message: 'Enter name of Team Manager',
        },
    
        {
            type: 'input',
            name: 'id', 
            message: 'Enter Employee ID of Manager',
        },

        {
            type: 'input',
            name: 'email', 
            message: 'Enter email address of Manager',
           
        },

        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter office number of Manager',
            
        },

    ]).then (ManagerData => { 
        const newManager = new Manager (ManagerData.id, ManagerData.name, ManagerData.email, ManagerData.officeNumber);
        team.push(newManager);
        offerChoice();
    })
};

//New function, the start of which becomes the loop each time a new employee is generated.

        function offerChoice() {
            const nextStep = inquirer 
            .prompt([
                {
                    type: 'list',
                    name: 'choiceStep',
                    message: 'What would you like to do next?',
                    choices: ['Add Engineer', 'Add Intern', 'Finish and create org chart'],
                },

            ]).then(nextStep => { 

            if (nextStep.choiceStep === 'Add Engineer') { 
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',  
                        message: 'Enter name of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'id',  
                        message: 'Enter Employee ID of Engineer',    
                    },
                    
                    {
                        type: 'input',
                        name: 'email',  
                        message: 'Enter email address of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'github',  
                        message: 'Enter GitHub username of Engineer',    
                    }

                ]).then (EngineerData => {
                const newEngineer = new Engineer (EngineerData.id, EngineerData.name, EngineerData.email, EngineerData.github);
                team.push(newEngineer);
                offerChoice();

               });
                
            } else if (nextStep.choiceStep === 'Add Intern') {
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name', 
                        message: 'Enter name of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'id',  
                        message: 'Enter Employee ID of Intern',    
                    },
                    
                    {
                        type: 'input',
                        name: 'email', 
                        message: 'Enter email address of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'school', 
                        message: 'Enter name of school or university loaning Intern',    
                    },

                ]).then (InternData => { 
                    const newIntern = new Intern (InternData.id, InternData.name, InternData.email, InternData.school);
                    team.push(newIntern);
                    offerChoice();
                 });

            } else { 
                console.log("Your org chart will now be generated");
                createHtmlFile();
                 
            }
            
        });
        }
        //offerChoice();
        createMgr();
    

     


    