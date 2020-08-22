//Global Variables
const jsonfile = require('jsonfile');
const file = 'data.json'


//Argument selection ("show"/"add")
var commandType = process.argv[2];
let todoIndex = process.argv[3];



//Main control function
switch(commandType){
    case "add":
        //add next term to the todo list
        let todoItem = process.argv[3];
        jsonfile.readFile(file, (err, obj) => {
            let todoList = obj["todoItems"];
            let todoEntry = {};
            todoEntry["name"] = `${todoItem}`
            todoEntry["status"] = "[ ]"
            todoList.push(todoEntry);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
        break;
    case "show":
        //display current todo list
        jsonfile.readFile(file, (err, obj) => {
            let todoList = obj["todoItems"]
            todoList.forEach((item, index) => {
                todoIndex = index + 1
                console.log(`${todoIndex}. ${item['status']} - ${item['name']}`);
            });
    });
        break;
    case "done":
        doneIndex = parseInt(todoIndex) - 1
        console.log(doneIndex);
        jsonfile.readFile(file, (err, obj) =>{
            let todoList = obj["todoItems"];
            let selectedItem = todoList[doneIndex]
            selectedItem["status"] = "[x]"
            console.log(selectedItem)
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });

    });
        break;
    default:
        console.log('Invalid selection');
        break;
}


// const testObject = {}

// // jsonfile.readFile(file, (err, obj) => {

// //   console.log(obj);

//   jsonfile.writeFile(testObject, (err, obj) => {
//     testObject["part2"] = "test"
//     console.log(testObject)
//   });