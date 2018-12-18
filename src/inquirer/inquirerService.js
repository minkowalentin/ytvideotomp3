function locationValidator(location) {
    try {
        const dir = path.join(process.cwd(), location);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
            console.log(chalk.yellow(`Directory did not exist. Created new folder at :${dir}`));
        }
        defaultDir = dir;
        console.log(chalk.green(`File(s) will be downloaded at `), chalk.yellow(`${defaultDir}`))
        return true;
    } catch (error) {
        console.log(chalk.red('Invalid directory provided. Please try again.'));
        return false;
    }
}

module.exports = {
    locationValidator
};
