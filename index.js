// console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

var myarray;

var number, done, title;

jsonfile.readFile(file, (err, obj) => {
// console.log(obj);
if(commandType === 'add'){
    var list = {
    count: obj['todoItems'].length + 1,
    check: false,
    title: ''
    }
    list.title = process.argv[3];
    obj['todoItems'].push(list);
        jsonfile.writeFile(file, obj, (err) => {
            });
    }
if(commandType === 'show'){
  for (var i = 0; i < obj['todoItems'].length; i++) {
       obj['todoItems'][i]
    myarray = obj['todoItems'][i];
        // console.log((myarray));
        console.log(myarray["count"] + " - " + " [ ] " + myarray["title"]);
            }
        }
});

// jsonfile.readFile(file, (err, obj) => {
// if(commandType === "done"){
//     obj["todoItems"];
//         for (var i = 0; i < myarray.length; i++) {
//             if(parseInt(process.argv[4]) === myarray.count){
//             }
//         }
//     }
//     jsonfile.writeFile(file, obj, (err) => {
//                 });
// });