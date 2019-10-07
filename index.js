// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

let value = process.argv[2];
let item = process.argv[3];

console.log("working");

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);
  // obj["helloworld"] = "monkey";



  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)

    if(value === add) {

    }
  });
});