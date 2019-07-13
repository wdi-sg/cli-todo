
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

        // Check if user input command is 'add'
if (commandType == 'add') {
    addToList(item);
}