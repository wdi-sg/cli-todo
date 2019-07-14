console.log("your command: " + process.argv[2]);

const jsonfile = require('jsonfile');
const file = 'data.json'

let commandType = process.argv[2];
let input1 = process.argv[3];
let task;

//create list and add 1st task
var createList = function(task, obj) {
    obj['todo'] = [];
    obj['todo'].push(task);
};

//add 2nd task onwards
var addTask = function(task, obj) {
    obj['todo'].push(task);
};

//show task list
var showList = function(obj) {
    console.log(obj);
};

jsonfile.readFile(file, (err, obj) => {
    if(commandType === 'add' && Object.keys(obj).length === 0) {
        createList(input1, obj);
        console.log(obj);
    }
    else if (commandType === 'add' && Object.keys(obj).length !== 0) {
       addTask(input1, obj);
       console.log(obj);
    }
    else if (commandType === 'show') {
        showList(obj);
    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
        });
});