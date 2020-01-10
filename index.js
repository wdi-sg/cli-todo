console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
const commandArg = process.argv[3];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

var toDoItems = [];

const whatCommand = () => {
    switch (commandType) {
        case 'add':
            addToDoListItem();
            break;
        case 'show':
            break;
        case 'display':
            break;
        default:
            console.log('Not a valid command');
            break;
    }
}

const onFileRead = (err, obj) => {

    if (err) {
        console.log('There is an error:');
        console.log(err);
        return;
    }

    if (!obj.toDoItems) {
        obj.toDoItems = [];
    }
    toDoItems = obj.toDoItems;

    whatCommand();
    console.log('Items in list:');
    listToDoListItems();

    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
          console.log('Error writing file:');
          console.log(err);
        }
    });
};

const addToDoListItem = () => {
    console.log('adding' + commandArg);
    toDoItems.push(commandArg);
}

const listToDoListItems = () => {
    for (let i = 0; i < toDoItems.length; i++) {
        console.log(toDoItems[i]);
    }
}

jsonfile.readFile(file, onFileRead);