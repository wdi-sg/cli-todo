
console.log("works!!" + process.argv[2]);

var commandType = process.argv[2];
var item = process.argv[3];

console.log("Your command was: " + " " + commandType + " " + item);

const jsonfile = require('jsonfile');
const file = 'data.json';


// Add task to list
var addToList = function(task) {

    jsonfile.readFile(file, (err, obj) => {
        console.log("current list: ", obj);
        // Add new item to array list
        obj["todoItems"].push(item);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
        console.log("updated list: ", obj);
    });
};


// how all items on list from json file
var showList = function() {

    jsonfile.readFile(file, (err, obj) => {
        console.log("latest list: " , obj);

        for (let i=0; i < obj.todoItems.length; i++) {
            console.log((i+1) + '. [ ] - ' + obj.todoItems[i]);
        }
    });
};


// Check if user input command is 'add'
if (commandType == 'add') {
    addToList(item);
// Check if user input command is 'show'
} else if (commandType == 'show') {
    showList();
}