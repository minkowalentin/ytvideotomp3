const fs = require('fs');
const config = require('../../config/config');
const defaultDir = config.defaultDir;

const directoryHelper = {
  setDirectory: function () {
    if (!directory) {
      return defaultDir;
    }
    // create directory if it dosent exist
    if (!fs.existsSync(directory)) {
      try {
        fs.mkdirSync(directory)
        return directory;
      } catch (error) {
        log(
          chalk.red('Error '),
          chalk.yellow(`"${directory}"`), " is an invalid directory"
        )
        log("writing to default directory",
          chalk.red(`${defaultDir}`));
        return defaultDir;
      }
    };
  }
}


module.exports = directoryHelper;


