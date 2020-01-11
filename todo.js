//console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

//console.log("Your command was: "+commandType);

// {
//   "todoItems": [
//   ]
// }

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    // console.log(obj);
    // obj["helloworld"] = "monkey";

    var choreDone = false;
    var box;

    // set boolean true or false for done-ness

    // don't have to store in this format
    // only need to display in this format
    var todoList = obj.todoItems.length;
    var todoListChore = obj.todoItemsChore.length;
    let chore = process.argv[3];

    function checkDoneChores() {
        if (choreDone === true) {
            box = " [X] - ";
        } else if (choreDone === false) {
            box = " [ ] - ";
        }
    }

    if (commandType === "add") {
        choreDone === false;
        var date = new Date();
        obj.todoItems.push(chore);
        obj.todoItemsChore.push(choreDone);
        obj.todoItemsCreated.push(date);
    } else if (commandType === "show") {
        for (i = 0; i < todoList; i++) {
            checkDoneChores();
            var listNo = parseInt(parseInt([i]) + 1) + ". ";
            if (obj.todoItemsChore[i] === true) {
                box = " [X] - ";
            } else if (obj.todoItemsChore[i] = true === false) {
                box = " [ ] - ";
            }
            console.log(listNo + box + obj.todoItems[i]);
                // +
        }
    } else if (commandType === "done") {
        //mark empty as checked
        var listNo = parseInt(process.argv[3]-1);
        obj.todoItemsChore[listNo] = true;
        box = " [X] - ";
        console.log(chore + box + obj.todoItems[listNo]);
        //console.log(listNo + box + obj.todoItems);
    } else if (commandType === "delete") {
        var listNo = parseInt(process.argv[3]-1);
        obj.todoItems.splice(listNo,1);
        obj.todoItemsChore.splice(listNo,1);
        obj.todoItemsCreated.splice(listNo,1);
        // obj.todoItems.pop()
    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});
