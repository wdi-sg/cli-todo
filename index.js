//Global Variables
const jsonfile = require('jsonfile');
const file = 'data.json'



//Argument selection ("show"/"add")
var commandType = process.argv[2];
let todoIndex = process.argv[3];
let dateStamp = '';


//Print Date and Time Function
function printDate() {
    let today = new Date();
    dateStamp = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()}`;
    return dateStamp;
}


//Display title
console.log(`

 #####   ##    ####  #    #    #    # # ######   ##   #####  #####
   #    #  #  #      #   #     #    # #     #   #  #  #    # #    #
   #   #    #  ####  ####      #    # #    #   #    # #    # #    #
   #   ######      # #  #      # ## # #   #    ###### #####  #    #
   #   #    # #    # #   #     ##  ## #  #     #    # #   #  #    #
   #   #    #  ####  #    #    #    # # ###### #    # #    # #####

`)


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
            todoEntry["created_at"] = printDate();
            todoEntry["updated_at"] = "";
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
                console.log(`${todoIndex}. ${item['status']} - ${item['name']}
created at: ${item['created_at']}    updated at: ${item['updated_at']}`);
            });
    });
        break;
    case "done":
        doneIndex = parseInt(todoIndex) - 1
        jsonfile.readFile(file, (err, obj) =>{
            let todoList = obj["todoItems"];
            let selectedItem = todoList[doneIndex]
            selectedItem["status"] = "[x]"
            selectedItem["updated_at"] = printDate();
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });

    });
        break;
    case "delete":
        removeIndex = parseInt(todoIndex) - 1
        jsonfile.readFile(file, (err, obj) =>{
            let todoList = obj["todoItems"];
            todoList.splice(removeIndex, 1);
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