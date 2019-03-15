const jsonfile = require('jsonfile');
const file = 'data.json'

console.log("works!!", process.argv[2]);

var commandType = process.argv[2];

console.log("Your command was: "+commandType);
var toDoItem = [];
if(commandType == "add"){
    toDoItem.push("[] - "+process.argv[3]);
    console.log(toDoItem);
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj);
        obj.push("[] - " + process.argv[3]);
        jsonfile.writeFile(file, obj, (err) => {
            console.log(err)
        });
      });
    
}else if (commandType == ".showlist"){
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    });
}



jsonfile.readFile(file, (err, obj) => {
  console.log(obj);
  obj.push(process.argv[3]);

  // jsonfile.writeFile(file, obj, (err) => {
  //   console.log(err)
  // });
});
