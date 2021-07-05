// console.log("works!!", process.argv[2]);

const jsonfile = require('jsonfile');

const file = 'data.json'

const date = require('./date');
var currentDate = date.getDate();
console.log(currentDate);

var commandType = (process.argv[2]).toUpperCase();

var task = process.argv[3];


console.log("Your command was: "+commandType);


jsonfile.readFile(file, (err, obj) => {

    var addEntry = {
        task: task,
        created_at: currentDate,
        status: "N",
        updated_at:""
    }

    if (commandType == "ADD") {
        // console.log(task);
        // console.log(obj);
        obj["todoItems"].push(addEntry);

    } else if (commandType == "SHOW") {

        for (let i = 0; i < obj.todoItems.length; i++) {
            if(obj.todoItems[i].status == "Y") {
                console.log((i+1)+". [X] - "+obj.todoItems[i].task+" - "+obj.todoItems[i].created_at+" - "+obj.todoItems[i].updated_at);
            } else {
                console.log((i+1)+". [ ] - "+obj.todoItems[i].task+" - "+obj.todoItems[i].created_at+" - "+obj.todoItems[i].updated_at);
            }
        }

    } else if (commandType == "DONE") {

        let denote = parseInt(task)-1;
        obj.todoItems[denote].status = "Y";
        obj.todoItems[denote].updated_at = currentDate;

    } else if (commandType == "DELETE") {

        let denote = parseInt(task)-1;
        obj.todoItems.splice(denote, 1);

    }

    jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
    });

});
