const jsonfile = require('jsonfile');

const file = 'data.json'

const obj = {"toDoItems":[]};


var add = function (newItem) {
    jsonfile.readFile(file, (err, obj) => {

        let data = {};
        let itemNum = JSON.stringify(obj.toDoItems.length + 1);

        data.number = itemNum;
        data.done = "undone";
        data.activity = newItem;

        obj.toDoItems.push(data);
        console.log(data);

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
}

var show = function () {
    jsonfile.readFile(file, (err, obj) => {
        obj.toDoItems.forEach(function(newItem) {
            //console.log(newItem)
                if ( newItem.done == "undone") {
                    console.log( newItem.number + ". [ ] - " + newItem.activity );
                }
                else if ( newItem.done == "done") {
                    console.log( newItem.number + ". [x] - " + newItem.activity );
                }

            jsonfile.writeFile(file, obj, (err) => {
                console.log(err)
            });
        });
    });
}

var done = function (itemNum) {
    jsonfile.readFile(file, (err, obj) => {
        obj.toDoItems.forEach(function(newItem) {
                if ( newItem.number == itemNum) {
                    newItem.done = "done"
                    console.log(newItem.done);
                }
            console.log(newItem)

        });
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
    });
}

const calledFunction = process.argv[2];
const userInput = process.argv[3];

if (calledFunction == "add") {
    add(userInput);
    console.log(obj["toDoItems"]);
} else if (calledFunction == "show") {
    show();
} else if (calledFunction == "done") {
    done(userInput);
}