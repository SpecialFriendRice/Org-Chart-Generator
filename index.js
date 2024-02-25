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
//WHERE SHALL I CALL THE FUNCTION?
function createHtmlFile(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      } else {
        fs.writeFileSync(outputPath, render) //definitely use outputPath, not 'team.html'? Is render already a string?? Would it need to go in backticks??
      }  
}

//NOTE in node.js documentation, if statements are wrapped in a try/catch as per below example. Should I do this? 
// try {
//     if (!fs.existsSync(OUTPUT_DIR)) {
//       fs.mkdirSync(OUTPUT_DIR);
//     }
//   } catch (err) {
//     console.error(err);
//   }

// TODO: Write Code to gather information about the development team members, and render the HTML file. Or as described in README "Write code in index.js that uses inquirer to gather information about the development team members and creates objects for each team member using the correct classes as blueprints".

//Creating objects from classes for each team member:
//Do I have to declare an empty array for team and push in each object (team member) as they are created?
let team = [];
//should the below declaring (?) a new instance of a class (Manager, Engineer or Intern), then pushing to an array be in the format of a .then after each section of questions? OR in a separate function afterwards?
//is the below the correct syntax for properties?
const newManager = new Manager (Manager.id, Manager.name, Manager.email, Manager.officeNumber);
team.push(newManager);


//Rough prompt layout using Inquirer, wrapped in a function (need async keyword for sure?) Do I need to use await?
//is the first function below that I have as promptUser currently going to end up just a createMgr function? 

async function promptUser() {
    return inquirer
      .prompt([
        {
            type: 'input',
            name: 'mgrName',  //specifically avoid using just "name" for all classes?
            message: 'Enter name of Team Manager',
        },
    
        {
            type: 'input',
            name: 'mgrId', //specifically avoid using just "id" for all classes?
            message: 'Enter Employee ID of Manager',
        },

        {
            type: 'input',
            name: 'mgrEmail', //specifically avoid using just "email" for all classes?
            message: 'Enter email address of Manager',
            //haven't specified format e.g. @fakemail.com
        },

        {
            type: 'input',
            name: 'offNum',
            message: 'Enter office number of Manager',
            //for Manager subclass only
        },

        //WILL THE BELOW WORK i.e. making a function with a function at this point when choices need to be made? Where do I then call this new function? Do I need ASYNC/AWAIT? Should I use a switch statement inside a while loop?
        function offerChoice(){
            const nextStep = await inquirer //not sure of function and constant names yet!
            .prompt([
                {
                    type: 'list',
                    name: 'choiceStep',
                    message: 'What would you like to do next?',
                    choices: ['Add Engineer', 'Add Intern', 'Finish and create org chart'],
                },

            ])

            if (nextStep.choiceStep === 'Add Engineer') { //was wondering if I needed to refer to choices[index]
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'engName',  //specifically avoid using just "name" for all classes?
                        message: 'Enter name of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'engId',  //specifically avoid using just "id" for all classes?
                        message: 'Enter Employee ID of Engineer',    
                    },
                    
                    {
                        type: 'input',
                        name: 'engEmail',  //specifically avoid using just "email" for all classes?
                        message: 'Enter email address of Engineer',    
                    },

                    {
                        type: 'input',
                        name: 'github',  //capitalisation?
                        message: 'Enter GitHub username of Engineer',    
                    },
                .then 
                //take back to the choiceStep - do I need to do this by return/break or should I have broken the function(s) at a different place?

                ]);
                //Cut and paste from the README:
                // When a user selects the engineer option then a user is prompted to enter the following and then the user is taken back to the menu:
                // Engineer's Name
                // ID
                // Email
                // GitHub username


                
            } else if (nextStep.choiceStep === 'Add Intern') { //was wondering if I needed to refer to choices[index]
                
                //Cut and paste from the README:
                // When a user selects the intern option then a user is prompted to enter the following and then the user is taken back to the menu:
                // Intern’s name
                // ID
                // Email
                // School

                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'intName',  //specifically avoid using just "name" for all classes?
                        message: 'Enter name of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'intId',  //specifically avoid using just "id" for all classes?
                        message: 'Enter Employee ID of Intern',    
                    },
                    
                    {
                        type: 'input',
                        name: 'intEmail',  //specifically avoid using just "email" for all classes?
                        message: 'Enter email address of Intern',    
                    },

                    {
                        type: 'input',
                        name: 'school', 
                        message: 'Enter name of school or university loaning Intern',    
                    },
                
                //.then 
                //take back to the choiceStep - do I need to do this by returning somehow or should I have broken the function(s) at a different place?
            ]);

            } else {
                //RENDER render(team)? 
                //return/break/exit? 
                console.log("Your org chart will now be generated");
                 //Cut and paste from the README "When a user decides to finish building their team then they exit the application, and the HTML is generated.""
            }
        },


        //OR CAN I USE A SIMPLE .then after the .prompt?? Roughly as below
        // .then((responses) =>{
        //     if (nextStep.choiceStep === ??????) { 
        //         CODE FOR ADD ENGINEER
        //     } else if(responses.choices === this.choices[1]) {
        //         CODE FOR ADD INTERN 
        //     } else {
        //         CODE FOR FINISH AND CREATE AN ORG CHART
        //     }
        // });      

    
       
      ]);
    }

    //Code to render the html: 
    //in place of 'data' do I need 'team' or 'render' (in which format?) or both/neither?
    function createHtmlFile(data) { 

        const OUTPUT_DIR = path.resolve(__dirname, "output");
        const outputPath = path.join(OUTPUT_DIR, "team.html");
       
       try {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
      } catch (err) {
        console.error(err);
      }

      fs.writeFile(outputPath, data, err =>{
        if (err) {
            console.error("This is your error writing to file:", err);
        } else {
            console.log("Your data has been written to:", outputPath);
        }
      });
       
    };


//module.exports?
  

