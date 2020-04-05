// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);


//did without using modules ---------------------------
var nodeArgv = process.argv;
const jsonfile = require('jsonfile');
var dateFormat = require('dateformat');
const cTable = require('console.table');
const CFonts = require('cfonts');

//ascii font
CFonts.say('To D0 List', {
    font: 'chrome',              // define the font face
    align: 'left',              // define text alignment
    colors: ['#f80',"green", "blueBright"],         // define all colors
    background: 'transparent',  // define the background color, you can also use `backgroundColor` here as key
    letterSpacing: 1,           // define letter spacing
    lineHeight: 1,              // define the line height
    space: true,                // define if the output text should have empty lines on top and on the bottom
    maxLength: '0',             // define how many character can be on one line
    gradient: false,            // define your two gradient colors
    independentGradient: false, // define if you want to recalculate the gradient for each new line
    transitionGradient: false,  // define if this is a transition between colors directly
    env: 'node'                 // define the environment CFonts is being executed in
});



const file = 'data.json';

var listKey = "todoItems";
var notDoneStatus = "[ ]"
var doneStatus = "[x]"
var itemDone;
var markDoneItem;
var itemDelete;
var currentdate;
var datetime;
var table = [];

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

            obj["todoItems"].push(notDoneStatus + " - " + items);
            console.log(items+" updated");

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
            tableItems = obj["todoItems"][i].split(" Updated_at: ");
            tableObj = {
                "Item No." : (i+1),
                "To Do List" : tableItems[0],
                "Updated_at" : tableItems[1]
            }
            table.push(tableObj);
        };
        console.table(table);
    });
} else if (nodeArgv[2] === "clear") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"] = [];
        console.log("All cleared.")

        jsonfile.writeFile(file, obj, (err) => {
            console.log(err);
        });
    });
} else if (nodeArgv[2] === "done") {
    jsonfile.readFile(file, (err, obj) => {
        itemDone = obj["todoItems"][nodeArgv[3]-1];

        var currentdate = new Date();
        datetime = dateFormat(currentdate, "yyyy-mm-dd");
        console.log("Updated_by: "+datetime);

        markDoneItem = itemDone.toString().split(notDoneStatus).join(doneStatus);
        obj["todoItems"][nodeArgv[3]-1] = markDoneItem + " Updated_at: " + datetime;

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