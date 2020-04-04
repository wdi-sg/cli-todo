const jsonfile = require('jsonfile');
const file = 'data.json';

let commandType = process.argv[2];
let task = process.argv[3];

if (commandType == 'add') {
    jsonfile.readFile(file, (err, obj) => {

        //Add task to list
        let toDoList = obj.todoList;
        toDoList.push((toDoList.length + 1) + '. [ ] - ' + task);

        //Add date that task was added to the list
        let dateCreated = obj.created_at;
        dateCreated.push((dateCreated.length + 1) + '. ' + Date());

        console.log(obj)

        jsonfile.writeFile(file , obj, (err) => {
            console.log(err);
        })
    });
} else if (commandType == 'show') {
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj)
    })
} else if (commandType == 'done') {
    jsonfile.readFile(file, (err, obj) => {

        //Replace unchecked box with checked box
        let toDoList = obj.todoList
        let doneTask = toDoList[process.argv[3] - 1];
        toDoList[process.argv[3] - 1] = doneTask.replace('[ ]', '[x]');

        //Update date task is done
        let updateDate = obj.updated_at;
        updateDate.push((updateDate.length + 1) + '. ' + Date());

        console.log(obj);

        jsonfile.writeFile(file , obj, (err) => {
            console.log(err);
        })
    })
} else if (commandType == 'delete') {
    jsonfile.readFile(file, (err, obj) => {

        //Delete items
        let toDoList = obj.todoList
        toDoList.splice((process.argv[3] - 1), 1);

        let dateCreated = obj.created_at;
        dateCreated.splice((process.argv[3] - 1), 1);

        console.log(obj);

        jsonfile.writeFile(file , obj, (err) => {
            console.log(err);
        })
    })
}