const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//Cut and paste from README "Call the render function (provided for you) and pass in an array containing all employee objects; The render function will generate and return a block of HTML including templated divs for each employee"
//HTML itself is already laid out in page-template.js, which is pulled in below. The module.exports from page-template is a function that returns an object which is a string of html; as the function is anonymous, it can be called anything when it's imported into another file, hence 'render' here
const render = require("./src/page-template.js");


//STARTER CODE The two path module methods 'resolve' and 'join' are used to where dictate where the resulting html file should go: into a directory called output. 
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

//Function to create output directory if one does not exist already, and write the html string (= 'render') to a file called team.html within it
function createHtmlFile(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      } else {
        fs.writeFileSync(outputPath, render) //definitely use outputPath, not 'team.html'? Is render already a string?? Would it need to go in backticks??
      }  
};

//NOTE in node.js documentation, if statements are wrapped in a try/catch as per below example. Should I do this? 
// try {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//       fs.mkdirSync(OUTPUT_DIR);
//     }
//   } catch (err) {
//     console.error(err);
//   }

// TODO: as per README "Write code in index.js that uses inquirer to gather information about the development team members and creates objects for each team member using the correct classes as blueprints..."When a user decides to finish building their team then they exit the application, and the HTML is generated" (rendered).

//Creating objects from classes for each team member:
//Declare an empty array for team and push in each object (team member) as they are created (in a .then?) or in a separate function afterwards?
let team = [];

//CHECK if below is the correct syntax for properties:
// const newManager = new Manager (Manager.id, Manager.name, Manager.email, Manager.officeNumber);
// team.push(newManager);


//Async keyword and need for await is still not clear

async function createMgr() {
    return inquirer
      .prompt([
        {
            type: 'input',
            name: 'name',  //not distinguish as mgrName?
            message: 'Enter name of Team Manager',
        },
    
        {
            type: 'input',
            name: 'id', //not distinguish as mgrId?
            message: 'Enter Employee ID of Manager',
        },

        {
            type: 'input',
            name: 'email', //not distinguish as mgrEmail?
            message: 'Enter email address of Manager',
            //haven't specified format e.g. @fakemail.com
        },

        {
            type: 'input',
            name: 'officeNumber',
            message: 'Enter office number of Manager',
            
        },
    ]).then (Manager => { //is Manager the correct argument here? 
        const newManager = new Manager (Manager.name, Manager.id, Manager.email, Manager.officeNumber);
        team.push(newManager);
        offerChoice();
    })
};


    //offerChoice() below was originally a function within a function.
    // Do I need ASYNC/AWAIT? e.g. await inquirer? Should I use a switch statement inside a while loop?

        function offerChoice() {
            const nextStep = inquirer //not sure of function and constant names yet!
            .prompt([
                {
                    type: 'list',
                    name: 'choiceStep',
                    message: 'What would you like to do next?',
                    choices: ['Add Engineer', 'Add Intern', 'Finish and create org chart'],
                },

            ]).then(nextStep => { 

            if (nextStep.choiceStep === 'Add Engineer') { //was wondering if I needed to refer to choices[index]
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',  //not distinguish as engName?
                        message: 'Enter name of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'id',  //not distinguish as engId?
                        message: 'Enter Employee ID of Engineer',    
                    },
                    
                    {
                        type: 'input',
                        name: 'email',  //not distinguish as engEmail?
                        message: 'Enter email address of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'github',  //capitalisation?
                        message: 'Enter GitHub username of Engineer',    
                    }

                ]).then (Engineer => { //is Engineer the correct argument here? 
                const newEngineer = new Engineer (Engineer.name, Engineer.id, Engineer.email, Engineer.github);
                team.push(newEngineer);
                offerChoice();

               });
                
            } else if (nextStep.choiceStep === 'Add Intern') { //was wondering if I needed to refer to choices[index]
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',  //not distinguish as intName?
                        message: 'Enter name of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'id',  //not distinguish as intId?
                        message: 'Enter Employee ID of Intern',    
                    },
                    
                    {
                        type: 'input',
                        name: 'email',  //not distinguish as intEmail?
                        message: 'Enter email address of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'school', 
                        message: 'Enter name of school or university loaning Intern',    
                    },

                ]).then (Intern => { //is Intern the correct argument here?
                    const newIntern = new Intern (Intern.name, Intern.id, Intern.email, Intern.school);
                    team.push(newIntern);
                    offerChoice();
                 });

            } else { 
                //return/break/exit? 
                console.log("Your org chart will now be generated");
                createHtmlFile(render(team));
                 
            }
            
        });
        }
        createMgr();
    

     


    //is the below now all redundant?
    //Code to render the html: 
    //in place of 'data' do I need 'team' or 'render' (in which format?) or both/neither? Do I render(team)? 
    // function createHtmlFile(data) { 

    //     const OUTPUT_DIR = path.resolve(__dirname, "output");
    //     const outputPath = path.join(OUTPUT_DIR, "team.html");
       
    //    try {
    //     if (!fs.existsSync(OUTPUT_DIR)) {
    //       fs.mkdirSync(OUTPUT_DIR);
    //     }
    //   } catch (err) {
    //     console.error(err);
    //   }

    //   fs.writeFile(outputPath, data, err =>{
    //     if (err) {
    //         console.error("This is your error writing to file:", err);
    //     } else {
    //         console.log("Your data has been written to:", outputPath);
    //     }
    //   }); 
    // }
