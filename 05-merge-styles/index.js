const fs = require('fs');
const path = require('path');

// директория для бандла
const projectDist = path.join(__dirname, 'project-dist', 'bundle.css');
//директория со стилями
const stylesFolder = path.join(__dirname, 'styles');
//создание файла
const writeStream = fs.createWriteStream(projectDist);

const createBundle = () => {
  fs.readdir(stylesFolder, (err, files) => {
    if (err) {
      return console.error('Error reading directory:', err);
    }

    files.forEach((item) => {
      const fullPath = path.join(stylesFolder, item);

      // Проверка, является ли элемент файлом и имеет ли он расширение .css
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
};

createBundle();
