require('dotenv').config();
const program = require('commander');
const chalk = require('chalk');
const getVideo = require('../src/api/getVideo');
const downloadPlaylist = require('../src/api/getPlaylistYt');
const log = console.log;

//TO DO:
const inquirer = require('inquirer');
const figlet = require('fidget');

program
  .version('1.0.0', '-v, --version')
  .usage('[OPTIONS]...')
  .option('-l, --link <link>', 'The link to a video or playlist')
  .option('-p, --playlist <playlist>', 'The provided link is for a playlist')
  .option('-d --directory <directory>', 'Set a custom directory for converted files')
  .parse(process.argv);

  if (!program.link && !program.playlist) {
    log(chalk.redBright('Please provide a link.'))
  }
  else {
    if (program.playlist) {
      downloadPlaylist.loadVideos(program.playlist)
    }

    if (program.link) {
      getVideo.processVideo(program.link);
    }
  }


