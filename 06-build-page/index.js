const fs = require('fs').promises;
const path = require('path');

const projectDist = path.join(__dirname, 'project-dist');
const newAssestsFolder = path.join(projectDist, 'assets');
const indexHtml = path.join(projectDist, 'index.html');
const stylesCSS = path.join(projectDist, 'style.css');

const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const templateFile = path.join(__dirname, 'template.html');

const createBundle = async () => {
  try {
    await fs.writeFile(stylesCSS, '');
    const files = await fs.readdir(stylesFolder);
    const copyFiles = files.map(async (item) => {
      const fullPath = path.join(stylesFolder, item);
      const stats = await fs.stat(fullPath);

      if (stats.isFile() && item.endsWith('.css')) {
        const info = await fs.readFile(fullPath);
        await fs.appendFile(stylesCSS, info.toString() + '\n');
      }
    });

    await Promise.all(copyFiles);
  } catch (err) {
    console.error('Error creating CSS bundle:', err);
  }
};

async function copyDir(start, finish) {
  try {
    await fs.mkdir(finish, { recursive: true });
    const filesInFolder = await fs.readdir(start);

    const copyFiles = filesInFolder.map(async (file) => {
      const filePath = path.join(start, file);
      const newFile = path.join(finish, file);
      const stats = await fs.stat(filePath);

      if (stats.isDirectory()) {
        await copyDir(filePath, newFile);
      } else {
        await fs.copyFile(filePath, newFile);
      }
    });

    await Promise.all(copyFiles);
    console.log('folder succesfully copied');
  } catch (err) {
    console.error('error with copy:', err);
  }
}

async function copyTemplate() {
  try {
    await fs.copyFile(templateFile, indexHtml);

    let filling = await fs.readFile(indexHtml, 'utf8');
    const components = await fs.readdir(componentsFolder, {
      withFileTypes: true,
    });

    for (const file of components) {
      const componentsFile = path.join(componentsFolder, file.name);
      const ext = path.extname(componentsFile);

      if (file.isFile() && ext === '.html') {
        const fileInfo = await fs.readFile(componentsFile, 'utf-8');
        const fileName = file.name.replace(ext, '');

        filling = filling.replace(`{{${fileName}}}`, fileInfo);
      }
    }

    await fs.writeFile(indexHtml, filling);
  } catch (err) {
    console.error('Error copying template:', err);
  }
}

async function build() {
  await copyDir(assetsFolder, newAssestsFolder);
  await createBundle();
  await copyTemplate();
}

build();
