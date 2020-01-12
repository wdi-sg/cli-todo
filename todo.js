//package installed and to be used
const jsonfile = require('jsonfile');
const Table = require('ascii-art-table');

const file = 'data.json';
const commandType = process.argv[2];
const task = process.argv[3];

//get formated date and time
const getDateTime = ()=>{
       const currentDateTime = new Date();
        const options = {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        hour12: true,
        minute: "2-digit",
    };
    const dateFormat = currentDateTime.toLocaleString("en-GB",options);
    return dateFormat;
}

///////////////////////////For displaying tasks//////////////////////////////////
/*table of ascii-table package installed format*/
const createTable = (rowData) =>{
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
//header of table to be shown with list of tasks
const createHeader = () =>{
    const artStr = String.raw`
                __________              __
                \__    ___/____    _____|  | __  ______
                  |    |  \__  \  /  ___/  |/ / /  ___/
                  |    |   / __ \_\___ \|    <  \___ \
                  |____|  (____  /____  >__|_ \/____  >
                               \/     \/     \/     \/
`;
console.log(artStr);
}
/*show the current list of tasks added using ascii-table package and string literal templates*/
const show = ()=>{
    const displayData = [];
    jsonfile.readFile(file, (err, obj) => {
           const tasks = obj["todoItems"];
          if(tasks.length !== 0){
           for(let i = 0;i<tasks.length;i++){
            let taskCol =" "+ (i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]+" ";
            let createTaskAtCol = " "+tasks[i]["created_At"]+" ";
            let updateTaskAtCol = "            ";
            if(tasks[i]["update_At"] !== ""){
                updateTaskAtCol = " "+tasks[i]["update_At"]+" ";
            }
            const currentRow = [taskCol,createTaskAtCol, updateTaskAtCol];
            displayData.push(currentRow);
        }
        createHeader();
        createTable(displayData);
    }else{
        console.log("No task");
    }
});
}


///////////////////////////End of function related to showing tasks///////

//add new tasks to list
const addToList = (task)=>{
   jsonfile.readFile(file, (err, obj) => {
    const currentDateTime = getDateTime();
    const taskObj = {
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

/*update task based on number passed in using the taskNumber-1 to get the actual element in the array and updating the status of the task to change the string to '[x]' from '[]'*/
const done = (taskNumber) =>{
    jsonfile.readFile(file, (err, obj) => {
        const tasks = obj["todoItems"];
        if(taskNumber > 0 && taskNumber <= tasks.length){
            const currentTask = tasks[taskNumber-1];
            if( currentTask["completeTask"] !== '[X]'){
                const currentDateTime = getDateTime();
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
        }else{
            console.log("Invalid input");
        }
    });
}
//remove task
const remove = (taskNumber)=>{
  jsonfile.readFile(file, (err, obj) => {
    //check if number is valid
      if(taskNumber > 0 && taskNumber <= obj["todoItems"].length){
         obj["todoItems"].splice((taskNumber-1),1);
         jsonfile.writeFile(file, obj, (err) => {
            if(err!==null){
                console.log(err);
            }
        });
         console.log("Removed");
         show();
     }else{
        console.log("Invalid input");
     }
 });
}
//Display according to user input
var currentInput = function(){
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
}
currentInput();