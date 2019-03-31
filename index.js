
console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  obj["helloworld"] = "monkey";
    console.log(obj);

  jsonfile.writeFile(file, obj, (err) => {
    console.log("Yay")
  });
});

  // obj["todoItems"] = [{"id":"2", "done":"false", "item":"feed dog"}];

jsonfile.writeFile(file, obj, (err) => {
    console.log("yay")

  });