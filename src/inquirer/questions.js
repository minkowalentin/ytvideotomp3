const inquirerService = require('./inquirerService');
const path = require('path');

const questions = [
    {
        type: 'confirm',
        name: 'changeDwLocation',
        message: 'Change default download location?',
        default: false,
        when:() => {
            return false;
        }
    },
    {
        type: 'input',
        name: 'location',
        message: `Please provide file location relative to current path.\n You are now located at: ${path.join(process.cwd())}\n`,
        when: (answers) => {
            return answers.changeDwLocation;
        },
        validate: (value) => {
            // TO DO Check if provided dir is valid
            if (inquirerService.locationValidator(value)) {
                return true;
            } else {
                return false;
            }
        },
    },
    {
        type: 'list',
        name: 'type',
        message: 'What are you converting?',
        choices: ['Video', 'Playlist'],
        filter: (val) => {
            return val.toLowerCase();
        }
    },
    {
        type: 'input',
        name: 'link',
        message: 'Please provide video link\n',
        when: (answers) => {
            return answers.type === 'video';
        },
        validate: (value) => {
            if (!value) {
                return 'You have to provide a video link.'
            } else {
                return true;
            }
        },
        filter: String,
    },
    {
        type: 'input',
        name: 'code',
        message: 'Plase provide playlist code:\n',
        when: (answers) => {
            return answers.type === 'playlist';
        },
        validate: (value) => {
            if (!value) {
                return 'You have to provide a playlist code.'
            } else {
                return true;
            }
        },
        filter: String
    }
];


module.exports = {
    questions
};
