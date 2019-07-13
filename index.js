
console.log("works!!" + process.argv[2]);

var commandType = process.argv[2];
var value = process.argv[3];

console.log("Your command was: " + commandType + " " + value);

const jsonfile = require('jsonfile');
const file = 'data.json';


// Add task to list
var addToList = function(task) {

    jsonfile.readFile(file, (err, obj) => {
        console.log("current list: ", obj);
        // Add new item to array list
        obj["todoItems"].push(task);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
            console.log("updated list: ", obj);
    });
};


// how all items on list from json file
var showList = function() {
    let arr = [];

    jsonfile.readFile(file, (err, obj) => {
        for (let i=0; i < obj.todoItems.length; i++) {
            arr.push((i+1) + '. [ ] - ' + obj.todoItems[i]);
        }
        console.log(arr);
    });
};


// if item = 4, then put an 'x' on item 4 to mark as done
var markAsDone = function(index) {
    let arr = [];

    jsonfile.readFile(file, (err, obj) => {

        for (let i=0; i < obj.todoItems.length; i++) {
            let tmpIndex = index - 1;

            if (tmpIndex !== i) {
                arr.push((i+1) + '. [ ] - ' + obj.todoItems[i]);
            } else {
                arr.push((i+1) + '. [x] - ' + obj.todoItems[i]);
            }
        }
        console.log(arr);
    });
};


// Check if user input command is 'add'
if (commandType === 'add') {
    addToList(value);
// Check if user input command is 'show'
} else if (commandType === 'show' && value === undefined) {
    showList();
} else if (commandType ==='done') {
    markAsDone(value);
}