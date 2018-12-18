const fs = require('fs');
  
  const deleteFiles = {
    deleteSingle: function (fileDir) {
        fs.unlink(fileDir, (err) => {
            if (err) throw err;
          });
    }
  }

  module.exports = deleteFiles;
  
  
  