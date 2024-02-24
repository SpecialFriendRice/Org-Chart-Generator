const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//These two path module methods are used to where dictate where the resulting html file should go: into a directory called output. The two lines below were supplied as starter code
// Do they need to be in the renderHTML function?
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file. 
//NOTE the HTML itself is already laid out in page-template.js

//Cut and past from the README = Write code in index.js that uses inquirer to gather information about the development team members and creates objects for each team member using the correct classes as blueprints.
//creating objects from classes will mean const emp1 = new Engineer (all parameters, comma separated) etc
//Do I have to declare an empty array for team (let team = []) and push in each object (team member) as they are created? So team.push(emp1)
//should the above declaring (?) a new object and then pushing to an array be a .then after each section of questions?


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
            message: 'Please enter your office number',
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

            if (this.choices === 'Add Engineer') { //do I have to refer to choices array and index? Will using 'this' work?)

                //Cut and paste from the README:
                // When a user selects the engineer option then a user is prompted to enter the following and then the user is taken back to the menu:
                // Engineer's Name
                // ID
                // Email
                // GitHub username
                
            } else if (this.choices === 'Add Intern') { //do I have to refer to choices array and index? Will using 'this' work?)
                
                //Cut and paste from the README:
                // When a user selects the intern option then a user is prompted to enter the following and then the user is taken back to the menu:
                // Intern’s name
                // ID
                // Email
                // School

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

       //Need to mkdir "output" using fs. The try and catch methods wrapper below comes from node.js documentation. Can it be combined with the existing constants like this? Is this redundant if running tests?
       
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

  

