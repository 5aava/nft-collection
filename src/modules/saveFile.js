const fs = require('fs');


function saveFile (filename, body) {
  fs.writeFile(filename, body, function (err) {
    if (err) {return console.log(err);}
    console.log('Hello World > helloworld.txt');
  });
}


module.exports = saveFile;
