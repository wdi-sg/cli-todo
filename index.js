#!/usr/bin/env node

const jsonfile = require('jsonfile');
const file = 'data.json'

//figlet package for generating ascii art from string
const figlet = require('figlet');

//for the dynamic framework
//const program = require('commander');


var commandType = process.argv[2];
var input1 = process.argv[3];


const addItem = function(newItem) {
    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let created_at = new Date();

            obj.todoItems.push(`${obj.counter}. [ ] - ${newItem}\t\tCreated At: ${created_at}`);
            obj.counter++;

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Writing Done");
                }

            });
        }

    });
}

const showToDoList = function() {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            let str = "";
            for (let i = 0; i < obj.todoItems.length; i++) {
                str += obj.todoItems[i] + "\n";
            }
            console.log(str);
        }
    })
}

const markAsDone = function(itemNum) {
    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let parsedItemNum = parseInt(itemNum);
            let updated_at = new Date();
            let tempArr = obj.todoItems[parsedItemNum - 1].split("");
            tempArr[4] = "x";
            obj.todoItems[parsedItemNum - 1] = tempArr.join("");
            obj.todoItems[parsedItemNum - 1] += `  Updated at: ${updated_at}`;


            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Mark Done");
                }

            });
        }

    });
}

const deleteItem = function(itemNum) {
    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            let parsedItemNum = parseInt(itemNum);
            obj.todoItems.splice(parsedItemNum - 1, 1);

            //after deleting an item, change the number of the items below it to minus 1
            for (let i = parsedItemNum - 1; i < obj.todoItems.length; i++) {
                let str = obj.todoItems[i].split("");
                str[0] = parseInt(str[0]) - 1;
                obj.todoItems[i] = str.join("");
            }
            obj.counter--;

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Delete Done Sir");
                }

            });
        }

    });
}

//using figlet package to generate ascii art from string
const createAscii = function(str) {
    figlet(str, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        } else {
            console.log(data);
        }

    });
}

const showDescription = function(thenThis) {
    createAscii("To-Do List");
    setTimeout(() => {
        console.log("Enter the following commands after execution command for different functions:");
        console.log("1. show - Show all to-do list");
        console.log("2. add [item] - Add new to-do item (use double quotes for item with spaces)");
        console.log("3. done [item number] - Mark a task as done");
        console.log("4. delete [item number] - delete an item");
    }, 100)

}




if (commandType === undefined) {
    showDescription();
} else {
    switch (commandType) {
        case "add":
            addItem(input1);
            break;
        case "show":
            showToDoList();
            break;
        case "done":
            if (isNaN(parseInt(input1))) {
                createAscii("Invalid input");
            } else {
                markAsDone(input1);
            }
            break;
        case "delete":
            if (isNaN(parseInt(input1))) {
                createAscii("Invalid input");
            } else {
                deleteItem(input1);
            }
            break;
        default:
            createAscii("ERROR!!!")
            break;
    }
}


////Algo for commander dynamic CLI
// program
//     .option('-s,--show', 'show the whole list of task')
//     .option('-a,--add <type>', 'add new items into to-do list')
//     .option('-m,--mark <type>', 'mark done item')
//     .option('-d,--delete <type>', 'delete an item');

// program.parse(process.argv);
// if(!program.show&&!program.add&&!program.mark&&!program.delete) showDescription();
// if (program.show) showToDoList();
// if (program.add) addItem(program.add);
// if (program.mark) markAsDone(program.mark);
// if (program.delete) deleteItem(program.delete);