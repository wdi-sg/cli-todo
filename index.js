const figlet = require('figlet');
const jsonfile = require('jsonfile');

const file = 'data.json';


var figletMessage = function(message){
    figlet(message, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    });
}

var currentDateAndTime = function(){
    let date = new Date();
    let dateAndTime = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ` + `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`

    return dateAndTime;
}

var addTasks = function(item){
    jsonfile.readFile(file, (err, list) =>{
        let thing = {};

        thing.id = list.toDoItems.length + 1;
        thing.task = item;
        thing.done = false;
        thing.delete = false;
        thing.timeAdded = currentDateAndTime();
        thing.updated_at = "";
        list.toDoItems.push(thing);

        jsonfile.writeFile(file, list, (err) =>{
            if(err !== null){
                console.log(err);
            }
        })
    })
}

var checkForEmptyList = function(list){
    if(list.toDoItems.length == 0){
        return true;
    } else {
        return false;
    }
}

var showTasks = function(){
    jsonfile.readFile(file, (err, list) =>{
        if(checkForEmptyList(list) === true){
            console.log("Please add items to your list!");
        } else {
            list.toDoItems.forEach(function(toDoItems,index){
                if(toDoItems.done === false && toDoItems.delete === false){
                    console.log(toDoItems.id +". " + "[ ] - " + toDoItems.task + " --- Added on: " + toDoItems.timeAdded);
                } else if(toDoItems.done === true && toDoItems.delete === false){
                    console.log(toDoItems.id +". " + "[X] - " + toDoItems.task + " --- Modified on: " + toDoItems.updated_at);
                }
                });
            }
        });
};

var doneWithTask = function(id){
    jsonfile.readFile(file, (err, list)=> {
        if( id > list.toDoItems.length){
            console.log("Item not found. Please try again.");
        } else {
        list.toDoItems[id-1].done = true;
        list.toDoItems[id-1].updated_at = currentDateAndTime();
        }
        jsonfile.writeFile(file, list, (err) =>{
            if(err !== null){
                console.log(err);
            }
        });
    });
}

var deleteTask = function(id){
    jsonfile.readFile(file, (err,list) => {
        if(id > list.toDoItems.length){
            console.log("Item not found. Please try again.")
        } else {
            list.toDoItems[id-1].delete = true;
            list.toDoItems[id-1].updated_at = currentDateAndTime();
        }
        jsonfile.writeFile(file, list, (err) => {
            if(err !== null){
                console.log(err);
            }
        });
    });
}

var clearList = function(){
    jsonfile.readFile(file, (err,list) => {
        list.toDoItems = [];
        jsonfile.writeFile(file, list, (err) => {
            if(err !== null){
                console.log(err);
            }
        })
    });
}

var main = function(userCommand, userInput){
    switch (userCommand) {
        case "show":
        showTasks();
        break;

        case "add":
        addTasks(userInput);
        break;

        case "done":
        doneWithTask(userInput);
        break;

        case "delete":
        deleteTask(userInput);
        break;

        case "clear":
        clearList();
        break;
        //set default
        default:
        figletMessage("The Not-SO \n Handy List Tracker")
    }
}

main(process.argv[2],process.argv[3]);