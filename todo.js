const jsonfile = require('jsonfile');
const Table = require('ascii-art-table');

const file = 'data.json';
var commandType = process.argv[2];
var task = process.argv[3];

var getDateTime = ()=>{
       var currentDateTime = new Date();
        var options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
    };
    var dateFormat = currentDateTime.toLocaleString("en-GB",options);
    return dateFormat;
}

var addToList = (task)=>{
   jsonfile.readFile(file, (err, obj) => {
    var currentDateTime = getDateTime();
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
var createTable = (rowData) =>{
        Table.create({
        width : 300,
        data : rowData,
        bars : {
            'ul_corner' : '┏',
            'ur_corner' : '┓',
            'lr_corner' : '┛',
            'll_corner' : '┗',
            'bottom_t' : '┻',
            'top_t' : '┳',
            'right_t' : '┫',
            'left_t' : '┣',
            'intersection' : '╋',
            'vertical' : '┃',
            'horizontal' : '━',
        },
        borderColor : 'bright_white',
        columns : [
                {
                    value : ' Tasks'
                }, {
                    value : ' Created at'
                                    },{
                    value : ' Updated at'
                                    }
            ]
    }, function(rendered){
        // use rendered text
        console.log(rendered);
    });
}
var showTable = ()=>{
    var displayData = [];
    jsonfile.readFile(file, (err, obj) => {
           var tasks = obj["todoItems"];
          if(tasks.length !== 0){
           for(var i = 0;i<tasks.length;i++){
            var taskCol =" "+ (i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]+" ";
            var createTaskAtCol = " "+tasks[i]["created_At"]+" ";
            var updateTaskAtCol = "            ";
            if(tasks[i]["update_At"] !== ""){
                updateTaskAtCol = tasks[i]["update_At"];
            }
            var currentRow = [taskCol,createTaskAtCol, updateTaskAtCol];
            displayData.push(currentRow);
        }
        createTable(displayData);
    }else{
        console.log("No task added");
    }
});
}

var show = () => {
 jsonfile.readFile(file, (err, obj) => {
    var tasks = obj["todoItems"];
    if(tasks.length !== 0){
       for(var i = 0; i <tasks.length; i++){
        var msg = (i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]+ " [created at : "+ tasks[i]["created_At"]+"]";
        if(tasks[i]["update_At"] !== ""){
            msg += "[updated at : "+ tasks[i]["update_At"] + "]";
        }
        console.log(msg);
    }
}else{
    console.log("No tasks added");
}
});
}

var done = (taskNum) =>{
    jsonfile.readFile(file, (err, obj) => {
        var tasks = obj["todoItems"];
        if(taskNumber > 0 && taskNumber <= tasks.length){
            var currentTask = tasks[taskNumber-1];
            if( currentTask["completeTask"] !== '[X]'){
                var currentDateTime = getDateTime();
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
}else if(commandType === "showTable")
    showTable();
}