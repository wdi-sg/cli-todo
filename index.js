// To build a command-line app
console.log("works!!", process.argv[2]);

let commandType = process.argv[2];
let taskDesc = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');
const file = 'data.json'



let datestamp = function(){
    let date = new Date();
    return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}, ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
};

// Add new task singly
function addTask (description, completionStatus, dateCreated, dateCompleted){
    this.description = description;
    this.completionStatus = completionStatus;  // True for completed; false for not completed
    this.dateCreated = dateCreated;
    this.dateCompleted = dateCompleted;
};


// Read and write new Task
let addNewTask = function(){
    // To create a JS object, use 'new' keyword on custom func addTask
    let newTask = new addTask(taskDesc, false, datestamp(), '');
    console.log(newTask);

    jsonfile.readFile(file, (err, obj)=>{
        if(err){
            console.log('Error on reading');
        } else {
            console.log('Pushing obj into array');
            console.log(obj);
            obj['todoItems'].push(newTask);

            jsonfile.writeFile(file, obj, (err)=>{
                if(err){
                    console.log('Error on writing');
                } else {
                    console.log('Wrote successfully')
                }
            })
        }
    })
};


let showAllTask = function(){
    jsonfile.readFile(file, (err, obj)=>{
        if(err){
            console.log('Error on read');
        } else {

            console.log('No. \t Status \t Task description \t \t Created Date \t \t Completion Date');
            for (var i=0; i < obj['todoItems'].length; i++){

                console.log((i+1).toString() + ' \t [' + (obj['todoItems'][i].completionStatus === false ? ' ' : 'X') + '] \t \t ' + obj['todoItems'][i].description + ' \t \t ' + obj['todoItems'][i].dateCreated + ' \t \t ' + obj['todoItems'][i].dateCompleted);
            }
        }
    })
};


let taskDone = function()
{
    jsonfile.readFile(file, (err, obj)=>{
        if(err){
            console.log('Error on read');
        } else {

            obj['todoItems'][taskDesc-1]['completionStatus'] = true;
            obj['todoItems'][taskDesc-1]['dateCompleted'] = datestamp();

            jsonfile.writeFile(file, obj, (err)=>{
                if(err){
                    console.log('Error on writing');
                } else {
                    console.log('Wrote successfully')
                    showAllTask();
                }
            })
        }
    })
};

// Delete task permanently
let deleteTask = function(){
    jsonfile.readFile(file, (err, obj)=>{
        if(err){
            console.log('Error on read');
        } else {

            obj['todoItems'].splice(parseInt(taskDesc)-1, 1);

            jsonfile.writeFile(file, obj, (err)=>{
                if(err){
                    console.log('Error on writing');
                } else {
                    console.log('Wrote successfully')
                    showAllTask();
                }
            })

        }
    })
};


// Actions based on command type
switch (commandType){
    case "add":
        addNewTask()
        break;
    case "show":
        showAllTask()
        break;
    case "done":
        taskDone()
        break;
    case "delete":
        deleteTask()
        break;
};

