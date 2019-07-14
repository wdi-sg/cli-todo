
var figlet = require('figlet');

var commandType = process.argv[2];
var value = process.argv[3];

const jsonfile = require('jsonfile');
const file = 'data.json';

// Add task to list
var addToList = function(task) {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            // Capture current time & data
            let now = new Date();
            obj.todoItems.push(task + '\tCreated_At: ' + now);

            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
                console.log("updated list: ", obj);
        }
    });
};


// how all items on list from json file
var showList = function() {
    let arr = [];

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            for (let i=0; i < obj.todoItems.length; i++) {
                arr.push((i+1) + '. [ ] - ' + obj.todoItems[i]);
                console.log(arr[i]);
            }
        }
    });
};


// if item = 4, then put an 'x' on item 4 to mark as done
var markAsDone = function (index) {
    let arr = [];

    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            for (let i=0; i < obj.todoItems.length; i++) {
                let tmpIndex = index - 1;
                if (tmpIndex == i) {
                    let now = new Date();
                    let strFront = '[x] ';
                    let dateStr = "\tUpdated at: " + now;
                    obj.todoItems.splice(i, 1, strFront + obj.todoItems[i] + dateStr);
                 }
                console.log(obj.todoItems[i]);
            }

            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
                console.log("Item is marked done!");
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
                // console.log(removed);
                }
            }
        }

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
            console.log("Item " + index + ". [ ] -  "+ removed + " deleted");
    });
}

var showAscii = function () {
    figlet.text('To-Do-List', {
        font: '3D-ASCII',
        horizontalLayout: 'default',
        verticalLayout: 'default'
    }, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        } else {
            console.log(data)
        }
    });
}

var showInstructions = function() {
    console.log("Enter the following command to perform your desired task");
    console.log('1. show - To show all items on your to-do-list.');
    console.log('2. add <item> - To add new item to your to-do-list. E.g. add "walk dog"');
    console.log('3. done <item number> - To mark item as done on your to-do-list. E.g. done 2');
    console.log("4. del <item number> - To delete an item from your to-do-list. E.g. del 3");
}




if (commandType === undefined) {
    showAscii();
    showInstructions();
} else if (commandType === 'add') {
    addToList(value);
} else if (commandType === 'show') {
    showList();
} else if (commandType ==='done') {
    markAsDone(parseInt(value));
} else if (commandType === 'del') {
    deleteItem(parseInt(value));
} else {
    console.log("Invalid choice");
}