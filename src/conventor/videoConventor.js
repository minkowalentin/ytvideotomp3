const ffmpeg = require('fluent-ffmpeg');
const deleteFiles = require('./deleteFile');
const chalk = require('chalk');
const setMetadata = require('./setMetadata');

const videoConventor = {
    convertVideo: function (vidLink, mp3Name, tags) {
        const proc = new ffmpeg({ source: vidLink, nolog: true })
            .toFormat('mp3')
            .on('end', function () {
                console.log(chalk.greenBright('Converted: '), chalk.yellowBright(mp3Name));
                try {
                    deleteFiles.deleteSingle(vidLink);
                } catch (error) {
                    console.log(chalk.orange('Warning: '), (`Deleting ${vidLink} failed`));
                }
                setMetadata(`./converts/${mp3Name}.mp3`,tags);
            })
            .on('error', function (err) {
                console.log(chalk.redBright('ERROR: '), ('Conversion error\n'),err);
            })
            .saveToFile(`./converts/${mp3Name}.mp3`);
    },
};


module.exports = videoConventor;


