
console.log("To-Do-List");

var commandType = process.argv[2];
var value = process.argv[3];

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
                    let now = new Date();
                    let tmpStr = "\tUpdated at: " + now
                    gArr.push((i+1) + '. [x] - ' + obj.todoItems[i] + tmpStr);
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

var showInstructions = function(){
    console.log("Enter the following command to perform your desired task");
    console.log("1. show - To show all items on your to-do-list.");
    console.log("2. add [name of task] - To add new item to your to-do-list.");
    console.log("3. done [item number] - To mark item as done on your to-do-list.");
    console.log("4. del [item number] - To delete an item from your to-do-list.");
}



// Check if user input command is 'add'
if (commandType === undefined) {
    showInstructions();
} else if (commandType === 'add') {
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