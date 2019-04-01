console.log("works!!", process.argv[2]);
var commandType = process.argv[2];
console.log("Your command was: " + commandType);
const jsonfile = require('jsonfile');
const file = 'data.json'
var array1 = [];
var arrayjoin = array1.join();

jsonfile.readFile(file, (err, obj) => {
    if (process.argv[2] === "add") {
        obj["todoItems"] = [];
        for (var i = 3; i < process.argv.length; i++) {
            obj.todoItems.push(process.argv[i]);
        };

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)

        });
    } else if (process.argv[2] === "show") {
        console.log(err);
        for (let j = 0; j < obj.todoItems.length; j++) {
            console.log(j + 1 + ". [ ] - " + obj.todoItems[j]);
        };
    }
});