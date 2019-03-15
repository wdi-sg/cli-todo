const jsonfile = require('jsonfile');
const file = 'data.json'
String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);
}
console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);
var toDoItem = [];
if(commandType == "add"){
    // toDoItem.push("[] - "+process.argv[3]);
    // console.log(toDoItem);
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        obj.push(obj.length + ". [ ] - " + process.argv[3] + " Created on: " + new Date());
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
      });
    
}else if (commandType == "show"){
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    });
}else if ( commandType == "done"){
    let indx = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        obj[indx] = obj[indx].replaceAt(4,"X")
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
      });
}else if (commandType == "delete"){
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        obj.splice(process.argv[3]);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
      });
}



// jsonfile.readFile(file, (err, obj) => {
//   console.log(obj);
//   obj.push(process.argv[3]);

//   // jsonfile.writeFile(file, obj, (err) => {
//   //   console.log(err)
//   // });
// });
