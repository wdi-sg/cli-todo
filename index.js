const jsonfile = require('jsonfile');

console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
const commandArg = process.argv[3];

const file = 'data.json'

var toDoItems = [];

// Make To Do items a class, so all objects can be the same.
class ToDoListItem {
    constructor(item, isDone = false) {
        this.item = item;
        this.isDone = isDone;
        this.dateCreated = new Date();
        this.dateUpdated = new Date(); // Update this each time the object is changed.
    }
}

// This is simpler (even simpler just making the item in the add to=do list function).
function MyToDoListItem(item, isDone = false) {
    return {
        item: item,
        isDone: isDone,
        dateCreated: new Date(),
        dateUpdated: new Date() // Update this each time the object is changed.
    }
}

// Parse argument to see what command to do. By default just give an error and list the to-do items.
const whatCommand = () => {
    switch (commandType) {
        case 'add':
            addToDoListItem(commandArg);
            break;
        case 'show':
            break;
        case 'display':
            break;
        case 'done':
            markedDone(commandArg);
            break;
        case 'complete':
            markedDone(commandArg);
            break;
        case 'delete':
            deleteItem(commandArg);
            break;
        default:
            console.log('Not a valid command');
            break;
    }
}

// What to do when the file is read.
const onFileRead = (err, obj) => {

    if (err) {
        console.log('There is an error:');
        console.log(err);
        return;
    }

    // If there is no to-do items list, create an empty list.
    if (!obj.toDoItems) {
        obj.toDoItems = [];
    }

    toDoItems = obj.toDoItems;

    // Do the user command.
    whatCommand();
    // Always list the items:
    console.log('Items in list:');
    listToDoListItems();

    // Write everything back to the json.
    jsonfile.writeFile(file, obj, (err) => {
        if (err) {
            console.log('Error writing file:');
            console.log(err);
        }
    });
};


const addToDoListItem = (inputArg) => {
    console.log('adding' + inputArg);
    toDoItems.push({
        item: inputArg,
        isDone: false,
        dateCreated: new Date(),
        dateUpdated: new Date() // Update this each time the object is changed.
    });
}

// Returns true if input number is outside of range of to-do list items.
const invalidInput = (inputNo) => {
    return (inputNo <= 0 || inputNo > toDoItems.length || !inputNo);
}

// Mark a To-Do list item as completed.
const markedDone = (inputNo) => {
    inputNo = parseInt(inputNo);
    if (invalidInput(inputNo)) {
        console.log('Error please put in a valid number');
        return;
    }
    var indexNo = inputNo - 1;
    toDoItems[indexNo].isDone = true;
    toDoItems[indexNo].dateUpdated = new Date();
}

// For loop to list all items in the to do list, with date created and date updated.
const listToDoListItems = () => {
    for (let i = 0; i < toDoItems.length; i++) {
        let markedAsDone = toDoItems[i].isDone ? "X" : " ";
        const dateCreated = new Date(toDoItems[i].dateCreated);
        const dateUpdated = new Date(toDoItems[i].dateUpdated);
        console.log(`${i+1}. [${markedAsDone}] - ${toDoItems[i].item} - Created: ${dateCreated.getDate()}-${dateCreated.getMonth()+1}-${dateCreated.getFullYear()} - Updated: ${dateUpdated.getDate()}-${dateUpdated.getMonth()+1}-${dateUpdated.getFullYear()}`);
    }
}

// Permanently remove an item from the list.
const deleteItem = (inputNo) => {
    inputNo = parseInt(inputNo);
    if (invalidInput(inputNo)) {
        console.log('Error please put in a valid number');
        return;
    }
    let indexNo = inputNo - 1;
    toDoItems.splice(indexNo, 1);
}

// The program runs by reading the json file.
jsonfile.readFile(file, onFileRead);