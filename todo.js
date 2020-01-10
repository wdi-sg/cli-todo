const jsonfile = require('jsonfile');

const file = 'data.json';
var commandType = process.argv[2];
var  task = process.argv[3];

var addToList = (task)=>{
 jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj["todoItems"].push(task);
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
  });
});
}

if(commandType === "add" && task!== null){
    addToList(task);
}