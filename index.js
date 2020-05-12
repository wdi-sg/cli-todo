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
    let modifiedList = obj["todoItems"];

    console.log("pushing commences");
    modifiedList.push(listItem);
    for (let i=0; i< modifiedList.length; i++) {
        // when loop first runs, i = 1
        // need if condition to start from i = 0
        if (i === modifiedList.length -1 ){
            // remember that arrays start from i = 0
            modifiedList[i] = (i+1) + '.' + " [ ] -" + ' ' + listItem;
        }
    }
    console.log("successfully added to list");


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