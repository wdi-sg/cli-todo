
console.log("works!!" + process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');
const file = 'data.json'

// var str = '{"todoItems":[]}' ;

jsonfile.readFile(file, (err, obj) => {
    console.log("current list: ", obj);

    // Add new item to array
    obj["todoItems"].push(commandType);

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
    console.log("updated list: ", obj);
});