const jsonFile = require("jsonfile");

const dataFile = "data.json";
const TODO_ITEMS = "todoItems";

let inputArr = process.argv;

const printList = (err, obj) => {
  if (inputArr[2] === "add") {
    for (let i = 3; i < inputArr.length; i++) {
      let dateObj = new Date();
      let mth = dateObj.getMonth() + 1;
      let dateTdy = dateObj.getDate() + "-" + mth + "-" + dateObj.getFullYear();
      // obj[TODO_ITEMS].push(obj[TODO_ITEMS].length + 1 + ". [ ] - " + dateTdy + " - " + inputArr[i]);
      let todoObj = {
        done: "[ ]",
        date: dateTdy,
        item: inputArr[i]
      };
      obj[TODO_ITEMS].push(todoObj);
    }
  }
  else if (inputArr[2] === "done") {
    let index = inputArr[3] - 1;
    obj[TODO_ITEMS][index].done = "[x]";
  }
  else if (inputArr[2] === "delete") {
    let index = inputArr[3] - 1;
    obj[TODO_ITEMS].splice(index, 1);
  }

  for (let z = 0; z < obj[TODO_ITEMS].length; z++) {
    console.log(`${z+1}. ${obj[TODO_ITEMS][z].done} - ${obj[TODO_ITEMS][z].date} - ${obj[TODO_ITEMS][z].item}`);
  }

  jsonFile.writeFile(dataFile, obj, (err) => {
    if (err) throw err;
  });
};

jsonFile.readFile(dataFile, printList);

