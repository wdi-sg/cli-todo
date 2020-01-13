const jsonfile = require('jsonfile');
const file = 'data.json';

var task = {};

let thirdWord = process.argv[2];
let todoInput = process.argv[3];


// jsonfile.readFile(file, function (err, obj) {
//   if (err) console.error(err)
//   console.dir(obj.todoItems.length)
// })

jsonfile.readFile(file, (err, obj) => {


    if (thirdWord === "add") {
        let todoTask = Object.create(task);

        todoTask.task = obj.todoItems.length + 1;
        todoTask.name = todoInput;
        todoTask.status = false;


        obj["todoItems"].push(todoTask);


        for(let i = 0; i<obj.todoItems.length; i++){
            if(obj.todoItems.status === false){
                console.log(obj.todoItems[i].task +". [ ] - " + obj.todoItems[i].name);
            }
            if(obj.todoItems.status === true){
                console.log(obj.todoItems[i].task +". [x] - " + obj.todoItems[i].name);
            }
        }
    }

            // if (thirdWord === obj.todoItems[i].name) {
            //     console.log("Task has already been recorded, please try again.");
            // }


    // if (thirdWord === "show"){

    //     for(let i = 0; i<obj.todoItems.length; i++){
    //         console.log(obj.todoItems[i].task +". [ ] - " + obj.todoItems[i].name);
    //     }
    // }



  jsonfile.writeFile(file, obj, (err) => {
    console.log("logged")
  });

});






