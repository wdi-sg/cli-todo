console.log("Command: ", process.argv[2]);

var commandType = process.argv[2];

// console.log(" "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

const obj = {
    "todoItems": [],
}
jsonfile.readFile(file, (err, obj) => {

      let array = obj["todoItems"];
       };



 if (process.argv[2] === "add") {
           array.push(". [ ] - "+ process.argv[3] + " "+ createdAt);

       console.log((array.length) +". [ ] - "+ process.argv[3]);
  jsonfile.writeFile(file, obj, (err) => {
      console.log(err)
      } 

  

 