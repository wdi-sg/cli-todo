const jsonfile = require('jsonfile');
const file = 'data.json'

//time task added
let updated_at = new Date(new Date().getFullYear(),new Date().getMonth() , new Date().getDate());

///////////////////////////////////////////////////////////////
//ask for input
var userCommand = process.argv[2];
var userTask = process.argv[3];

///////////////////////////////////////////////////////////////
function instructions(){
var instruction = `
Use the following commands for the respective functions.
Use the command "add" followed by your to-do task in "", eg. add "walk the dog"

add - To add a new task to the list.
delete - To delete a task from the list.
show - To show all the tasks
done - To mark a task as done.
`;
console.log(instruction);
// console.log(userCommand);
}

///////////////////////////////////////////////////////////////
    switch(userCommand){

        case undefined:
        instructions();
        break;

        case 'add':
        storeTask(userTask);
        break;

        case 'reset':
        resetCounter();
        break;

        case 'show':
        showTasks();
        break;

        case 'done':
        doneTask(userTask);
        break;

        case 'delete':
        deleteTask(userTask);
        break;
    }


///////////////////////////////////////////////////////////////
//read and write to json file
function storeTask(value){

    //read JSON data
    jsonfile.readFile(file, (err, obj) => {

    //get user input
    if(err){
        console.log(err)
    }
    else{
        obj.todoItems.push(`${obj.counter}. [] - ` + value);
        obj.counter++;
        // console.log("Added:\n"+obj.todoItems[obj.todoItems.length-1]);
        for(let i=0; i<obj.todoItems.length;i++){
        console.log(obj.todoItems[i]);
        }
    }

    //write to JSON
    jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)

  });

});
}
///////////////////////////////////////////////////////////////
//read and write to json file
function showTasks(){

    //read JSON data
    jsonfile.readFile(file, (err, obj) => {

    //get user input
    if(err){
        console.log(err)
    }
    else{
        for(let i=0; i<obj.todoItems.length;i++){
        console.log(obj.todoItems[i]);
        }
    }

  //   //write to JSON
  //   jsonfile.writeFile(file, obj, (err) => {
  //   // console.log(err)

  // });

});
}

///////////////////////////////////////////////////////////////
function resetCounter(){
    //read JSON data
    jsonfile.readFile(file, (err, obj) => {

    if(err){
        console.log(err)
    }
    else{

        // obj.todoItems.forEach(function(task){
        obj.todoItems.length=0;
        obj.counter=1;
        console.log("Counter reset");
    }

    //write to JSON
    jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)
    });

});
}

///////////////////////////////////////////////////////////////
//read and write to json file
function doneTask(value){

    //read JSON data
    jsonfile.readFile(file, (err, obj) => {

    //get user input
    if(err){
        console.log(err)
    }
    else{

        for(let i=0; i<obj.todoItems.length;i++){
            if(obj.todoItems[i].includes(value.toString())){
                obj.todoItems[i] = obj.todoItems[i].replace('[]','[X]') + `, completed at ${updated_at.toLocaleDateString()}`;
                showTasks();
            }
        }
    }
    //write to JSON
    jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)

  });

});
}
///////////////////////////////////////////////////////////////
//read and write to json file
function deleteTask(value){

    //read JSON data
    jsonfile.readFile(file, (err, obj) => {

    //get user input
    if(err){
        console.log(err)
    }
    else{

        for(let i=0; i<obj.todoItems.length;i++){
            if(obj.todoItems[i].includes(value.toString())){
            obj.todoItems.splice(i,1);
            console.log('Task deleted.');

                //minus 1 from the tasks' num below task deleted
                for(let j=value-1; j<obj.todoItems.length;j++){
                    let num = obj.todoItems[j].match(/(\d+)/);
                    if (num){
                        obj.todoItems[j] = obj.todoItems[j].replace(num[0],j+1)
                    }
                }
            obj.counter--;
            showTasks();
            }

        }
    }
    //write to JSON
    jsonfile.writeFile(file, obj, (err) => {
    if (err){
        console.log(err)
    }

  });

});
}









