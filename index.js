console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
const commandArg = process.argv[3];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

var toDoItems = [];

class ToDoListItem {
    constructor(item, isDone = false) {
        this.item = item;
        this.isDone = isDone;
        this.dateCreated = new Date();
        this.dateUpdated = new Date();
    }
}

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
        case 'delete':
            deleteItem(commandArg);
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

const addToDoListItem = (inputArg) => {
    console.log('adding' + inputArg);
    let itemToPush = new ToDoListItem(inputArg, false)
    toDoItems.push(itemToPush);
}

const markedDone = (inputNo) => {
    inputNo = parseInt(inputNo);
    if (inputNo <= 0 || inputNo > toDoItems.length || !inputNo) {
        console.log('Error please put in a valid number');
        return;
    }
    var indexNo = inputNo - 1;
    toDoItems[indexNo].isDone = true;
    toDoItems[indexNo].dateUpdated = new Date();
}

const listToDoListItems = () => {
    for (let i = 0; i < toDoItems.length; i++) {
        let markedAsDone = toDoItems[i].isDone ? "X" : " ";
        const dateCreated = new Date(toDoItems[i].dateCreated);
        const dateUpdated = new Date(toDoItems[i].dateUpdated);
        console.log(`${i+1}. [${markedAsDone}] - ${toDoItems[i].item} - Created: ${dateCreated.getDate()}-${dateCreated.getMonth()+1}-${dateCreated.getFullYear()} - Updated: ${dateUpdated.getDate()}-${dateUpdated.getMonth()+1}-${dateUpdated.getFullYear()}`);
    }
}

const deleteItem = (inputNo) => {
  inputNo = parseInt(inputNo);
  if (inputNo <= 0 || inputNo > toDoItems.length || !inputNo) {
    console.log('Error please put in a valid number');
    return;
}
  let indexNo = inputNo - 1;
  toDoItems.splice(indexNo, 1);
}

jsonfile.readFile(file, onFileRead);