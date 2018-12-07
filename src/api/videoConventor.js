const ffmpeg = require('fluent-ffmpeg');
const deleteFiles = require('./deleteFile');
const chalk = require('chalk');

const videoConventor = {
    convertVideo: function(vidLink, mp3Name) {
        const proc = new ffmpeg({ source: vidLink, nolog: true })
        .toFormat('mp3')
        .on('end', function() {
            console.log(chalk.greenBright('Converted: '), chalk.yellowBright(mp3Name));
            try{
                deleteFiles.deleteSingle(vidLink);
            } catch(error) {
                console.log(chalk.orange('Warning: '), (`Deleting ${vidLink} failed`));
            }
            })
            .on('error', function(err) {
                console.log(chalk.redBright('ERROR: '), ('Conversion error'));
            })
            .saveToFile(`/home/valentin/Documents/videomp3/converts/${mp3Name}.mp3`);
    }
};

module.exports = videoConventor;


