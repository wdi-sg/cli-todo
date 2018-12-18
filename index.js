const jsonfile = require('jsonfile');
const file = 'data.json';

let commandType = process.argv[2];

const argvArray = [];

for (let i=0; i < process.argv.length; i++) {
    if (i > 2) {
        argArray.push(process.argv[i]);
    }
    console.log(argArray);
}



jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});

const obj = {
  "todoItems" : "1. [ ] - do laundry"
};

jsonfile.writeFile(file, obj, (err) => {
  console.log(err)
  console.log("top is 3rd CL");
});
