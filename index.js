// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["helloworld"] = "monkey";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });
console.log("jello")

const jsonfile = require('jsonfile');
const file = 'data.json'

var commandType = process.argv[2];
var input1 = process.argv[3];

var addItem = function(newItem) {
    jsonfile.readFile(file, (err, obj) => {
    if (err) {
            console.log(err)
        } else {
            let created_at = new Date();

            obj.todoItems.push(`${obj.counter}. [ ] - ${newItem}\t\tCreated At: ${created_at}`);
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
};

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
};