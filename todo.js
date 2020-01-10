const jsonfile = require('jsonfile');

const file = 'data.json';
var commandType = process.argv[2];
var task = process.argv[3];

var addToList = (task)=>{
 jsonfile.readFile(file, (err, obj) => {
  var taskObj = {
    "task":task,
    "completeTask":"[ ]"
  }
  obj["todoItems"].push(taskObj);
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
  });
      show();
});
}

var show = () => {
   jsonfile.readFile(file, (err, obj) => {
    var tasks = obj["todoItems"];
    for(var i = 0; i <tasks.length; i++){
        console.log((i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]);
    }
});
}
var done = (taskNum) =>{
jsonfile.readFile(file, (err, obj) => {
  if(taskNumber > 0 && taskNumber <= obj["todoItems"].length)
     obj["todoItems"][taskNumber-1]["completeTask"] = '[X]';
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err);
  });
       show();
});
}
if(commandType === "add" && task!== null){
    addToList(task);
}else if(commandType === "show"){
    show();
}else if(commandType === "done" && task!== null){
   var taskNumber = parseInt(task);
   if(isNaN(task)=== false){
    done(taskNumber);
}
}