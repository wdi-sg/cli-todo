// console.log("works!!", process.argv[2]);



// console.log("Your command was: "+commandType);


const jsonfile = require('jsonfile');
const file = 'data.json'

var commandType = process.argv[2];
var input1 = process.argv[3];

const addItem = function(newItem) {
    jsonfile.readFile(file, (err, obj) => {

        if (err) {
            console.log(err)
        } else {
            obj.todoItems.push(`${obj.counter}. [ ] - ${newItem}`)
            obj.counter++;

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("Writing Done");
                }

            });
        }

    });
}

const showToDoList = function() {
    jsonfile.readFile(file, (err, obj) => {
        if (err) {
            console.log(err);
        } else {
            let str = "";
            for (let i = 0; i < obj.todoItems.length; i++) {
                str += obj.todoItems[i] + "\n";
            }
            console.log(str);
        }
    })
}

const showDescription = function() {
    console.log("Later");
}

if (commandType === undefined) {
    showDescription();
} else {
    switch (commandType) {
        case "add":
            addItem(input1);
            break;
        case "show":
            showToDoList();

    }
}