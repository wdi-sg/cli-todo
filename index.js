var commandType = process.argv[2];

var arg = process.argv[3];

console.log("Your command was: " + commandType);

const jsonfile = require('jsonfile');

const file = 'data.json';

var dateCreated = new Date()

jsonfile.readFile(file, (err, obj) => {


    if (commandType === "add") {

        let count = obj["todoItems"].length;
            if (count === undefined) {
                count = 0;
            }

        obj["todoItems"].push(`${count + 1}. [ ] - ${arg} (Added on ${dateCreated})`);
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

        let taskDone = crossOut[0].replace("[ ]", "[x]");

        let dateUpdated = new Date();
        taskDone.concat(taskDone, `Done on ${dateUpdated}`);
        obj["todoItems"].splice(index, 0, taskDone);
        console.log(obj["todoItems"]);

        jsonfile.writeFile(file, obj, (err) => {
          if (err) {
            console.log(err);
            return;
          }
        });


    } else if (commandType === "delete") {
        let index = arg - 1;
        let toDelete = obj["todoItems"].splice(index, 1);
        console.log(toDelete);

        for (let i = arg; i <= obj["todoItems"].length; i++) {
            let changeNum = obj["todoItems"].splice(i, 1);
            changeNum = changeNum[0].substring(1);
            changeNum = changeNum.concat(`${i}`, changeNum);

            jsonfile.writeFile(file, obj, (err) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                    });
        }
        jsonfile.writeFile(file, obj, (err) => {
                      if (err) {
                        console.log(err);
                        return;
                      }
                    });


    }
});