var commandType = process.argv[2];

var arg = process.argv[3];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';


jsonfile.readFile(file, (err, obj) => {

    // clear obj
    // obj["todoItems"] = [];

    // format:   1. [] - eat bah kut teh
    if (commandType === "add") {
        let count = obj["todoItems"].length
        obj["todoItems"].push(`${count + 1}. [ ] - ${arg}`);
        console.log(`You have added ${arg} to the to-do list!`)
        jsonfile.writeFile(file, obj, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });
    } else if (commandType === "show") {
        console.log(obj['todoItems'].join("\n"));
    } else if (commandType === "done") {
        let index = arg - 1;
        console.log(obj["todoItems"][index])

        let crossOut = obj["todoItems"].splice(index, 1);
        console.log(`crossOut is ${crossOut}`);

        let taskDone = crossOut[0].replace("[ ]", "[x]");
        console.log(`taskDone is ${taskDone}`);

        obj["todoItems"].splice(index, 0, taskDone);
        console.log(obj["todoItems"]);
        jsonfile.writeFile(file, obj, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });


    }
});