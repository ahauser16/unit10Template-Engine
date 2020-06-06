const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");
const render = require("./lib/htmlRenderer");
const app = require("./app");

var employees = [];

const questions = [
    {
        type: "input",
        name: "name",
        message: "What is the employee's name?",
        
    },
    {
        type: "input",
        name: "email",
        message: "What is the employee's email address?",
        validate: function(value) {
            var pass = value.match(
                  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
            );
            if (pass) {
              return true;
            }
      
            return 'Please enter a valid email address';
      }
    },
    {
        type: "input",
        name: "id",
        message: "What is the employee's id number?"
    },
    //ID# check for input is # otherwise repeat question
    //if (# != indexOf(arrayID)) then proceed otherwise      console.log("That ID # is taken, try another one")
    {
        type: "list",
        name: "role",
        message: "Is the employee an intern, engineer or manager?",
        choices: ["intern", "engineer", "manager"]
    },
    {
        type: "input",
        name: "school",
        message: "what school did they go to?",
        when: (answers) => answers.role === "intern"
    },
    {
        type: "input",
        name: "github",
        message: "what is their github username?",
        when: (answers) => answers.role === "engineer"
    },
    {
        type: "input",
        name: "officeNumber",
        message: "what is their office number?",
        when: (answers) => answers.role === "manager"
    },
    {
        type: "confirm",
        name: "reRun",
        message: "Do you want to add a new employee?  If not then your roster of employees will be rendered!"
    }
]

function addEmployee() {

    inquirer
        .prompt(questions)
        .then(answers => {
            console.log(answers);
            //add answers to the employees array
            if (answers.role === "intern") {
                var newIntern = new Intern(answers.name, answers.id, answers.email, answers.school)
                employees.push(newIntern)
            };
            if (answers.role === "engineer") {
                var newEngineer = new Engineer(answers.name, answers.id, answers.email, answers.github)
                employees.push(newEngineer)
            };
            if (answers.role === "manager") {
                var newManager = new Manager(answers.name, answers.id, answers.email, answers.officeNumber)
                employees.push(newManager)
            };

            if (answers.reRun === true) {
                addEmployee();
            } else {
                fs.writeFile("./output/final.html", render(employees), err => {
                    if (err) {

                    }
                    console.log("checkcheck");
                });

            }
        })
}


addEmployee();
