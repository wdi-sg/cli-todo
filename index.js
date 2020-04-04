const jsonfile = require('jsonfile');
const file = 'data.json'
const processArgv = process.argv;

jsonfile.readFile(file, (err, obj) => {
const todoList = obj["todoItems"];
let num = 0;
        if (process.argv[2] === 'add') {
            let todo = {};
            todo["task"] = process.argv[3];
            let date = new Date()
            todo["created_at"] = date.toISOString();
            todo["isDone"] = '[ ]';
            todo["updated_at"] = '';
            todoList.push(todo);

        } else if (processArgv[2] === 'done') {
            todoList[processArgv[3] - 1].isDone = "[X]";
            let currentDate = new Date();
            todoList[processArgv[3] - 1].updated_at = currentDate.toISOString();
        } else if (processArgv[2] === 'del') {
            let itemToRemove = process.argv[3];
            todoList.splice((itemToRemove - 1), 1);

        }


        for(let i = 0; i < todoList.length; i++) {
            num++;
            console.log(num + '. ' + todoList[i].isDone + ' - ' + todoList[i].task + ', ' + todoList[i].created_at);
        }

        console.log(obj);



  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});