
console.log("works!!" + process.argv[2]);

var commandType = process.argv[2];
var value = process.argv[3];

console.log("Your command was: " + commandType + " " + value);

const jsonfile = require('jsonfile');
const file = 'data.json';

var gArr = [];

// Add task to list
var addToList = function(task) {

    jsonfile.readFile(file, (err, obj) => {
        console.log("current list: ", obj);

        // Capture current time & data
        let now = new Date();

        // Add new item to array
        obj["todoItems"].push(task + '\tCreated_At: ' + now);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
            console.log("updated list: ", obj);
    });
};


// how all items on list from json file
var showList = function() {

    jsonfile.readFile(file, (err, obj) => {
        for (let i=0; i < obj.todoItems.length; i++) {
            let tmpStr = (i+1) + '. [ ] - ';
            gArr.push(tmpStr + obj.todoItems[i]);
            console.log(gArr[i]);
        }
        // console.log(gArr);
    });
};


// if item = 4, then put an 'x' on item 4 to mark as done
var markAsDone = function (index) {

    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err);
        } else {
            for (let i=0; i < obj.todoItems.length; i++) {
                let tmpIndex = index - 1;
                if (tmpIndex == i) {
                    // obj.todoItems.push((i+1) + '. [x] - ' + obj.todoItems[i]);
                    gArr.push((i+1) + '. [x] - ' + obj.todoItems[i]);
                } else {
                    // obj.todoItems.push((i+1) + '. [ ] - ' + obj.todoItems[i]);
                    gArr.push((i+1) + '. [ ] - ' + obj.todoItems[i]);
                }
                console.log(gArr[i]);
            }

            // console.log("list: ", gArr);
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
                console.log("Mark Done");
        }
    });
};

var deleteItem = function(index) {

    // Delete selected item
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            for (let i = 0; i < obj.todoItems.length; i++) {
                let tmpIndex = index - 1;

                if (tmpIndex == i) {
                var removed = obj.todoItems.splice (i, 1);
                console.log(removed);
                console.log(obj);
                }
            }
        }

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
            console.log("Item " + index + ". [ ] -  "+ removed + " was removed");
    });
}


// Check if user input command is 'add'
if (commandType === 'add') {
    addToList(value);
// Check if user input command is 'show'
} else if (commandType === 'show' && value === undefined) {
    showList();
} else if (commandType ==='done') {
    markAsDone(parseInt(value));
} else if (commandType === 'now') {
    showDateAndTime();
} else if (commandType === 'del') {
    deleteItem(parseInt(value));
} else {
    console.log("Invalid choice");
}