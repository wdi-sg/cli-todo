let commandType = process.argv[2];
let commandString = process.argv[3];
let praseCString = parseInt(process.argv[3]);
const jsonfile = require('jsonfile');
const file = 'data.json'

switch (commandType) {
    case "add":
        if (process.argv[4] == undefined) {
            jsonfile.readFile(file, (err, obj) => {
                obj.toDoItems.push(commandString);
                obj.done.push(false);
                console.log("Added '" + commandString + "' to ToDo List.");
                jsonfile.writeFile(file, obj, (err) => {
                    if (err != null) {
                        console.log(err);
                    } // closing bracket for "if"
                }); //closing bracket for "writeFile"
            }); //closing bracket for "readFile"
        } else {
            console.log("Please keep the toDo Item in 1 string.")
        } //closing bracket for if and else
    break;
    case "show":
        jsonfile.readFile(file, (err,obj) => {
            for (var i = 0; i < obj.toDoItems.length; i++) {
                if (obj.done[i] == false) {
                    console.log(i + 1 + ". [   ] - "+ obj.toDoItems[i]);
                } else {
                    console.log(i + 1 + ". [ x ] - " + obj.toDoItems[i]);
                } //closing bracket for if and else
            }//closing brackets for For loop
        }) //closing bracket for readFile
    break;
    case "done":
        jsonfile.readFile(file, (err, obj) => {
            if (obj.toDoItems[(praseCString - 1)] !== undefined) {
                obj.done[(praseCString - 1)] = true;
                console.log(commandString + ". '" + obj.toDoItems[(praseCString - 1)] + "' is done.");
            } else {
                console.log("Invalid Input");
            }
                jsonfile.writeFile(file, obj, (err) => {
                    if (err != null) {
                        console.log(err);
                    } // closing bracket for "if"
                }); //closing bracket for "writeFile"
            }); //closing bracket for "readFile"
    break;
    default:
        console.log("Please type a recognizable command. Eg. 'add', 'show' or 'done'");
}


