const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

//HTML itself is already laid out in page-template.js, which is grabbed below (why is this variable given the name render? is it in the noun sense i.e. the rendered team) The module.exports from page-template is a function that returns an object that is a string of html; as the function is anonymous, it can be called anything when it's imported into another file, hence 'render' here)
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
        fs.writeFileSync(outputPath, render) //definitely use outputPath, not 'team.html'?
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

 

// TODO: Write Code to gather information about the development team members, and render the HTML file. Cut and past from README = Write code in index.js that uses inquirer to gather information about the development team members and creates objects for each team member using the correct classes as blueprints.

//Creating objects from classes for each team member:
//Do I have to declare an empty array for team and push in each object (team member) as they are created?
let team = [];
//should the below declaring (?) a new instance of a class (Manager, Engineer or Intern), then pushing to an array be in the format of a .then after each section of questions? OR in a separate function afterwards?
//is the below the correct syntax for properties?
const newManager = new Manager (Manager.id, Manager.name, Manager.email, Manager.officeNumber);
team.push(newManager);


//Rough prompt layout using Inquirer, wrapped in a function (need async keyword for sure?)
//Do I need to use await?
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

        //WILL THE BELOW WORK? AT POINT OF CHOICES, SPECIFY NEW FUNCTION WITHIN A FUNCTION? I have now changed the function from promptUser to offerChoice - will this still work??? Where do I then call this new function? Do I need ASYNC/AWAIT?
        async function offerChoice(){
            const nextStep = await inquirer //really not sure of function and constant names yet!
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
                //.then 
                //take back to the choiceStep - do I need to do this by returning somehow or should I have broken the function(s) at a different place?

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
                        name: 'school',  //capitalisation?
                        message: 'Enter name of school or university loaning Intern',    
                    },
                //.then 
                //take back to the choiceStep - do I need to do this by returning somehow or should I have broken the function(s) at a different place?
            ]);

            } else {
                //just return? watch out for when render html

                 //Cut and paste from the README:
                // When a user decides to finish building their team then they exit the application, and the HTML is generated.
            }
        },


        //OR CAN I USE A SIMPLE .then after the .prompt?? Roughly as below
        // .then((responses) =>{
        //     if (responses.choices === this.choices[0]) { //can this refer to the index of the choices array? can it be paired with this?
        //         CODE FOR ADD ENGINEER
        //     } else if(responses.choices === this.choices[1]) {
        //         CODE FOR ADD INTERN 
        //     } else {
        //         CODE FOR FINISH AND CREATE AN ORG CHART
        //     }
        // });      

    
       
      ]);
    }

    // Cut and paste from README: Call the render function (provided for you) and pass in an array containing all employee objects;
    // The render function will generate and return a block of HTML including templated divs for each employee
    //render declaration from above:
    //const render = require("./src/page-template.js");

    //Code to render the html:where define data/input?
    async function renderHTML(data) {

       // file path and directory path were already defined in supplied code using path node module

        const OUTPUT_DIR = path.resolve(__dirname, "output");
        const outputPath = path.join(OUTPUT_DIR, "team.html");

       //Need to mkdir "output" using fs. The try and catch methods wrapper below comes from node.js documentation, but can I do without it? Is this redundant if running tests, or are tests just on classes?
       
       try {
        if (!fs.existsSync(OUTPUT_DIR)) {
          fs.mkdirSync(OUTPUT_DIR);
        }
      } catch (err) {
        console.error(err);
      }
    
      //Add user input (currently 'data' - does it need to be stringified?) to the html using fs's writeFile method?
     
      //code with callback catching errors is from node.js documentation. Again, how does this error callback effect testing?

     //NOTE although it’s not a requirement, consider adding validation to ensure that user input is in the proper format.

      fs.writeFile('outputPath', data, err =>{
        if (err) {
            console.error("This is your error writing to file:", err);
        } else {
            console.log("Your data has been written to:", outputPath);
        }
      });
       
    };

    // is 'data' in the above going to need to be defined as a string in backticks and is it the contents of page-template.js - the latter is in the module.exports of page-template but how do I call (?) it?
    //is the below an alternative to the above?
  
    fs.writeFileSync(outputPath, `HTML string goes in here, in backticks`) 



    //function to run both promptUser and renderHTML - THIS NEED WILL HAVE CHANGED NOW
    //again is try and catch unnecessary with testing methods?
    // why the need to define userData here?

    async function runBoth() {
        try {
            const userData = await promptUser();
        } catch (err) {
            console.error("This is your error from runBoth:", err)
        }
    };

    runBoth();


    //_____________________________________________//

//shall I just make one function to create the team.html file?

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

function createHtmlFile(){
    if (!fs.existsSync(OUTPUT_DIR)) {
        fs.mkdirSync(OUTPUT_DIR);
      } else {
        fs.writeFileSync(outputPath, render) 
      }  
}
//where does the above function run?

//module.exports?
  

