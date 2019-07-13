console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {


  obj["helloworld"] = "yo";
  console.log(obj);
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});