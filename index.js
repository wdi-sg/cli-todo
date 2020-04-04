const jsonFile = require("jsonfile");

const dataFile = "data.json";

let inputArr = process.argv;

const printList = (err, obj) => {
  if (inputArr[2] === "add") {
    for (let i = 3; i < inputArr.length; i++) {
      obj["todoItems"].push(obj["todoItems"].length + 1 + ". [ ] - " + inputArr[i]);
    }
  }

  for (let z = 0; z < obj["todoItems"].length; z++) {
    console.log(obj["todoItems"][z]);
  }

  jsonFile.writeFile(dataFile, obj, (err) => {
    console.log(err);
  });
};

jsonFile.readFile(dataFile, printList);
