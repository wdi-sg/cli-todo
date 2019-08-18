console.log("your command: " + process.argv[2]);

const jsonfile = require('jsonfile');
const file = 'data.json'

let commandType = process.argv[2];
let input1 = process.argv[3];
let task = {status: '. [ ] -', description: input1};
let i;

//add task onwards
var addTask = function(task, obj) {
    obj['todo'].push(task);
    i = obj['todo'].indexOf(task);
    console.log( (i+1) + obj['todo'][i].status + ' ' + obj['todo'][i].description);
};

//show task list
var showList = function(obj) {
    taskArr = obj['todo'];
    //console.log(taskArr);
    for (i=0; i<taskArr.length; i++) {
        console.log( (i+1) + obj['todo'][i].status + ' ' + obj['todo'][i].description);
    }
};

var markDone = function(task, obj) {
    j = input1 - 1;
    taskArr = obj['todo'];
    //console.log(taskArr);
    for (i=0; i<taskArr.length; i++) {
        if (i === j) {
            obj['todo'][i].status = '. [X] -';
        }
        console.log( (i+1) + obj['todo'][i].status + ' ' + obj['todo'][i].description);
    }
};

jsonfile.readFile(file, (err, obj) => {
    if (commandType === 'add') {
       addTask(task, obj);
    }
    else if (commandType === 'show') {
        showList(obj);
    }
    else if (commandType === 'done') {
        markDone(task,obj);

    }
    jsonfile.writeFile(file, obj, (err) => {
        //console.log(err)
        });
});