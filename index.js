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

// 1. Add to the list. (It starts empty) Take user input in node and write into data.json file Ex: node index.js add eat bak kut teh

// const jsonfile = require('jsonfile');
// const file = 'data.json';

// var fakeArr = [];

// for(let i = 3; i < process.argv.length; i++){
//     fakeArr.push(process.argv[i]);
// }

// var joinArr = fakeArr.join(" ");
// console.log(joinArr);

// if(process.argv[2] === "add"){
//     jsonfile.readFile(file, (err, obj) => {
//         console.log(obj);
//         obj.todoItems.push(joinArr);
//             jsonfile.writeFile(file, obj, (err) => {
//                 console.log(err);
//             });
//     });
// }

// 2. Show all the items in the list (Once you have something inside it) Just type node index.js show

// const jsonfile = require('jsonfile');
// const file = 'data.json';

// var fakeArr = [];

// for(let i = 3; i < process.argv.length; i++){
//     fakeArr.push(process.argv[i]);
// }

// var joinArr = fakeArr.join(" ");
// console.log(joinArr);

// if(process.argv[2] === "add"){
//     jsonfile.readFile(file, (err, obj) => {
//         console.log(obj);
//         obj.todoItems.push(joinArr);
//             jsonfile.writeFile(file, obj, (err) => {
//                 console.log(err);
//             });
//     });
// }
// else if(process.argv[2] === "show"){
//     jsonfile.readFile(file, (err, obj) => {
//         console.log(obj);
//         for(let j = 0; j < obj.todoItems.length; j++){
//             console.log((j+1) + " " + "[ ] - " + obj.todoItems[j]);
//         }
//             jsonfile.writeFile(file, obj, (err) => {
//                 console.log(err);
//             });
//     });
// }

// Further 1:- Mark as done Further 2:- create date, Further 3:- delete, Further:- updated, Further:- add ascii

const jsonfile = require('jsonfile');
const file = 'data.json';

var fakeArr = [];

for(let i = 3; i < process.argv.length; i++){
    fakeArr.push(process.argv[i]);
}

var joinArr = fakeArr.join(" ");
console.log(joinArr);

var today = new Date();
var dd = today.getDate();
var mm = today.getMonth() + 1;
var yyyy = today.getFullYear();
today = dd + '/' + mm + '/' + yyyy;

if(process.argv[2] === "add"){
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        obj.todoItems.push({"item": joinArr, "mark": false, "created_at": today, "updated_at": today});
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
    });
}
else if(process.argv[2] === "show"){
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        console.log(`  ___ ___                 ___________.__
 /   |   \   ____ ___.__. \__    ___/|  |__   ___________   ____
/    ~    \_/ __ <   |  |   |    |   |  |  \_/ __ \_  __ \_/ __ \
\    Y    /\  ___/\___  |   |    |   |   Y  \  ___/|  | \/\  ___/
 \___|_  /  \___  > ____|   |____|   |___|  /\___  >__|    \___  >
       \/       \/\/                      \/     \/            \/ `);
        for(let j = 0; j < obj.todoItems.length; j++){
            if(obj.todoItems[j]["mark"] === false){
                console.log((j+1) + " [ ] " + Object.values(obj.todoItems)[j]["item"] + " " + "Created at: " + Object.values(obj.todoItems)[j]["created_at"]);
            }
            else{
                console.log((j+1) + " [X] " + Object.values(obj.todoItems)[j]["item"] + " " + "Created at: " + Object.values(obj.todoItems)[j]["created_at"] + " " + "Updated at: " + Object.values(obj.todoItems)[j]["updated_at"]);
            }
        }
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
    });
}
else if(process.argv[2] === "done"){
    if(isNaN(process.argv[3]) === false){
        var doneInput = process.argv[3];
        var doneNum = doneInput - 1;

        jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        var doneX = obj.todoItems[doneNum];
        doneX.mark = true;
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
        });
    }
}
else if(process.argv[2] === "delete"){
    if(isNaN(process.argv[3]) === false){
        var deleteInput = process.argv[3];
        var deleteNum = deleteInput - 1;

        jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        var deleteX = obj.todoItems.splice(deleteNum, 1);
            jsonfile.writeFile(file, obj, (err) => {
                console.log(err);
            });
        });
    }
}