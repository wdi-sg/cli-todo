

console.log(process.argv);

const jsonfile = require('jsonfile');
const file = 'data.json';
const json = require('./data.json');


if (process.argv[2] === 'show') {
  jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    });
}

if (process.argv[2] === 'write') {

  jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj[process.argv[3]] = process.argv[4];

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
}

if (process.argv[2] === 'delete') {

    let key = process.argv[3];
    delete json[key];
    console.log(json);

    jsonfile.readFile(file, (err, obj) => {

    console.log(obj);

  jsonfile.writeFile(file, json, (err) => {
    console.log(err)
  });

});
}