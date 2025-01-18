const fs = require('fs').promises;
const { error } = require('console');
const path = require('path');
const existFolder = path.join(__dirname, 'files');
const newFolder = path.join(__dirname, 'files-copy');

async function copy() {
  try {
    await fs.rm(newFolder, { force: true, recursive: true });
    await fs.mkdir(newFolder, { recursive: true });
    const filesInFolder = await fs.readdir(existFolder);

    const copyFiles = filesInFolder.map((file) => {
      const filePath = path.join(existFolder, file);
      const newFile = path.join(newFolder, file);
      return fs.copyFile(filePath, newFile);
    });

    await Promise.all(copyFiles);
    console.log('folder succesfully copied');
  } catch (err) {
    console.error('error with copy:', err);
  }
}

copy();
