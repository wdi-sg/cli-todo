//console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

//console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    // console.log(obj);
    // obj["helloworld"] = "monkey";

    var choreDone = false;
    var box = "[ ] - ";

    var todoList = obj.todoItems.length;
    var listNo = todoList + ". ";
    // var todoListChore = obj.todoItemsChore.length;
    let chore = process.argv[3];

    function checkDoneChores() {
        if (obj.todoItems.choreDone === true) {
            box = " [X] - ";
        } else if (obj.todoItems.choreDone === false) {
            box = " [ ] - ";
        }
    }

    if (commandType === "add") {
        var date = new Date();
        obj.todoItems.push({
            indexNo: parseInt(obj.todoItems.length+1),
            chore: chore,
            choreDone: false,
            createDate: date
        });
        // obj.todoItems.push(chore);
        // obj.todoItemsChore.push(choreDone);
        // obj.todoItemsCreated.push(date);
    } else if (commandType === "show") {
        for (i = 0; i < todoList; i++) {
            if (obj.todoItems[i].choreDone === true) {
                box = " [X] - ";
            } else if (obj.todoItems[i].choreDone === false) {
                box = " [ ] - ";
            }
            console.log(obj.todoItems[i].indexNo + ". " + box + obj.todoItems[i].chore + ", created at "  + obj.todoItems[i].createDate);
        }
    } else if (commandType === "done") {
        //mark empty as checked
        var listNo = parseInt(process.argv[3]-1);
        obj.todoItems[listNo].choreDone = true;
        box = "[X] - ";
        console.log(obj.todoItems[listNo].indexNo + ". " + box + obj.todoItems[listNo].chore + ", created at "  + obj.todoItems[listNo].createDate);
        // console.log(chore + box + obj.todoItems[listNo]);
        //console.log(listNo + box + obj.todoItems);
    } else if (commandType === "delete") {
        var listNo = parseInt(process.argv[3]-1);
        // split array to delete specific chore
        obj.todoItems.splice(listNo,1);
        // re-assign index numbers
        for (i = listNo; i < todoList; i++) {
            obj.todoItems[listNo].indexNo = parseInt([i]);
        }
    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});
