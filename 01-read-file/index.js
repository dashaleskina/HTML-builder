const fs = require('fs');
const path = require('path');
const pathFile = path.join(__dirname, 'text.txt');
const readStream = fs.createReadStream(pathFile, { encoding: 'utf8' });

readStream.on('data', (chunk) => {
  console.log(chunk);
});

readStream.on('error', (err) => {
  console.error(`Error with file: ${err.message}`);
});
