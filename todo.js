const jsonfile = require('jsonfile');

const file = 'data.json';
var commandType = process.argv[2];
var task = process.argv[3];

var addToList = (task)=>{
   jsonfile.readFile(file, (err, obj) => {
    var currentDateTime = new Date();
    var taskObj = {
        "task":task,
        "completeTask":"[ ]",
        "created_At":currentDateTime.toLocaleString(),
        "update_At" :""
    }
    obj["todoItems"].push(taskObj);
    jsonfile.writeFile(file, obj, (err) => {
      if(err!==null){
        console.log(err);
    }
});
    show();
});
}

var show = () => {
   jsonfile.readFile(file, (err, obj) => {
     var tasks = obj["todoItems"];
     for(var i = 0; i <tasks.length; i++){
        var msg = (i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]+ " [created at : "+ tasks[i]["created_At"]+"]";
        if(tasks[i]["update_At"] !== ""){
            msg += "[updated at : "+ tasks[i]["update_At"] + "]";
        }
        console.log(msg);
    }
});
}
var done = (taskNum) =>{
    jsonfile.readFile(file, (err, obj) => {
        var tasks = obj["todoItems"];
        if(taskNumber > 0 && taskNumber <= tasks.length){
            var currentTask = tasks[taskNumber-1];
            if( currentTask["completeTask"] !== '[X]'){
                var currentDateTime = new Date();
                currentTask["completeTask"] = '[X]';
                currentTask["update_At"] = currentDateTime.toLocaleString();
                jsonfile.writeFile(file, obj, (err) => {
                    if(err!==null){
                        console.log(err);
                    }
                });
            }else{
                console.log("Already updated!");
            }
            show();

        }
    });
}

var remove = (taskNumber)=>{
  jsonfile.readFile(file, (err, obj) => {
      if(taskNumber > 0 && taskNumber <= obj["todoItems"].length){
         obj["todoItems"].splice((taskNumber-1),1);
         jsonfile.writeFile(file, obj, (err) => {
            if(err!==null){
                console.log(err);
            }
        });
         show;
     }
 });
}
if(task!==null){
    if(commandType === "add"){
        addToList(task);
    }else if(commandType === "show"){
        show();
    }else if(commandType === "done"){
       var taskNumber = parseInt(task);
       if(isNaN(task)=== false){
        done(taskNumber);
    }
}else if(commandType === "remove"){
    var taskNum = parseInt(task);
    if(isNaN(taskNum) === false){
        remove(taskNum);
    }
}
}