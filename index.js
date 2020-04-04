const jsonFile = require("jsonfile");

const dataFile = "data.json";

let inputArr = process.argv;

const printList = (err, obj) => {
  for (let i = 2; i < inputArr.length; i++) {
    obj["todoItems"].push(obj["todoItems"].length + 1 + ". [ ] - " + inputArr[i]);
  }

  for (let z = 0; z < obj["todoItems"].length; z++) {
    console.log(obj["todoItems"][z]);
  }

  jsonFile.writeFile(dataFile, obj, (err) => {
    console.log(err);
  });
};

jsonFile.readFile(dataFile, printList);
