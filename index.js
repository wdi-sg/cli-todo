console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

 /*   if (process.argv[2] === "add" ) {
        obj[process.argv[3]] = process.argv[4]
    }*/
    if (process.argv[2] === "add") {
        obj["todoItems"].push(process.argv[3])
    }

  console.log(obj);



  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});