const NodeID3 = require('node-id3')

function setMetadata(file, tags) {

NodeID3.write(tags, file, function(err, buffer) {  }) //  Buffer is only returned if a buffer was passed as file
}


module.exports = setMetadata;
