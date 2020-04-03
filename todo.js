console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'
var userInput1 = process.argv[3];
var userInput2 = process.argv[4];

const editStuff = (err, obj) => {
    if (commandType == 'add') {
        let box = '- [ ]';
        let count = obj.toDoItems.length + 1;
        obj.toDoItems.push(`${count}: ${userInput1} ${userInput2} ${box}`);
    } else if (commandType == 'done') {
        let box = '- [X]';
        let choice = parseInt(userInput1)-1;
        var change = obj.toDoItems[choice].split('-');
        change[1] = box;
        var completed = change.join('');
        obj.toDoItems[choice] = completed
    } else if (commandType == 'show') {
        console.log(obj)
    } else {
        console.log('error')
    }
    const doneEditing = (err) => {
        console.log('done editing')
    }
    jsonfile.writeFile(file, obj, doneEditing)
};

jsonfile.readFile(file, editStuff);
console.log("file read called");