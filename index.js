const jsonfile = require('jsonfile');
const file = 'data.json';

//chooses options based on prcess.argv[2] inputs (add, show, done)
// if(process.argv[2] == "add"){
//     toDo.addToItems();
//  } else if(process.argv[2] == "show" || process.argv[2] == "done"){
//     toDo.accessList()
//  } else {
//     console.log("Choose your options? (Add to the list? Show your list? Or check Done for the list?)");
// };
var addTasks = function(item){
    jsonfile.readFile(file, (err, list) =>{
        let thing = {};

        thing.id = list.toDoItems.length + 1;
        thing.task = item;
        thing.done = false;
        thing.delete = false;
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
                if(toDoItems.done === false){
                    console.log(toDoItems.id +". " + "[ ] - " + toDoItems.task);
                } else {
                    console.log(toDoItems.id +". " + "[X] - " + toDoItems.task)
                }
                });
            }
        });
};

var doneWithTask = function(id){
    jsonfile.readFile(file, (err, list)=> {
        if( id > list.toDoItems.length){
            console.log("Item not found");
        } else {
        list.toDoItems[id-1].done = true;
        }

        jsonfile.writeFile(file, list, (err) =>{
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
    }

}

main(process.argv[2],process.argv[3]);