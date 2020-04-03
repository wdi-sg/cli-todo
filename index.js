console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

const editStuff = (err, obj) => {
    if (commandType == 'add') {
        console.log(obj);
    } else if (commandType == 'done') {
        console.log(obj);
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