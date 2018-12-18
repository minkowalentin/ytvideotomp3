const questions = require('./questions');
const inquirer = require('inquirer');


function askQuestions() {
    return new Promise((resolve) => {
        inquirer.prompt(questions.questions).then(answers => {
            resolve( answers)
        });
    })
}

module.exports = {
    askQuestions
};
