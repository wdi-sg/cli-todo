const figlet = require('figlet');
const jsonfile = require('jsonfile');

const file = 'data.json';

const userInput = process.argv[3];
const userCommandType = process.argv[2];

var addZero = function(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

var setMessage = function (content) {
    figlet(content, function(err, data) {
        if (err) {
            console.log('Something went wrong...');
            console.dir(err);
            return;
        }
        console.log(data)

        console.log('Options');
        console.log('1. View All Items - Type in "node index.js show" to display all your to do to items');
        console.log('2. Add New Item - Type in "node index.js add [task name]" to add new to do item');
        console.log('3. Mark Item as Done - Type in "node index.js done [task #]" to mark to do item as done');
        console.log('4. Delete Item: Type in "node index.js delete [task #]" to delete to do item');
    });
}

var showItems = function () {
    jsonfile.readFile(file, (err, stuff) => {
        stuff.todoItems.forEach(function(toDoItem) {
            if (toDoItem.deleted === "false") {
                if (toDoItem.done == "false") {
                    console.log(`${ toDoItem.id }. [ ] - ${ toDoItem.item }`);
                }
                else if (toDoItem.done == "true") {
                    console.log(`${ toDoItem.id }. [x] - ${ toDoItem.item }`);
                }
            }
        });
    });
}

var addItem = function (toDoItem) {
    jsonfile.readFile(file, (err, stuff) => {
        let temp = {};
        let date = new Date();
        let time = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":"
                    + addZero(date.getSeconds());
        let id =  stuff.todoItems.length + 1;

        temp.id = id;
        temp.item = toDoItem;
        temp.done = "false";
        temp.created_at = time;
        temp.updated_at = "";
        temp.deleted = "false";

        stuff.todoItems.push(temp);

        jsonfile.writeFile(file, stuff, (err) => {
            if (err !== null) {
                console.log(err)
            }
        });
    });
}

var deleteItem = function (id) {
    jsonfile.readFile(file, (err, stuff) => {
        let date = new Date();
        let time = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":"
                    + addZero(date.getSeconds());

        stuff.todoItems.forEach(function(item) {
            if (item.id === Number(id)) {
                item.deleted = "true";
                item.updated_at = time;
            }
        });

        jsonfile.writeFile(file, stuff, (err) => {
            if (err !== null) {
                console.log(err)
            }
        });
    });
}

var markItemAsDone = function (id) {
    jsonfile.readFile(file, (err, stuff) => {
        let date = new Date();
        let time = addZero(date.getHours()) + ":" + addZero(date.getMinutes()) + ":"
                    + addZero(date.getSeconds());

        stuff.todoItems.forEach(function(item) {
            if (item.id === Number(id)) {
                item.done = "true";
                item.updated_at = time;
            }
        });

        jsonfile.writeFile(file, stuff, (err) => {
            if (err !== null) {
                console.log(err)
            }
        });
    });
}

setMessage("Swee Chin - To Do List");

if (userCommandType === "show") {
    showItems();

} else if (userCommandType === "add") {
    addItem(userInput);
    console.log("Item added!")

} else if (userCommandType === "done"){
    markItemAsDone(userInput);
    console.log("Item marked as done!")

} else if (userCommandType === "delete"){
    deleteItem(userInput);
    console.log("Item deleted!")

}