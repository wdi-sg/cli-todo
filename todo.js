// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);

var nodeArgv = process.argv;
const jsonfile = require('jsonfile');
const file = 'data.json';

// var key = "todoItems";

var listKey = "todoItems";
if (nodeArgv[2] === "add") {
    jsonfile.readFile(file, (err, obj) => {

        if(obj[listKey] === undefined) {
            obj[listKey] = [];
        };

        var items = nodeArgv[3];

        for (var i = 0; i <= obj["todoItems"].length; i++) {
            var itemsNum = i+1;
        };

        obj["todoItems"].push(itemsNum+" [ ] - " +items);
        console.log("Item updated")

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
} else if (nodeArgv[2] === "show") {

    jsonfile.readFile(file, (err, obj) => {
        if (obj[listKey].length === 0) {
            console.log("To do list is empty.")
        }
        for (var i = 0; i < obj["todoItems"].length; i++){
            console.log(obj["todoItems"][i]);
        };
    })
} else if (nodeArgv[2] === "clear") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"] = [];

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
    });
};