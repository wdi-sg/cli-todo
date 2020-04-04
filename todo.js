// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);


//did without using modules ---------------------------
var nodeArgv = process.argv;
const jsonfile = require('jsonfile');
const file = 'data.json';

var listKey = "todoItems";
var notDoneStatus = "[ ]"
var doneStatus = "[x]"
var itemDone;
var markDoneItem;
var itemDelete;

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

            obj["todoItems"].push(notDoneStatus + " - " +items);
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
            console.log((i+1) + ". " + obj["todoItems"][i]);
        };

    })
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

        markDoneItem = itemDone.toString().split(notDoneStatus).join(doneStatus);
        obj["todoItems"][nodeArgv[3]-1] = markDoneItem;

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