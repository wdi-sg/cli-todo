// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);


//did without using modules ---------------------------
var nodeArgv = process.argv;
const jsonfile = require('jsonfile');
var dateFormat = require('dateformat');
const cTable = require('console.table');

const file = 'data.json';

var listKey = "todoItems";
var notDoneStatus = "[ ]"
var doneStatus = "[x]"
var itemDone;
var markDoneItem;
var itemDelete;
var currentdate;
var datetime;

if (nodeArgv[2] === "add") {
    jsonfile.readFile(file, (err, obj) => {

        if(obj[listKey] === undefined) {
            obj[listKey] = [];
        };

        if(nodeArgv[3] !== undefined) {
            var items = nodeArgv[3];

            for (var i = 0; i <= obj["todoItems"].length; i++) {
                var itemsNum = i+1;
            };

            obj["todoItems"].push(notDoneStatus + " - " + items);
            console.log("Item updated")

            jsonfile.writeFile(file, obj, (err) => {
                console.log(err)
            });

        };

    });
} else if (nodeArgv[2] === "show") {
    jsonfile.readFile(file, (err, obj) => {

        if (obj[listKey].length === 0) {
            console.log("To do list is empty.")
        }

        for (var i = 0; i < obj["todoItems"].length; i++){
            tableItems = obj["todoItems"][i].split(" Updated_at: ");
            console.log(tableItems)
            console.table([
                {
                    "Item No." : (i+1),
                    "To Do List" : tableItems[0],
                    "Updated_at" : tableItems[1]
                }
            ]);
        };
    });
} else if (nodeArgv[2] === "clear") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"] = [];

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });

    });
} else if (nodeArgv[2] === "done") {
    jsonfile.readFile(file, (err, obj) => {
        itemDone = obj["todoItems"][nodeArgv[3]-1];

        var currentdate = new Date();
        datetime = dateFormat(currentdate, "yyyy-mm-dd");
        console.log(datetime)

        markDoneItem = itemDone.toString().split(notDoneStatus).join(doneStatus);
        obj["todoItems"][nodeArgv[3]-1] = markDoneItem + " Updated_at: " + datetime;

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });

    });
} else if (nodeArgv[2] === "delete") {
    jsonfile.readFile(file, (err, obj) => {
        itemDelete = parseInt(nodeArgv[3])-1;
        // console.log(itemDelete);
        obj["todoItems"].splice(itemDelete, 1);
        console.log(nodeArgv[3] + " deleted");

        jsonfile.writeFile(file, obj, (err) => {
        console.log(err);
        });
    });
};