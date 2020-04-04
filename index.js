const jsonFile = require("jsonfile");

const dataFile = "data.json";

let inputArr = process.argv;

const printList = (err, obj) => {
  if (inputArr[2] === "add") {
    for (let i = 3; i < inputArr.length; i++) {
      let dateObj = new Date();
      let mth = dateObj.getMonth() + 1;
      let dateTdy = dateObj.getDate() + "-" + mth + "-" + dateObj.getFullYear();
      obj["todoItems"].push(obj["todoItems"].length + 1 + ". [ ] - " + dateTdy + " - " + inputArr[i]);
    }
  }
  else if (inputArr[2] === "done") {
    let index = inputArr[3] - 1;
    let newStr = obj["todoItems"][index].replace("[ ]", "[x]");
    obj["todoItems"][index] = newStr;
  }
  else if (inputArr[2] === "delete") {
    let index = inputArr[3] - 1;
    obj["todoItems"].splice(index, 1);
  }

  for (let z = 0; z < obj["todoItems"].length; z++) {
    console.log(obj["todoItems"][z]);
  }

  jsonFile.writeFile(dataFile, obj, (err) => {
    console.log(err);
  });
};

jsonFile.readFile(dataFile, printList);

