console.log("works!!", process.argv[2]);

const allDataProcess = [];


// grab all the data from the console
for (var i = 2; i < process.argv.length; i++) {
console.log(process.argv[i]);
}

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["helloworld"] = "monkey";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });
