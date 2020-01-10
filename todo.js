console.log("works!!", process.argv[2], process.argv[3]);

var commandType = process.argv[2];

//console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    // console.log(obj);
    // obj["helloworld"] = "monkey";
    var emptyBox = "[ ] - ";
    var checkedBox = "[X] - ";
    var listNo = (obj.todoItems.length + 1) + ". ";
    var chore = process.argv[3];

    if (commandType === "add") {
        obj.todoItems.push(listNo + emptyBox + chore)
    } else if (commandType === "show") {
        console.log(obj.todoItems);
    } else if (commandType === "done") {
        // mark empty as checked
        // var doneItem = process.argv[3];
        // obj.todoItems[(doneItem-1)] = doneItem + checkedBox + chore;
    } else if (commandType === "delete") {
        obj.todoItems.pop()
    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});
