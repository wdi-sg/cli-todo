// console.log("works!!", process.argv[2]);

const jsonfile = require('jsonfile');

const file = 'data.json'



var commandType = (process.argv[2]).toUpperCase();

var task = process.argv[3];


console.log("Your command was: "+commandType);


jsonfile.readFile(file, (err, obj) => {

    if (commandType == "ADD") {
        // console.log(task);
        // console.log(obj);
        obj["todoItems"].push(task);

        jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });

    } else if (commandType == "SHOW") {

        for (let i = 0; i < obj.todoItems.length; i++) {
            console.log((i+1)+". [] - "+obj.todoItems[i]);
        }
    }
});
