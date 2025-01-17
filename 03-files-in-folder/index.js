const fs = require('fs');
const path = require('path');
const pathSecretFolder = path.join(__dirname, 'secret-folder');
const { readdir } = require('node:fs/promises');

fs.readdir(pathSecretFolder, { withFileTypes: true }, (err, files) => {
  if (err) {
    return console.error("Error reading directory:', err");
  }

  files.forEach((item) => {
    if (item.isFile()) {
      const pathFile = path.join(pathSecretFolder, item.name);
      const ext = path.extname(pathFile).replace('.', '');
      const fullName = item.name.replace('.' + ext, '');

      fs.stat(pathFile, (err, info) => {
        if (err) {
          return console.error("Error reading directory:', err");
        } else {
          const sizeKb = (info.size / 1024).toFixed(2);
          console.log(`${fullName} - ${ext} - ${sizeKb}kb`);
        }
      });
    }
  });
});
