

const jsonfile = require('jsonfile');
const file = 'data.json'; //"todoItems"
const commandType = process.argv[2].lowerCase();
console.log("Command input is " + commandType);
const userInput = process.argv[3].lowerCase();
console.log("New item is" + commandType);

var createDate = new Date();
console.log(createDate);

const add = (userInput) =>
    console.log("User Input is" + userInput);
    jsonfile.readFile(file, (err, obj) => {
        var itemNumber = userInput +1;
        console.log(itemNumber);
        obj.todoItems[i].itemNumber.push(itemNumber);
        obj.todoItems[i].doneStatus.push("[]");
        obj.todoItems[i].task.push("-" + userInput.value);
        obj.todoItems[i].creationDate.push("Created on: " + createDate);
        obj.todoItems[i].updateDate.push("Task not done yet");

    jsonfile.writeFile(file, obj, (err) => {
        if (err) { console.log(err) };
    });
    console.log(addTask + "function works!");
    });

const remove = (userInput) =>
    console.log("User Input is" + userInput);
    jsonfile.readFile(file, (err, obj) => {
        for (let i = 0; i<todoItems.length; i++) {
            if ( obj.todoItems[i].task === userInput) {
                delete obj.todoItems[i].task

            }
        }

const show =x

// let show = function() {
//     jsonfile.readFile(file, (err, Object) => {
//         if()

// }