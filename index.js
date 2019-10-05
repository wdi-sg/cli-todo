console.log("works!!", process.argv[2]);

let commandType = process.argv[2];
let value = process.argv[3];

console.log("Your command was: "+commandType);

const command = require('./commands');

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  command[commandType](obj, value);

  jsonfile.writeFile(file, obj, { spaces: 1 }, (err) => {
    console.log(err);
  });
});
