console.log("works!!");
var commandType = process.argv[2];
var userInput = process.argv[3];
console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

// to add to-do-list
jsonfile.readFile(file, (err, obj) => {
    if(process.argv[2] === 'add'){
        obj["toDoList"] =[];
        console.log(`To Do List added!`);
    }
    else if(process.argv[2] === "show"){
        for(var j=1;j<obj.toDoList.length;j++){
            console.log(`To Do List:\n ${j}. [ ]- ${obj.toDoList[j]}`);
        }
    }

    for(var i=3; i<process.argv.length; i++){
        obj.toDoList.push(process.argv[i]);
    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});