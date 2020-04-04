console.log(process.argv);

var command = process.argv[2];

const jsonfile = require('jsonfile');
const file = 'data.json';

jsonfile.readFile(file, (err, obj) => {
  console.log(err);
  console.log(obj);
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
  });
});
