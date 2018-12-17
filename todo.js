const jsonfile = require('jsonfile');
const file = 'data.json';

if (process.argv[2] === "add") {
   var taskToDone = "";
   for (i = 3; i < process.argv.length; i++) {
       taskToDone = taskToDone + process.argv[i] + " ";
   }


   jsonfile.readFile(file, (err, obj) => {

       var newItem = {done: false, task: taskToDone};
       obj.todoItems.push(newItem);

       jsonfile.writeFile(file, obj, (err) => {
       console.log(err)
   });
   });
}

if (process.argv[2] === "show"){

   jsonfile.readFile(file, (err, obj) => {

   for (i = 0; i < obj.todoItems.length; i++ ) {
       console.log(obj.todoItems[i].task);
       }
   })
}


