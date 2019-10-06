console.log("Hope this works");

// retained from original code
const jsonfile = require('jsonfile');
const file = 'data.json';

//define global variables

var inputType = process.argv[2];
var listItem = process.argv[3];

// write function to add to list
const addItem = function (obj) {

    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    obj.counter = 1
    obj["todoItems"].push(`${obj.counter}. [ ] - ${listItem}`);
    obj.counter++;

      jsonfile.writeFile(file, obj, (err) => {
      console.log(err)
      });
    });
}

// // write function that shows list
let showList = (obj) => {
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj['todoItems']);
    });
};

//if statement for command
if (inputType === "show") {
    showList();
} else if (inputType === "add") {
    addItem();
};