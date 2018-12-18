#!/usr/bin/env node

require('dotenv').config();
// const program = require('commander');
const chalk = require('chalk');
const getVideo = require('../src/conventor/getVideo');
const downloadPlaylist = require('../src/conventor/getPlaylistYt');
const log = console.log;
const inquirerApp = require('../src/inquirer/main');
const figlet = require('figlet');

log(
  ('\n'),
  figlet.textSync('Unvideo', {
  font: 'Cybermedium',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}), ('v0.01'),('\n'));

// figlet.fonts(function(err, fonts) {
//   if (err) {
//       console.log('something went wrong...');
//       console.dir(err);figlet.fonts(function(err, fonts) {
//     if (err) {
//         console.log('something went wrong...');
//         console.dir(err);
//         return;
//     }
//     console.dir(fonts);
// });
//       return;
//   }
//   console.dir(fonts);
// });

inquirerApp.askQuestions().then((response) => {
  if (response.changeDwLocation) {
    // TO DO
    //Add functionality to change location 
  }

  switch (response.type) {
    case 'video':
      getVideo.processVideo(response.link);
      break;

    case 'playlist':
      downloadPlaylist.loadVideos(response.code);
      break;

    default:
      log(chalk.red("Invalid value!"));
      break;
  }
});