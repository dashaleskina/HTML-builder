const fs = require('fs');
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist', 'bundle.css');
const stylesFolder = path.join(__dirname, 'styles');

const createBundle = () => {
  fs.unlink(projectDist, (err) => {
    if (err && err.code !== 'ENOENT') {
      return console.error('Error deleting', err);
    }

    fs.readdir(stylesFolder, (err, files) => {
      if (err) {
        return console.error('Error reading directory:', err);
      }

      files.forEach((item) => {
        const fullPath = path.join(stylesFolder, item);

        fs.stat(fullPath, (err, stats) => {
          if (err) {
            return console.error('Error getting file stats:', err);
          }

          if (stats.isFile() && item.endsWith('.css')) {
            fs.readFile(fullPath, (err, info) => {
              if (err) {
                return console.error('Error reading file:', err);
              }
              fs.appendFile(projectDist, info.toString(), (writeError) => {
                if (writeError) {
                  console.error('Error when adding data:', writeError);
                }
              });
            });
          }
        });
      });
    });
  });
};

createBundle();
