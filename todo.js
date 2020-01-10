const jsonfile = require('jsonfile');
const Table = require('ascii-art-table');

const file = 'data.json';
const commandType = process.argv[2];
const task = process.argv[3];

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
const showTable = ()=>{
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
        console.log("No task added");
    }
});
}

const show = () => {
 jsonfile.readFile(file, (err, obj) => {
    const tasks = obj["todoItems"];
    if(tasks.length !== 0){
       for(let i = 0; i <tasks.length; i++){
        let msg = (i+1)+'. '+tasks[i]["completeTask"] +' - ' + tasks[i]["task"]+ " [created at : "+ tasks[i]["created_At"]+"]";
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

const done = (taskNum) =>{
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

        }
    });
}

const remove = (taskNumber)=>{
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