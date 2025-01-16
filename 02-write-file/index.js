const fs = require('fs');
const path = require('path');
const writeStream = fs.createWriteStream(path.join(__dirname, 'characters.txt'), {
  encoding: 'utf-8',
});
const { stdin, stdout } = process;

stdout.write(
  'If you could be a character from a book or movie, what would it be?\n\n',
);

stdin.on('data', (data) => {
  const input = data.toString().trim();
  if (input === 'exit') {
    process.exit();
  } else {
    writeStream.write(data);
  }
});

process.on('exit', () => {
  stdout.write('\nGoodbye and have a nice day!');
});
process.on('SIGINT', () => {
    process.exit()
})
