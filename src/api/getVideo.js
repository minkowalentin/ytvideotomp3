const fs = require('fs');
const ytdl = require('ytdl-core');
const videoConventor = require('./videoConventor');
const chalk = require('chalk');

async function getVideoInfo(videoLink) {
  return new Promise((resolve, reject) => {
    ytdl.getInfo(videoLink, function (err, info) {
      if (err) {
        reject(err)
      }
      resolve(info)
    })
  })
}

async function processVideo(videoLink) {
  let info;
  let title;
  try {
    info = await getVideoInfo(videoLink);
  } catch (error) {
    console.log(chalk.redBright('ERROR: '), ('Fetching title failed'));
  }

  if (info !== undefined) {
    title = info.title.replace(/[/]/g, '');
    if (!fs.existsSync(`./converts/${title}.mp3`)) {
      console.log(chalk.green('Downloading: '), chalk.yellow(title));
      try {
        await getVideo(title, videoLink);
      } catch (error) {
        console.log(chalk.redBright('ERROR: '), ('Downloading video failed'));
      }
    } else {
      console.log(chalk.yellow('INFO: '), chalk.yellowBright(`"${title}.mp3" already exists`));

    }
  }
}

function getVideo(title, videoLink) {
  // if directory dosen't exist, create it
  if (!fs.existsSync('./converts/')) {
    fs.mkdirSync("./converts/");
  }

  return new Promise((resolve, reject) => {
    ytdl(videoLink, { filter: (format) => format.container === 'mp4' })
      .pipe(fs.createWriteStream(`./converts/${title}.mp4`))
      .on('finish', function () {
        videoConventor.convertVideo(`./converts/${title}.mp4`, title);
        resolve();
      })
      .on('error', function (err) {
        reject(err);
      });
  })
}

module.exports = {
  getVideo,
  getVideoInfo,
  processVideo
};
