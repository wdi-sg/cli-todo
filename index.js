const jsonfile = require('jsonfile');

const file = 'data.json';

let commandType = process.argv[2];
let task = process.argv[3];

jsonfile.readFile(file, (err, obj) => {
if (commandType === "add") {
        obj.todoItems[obj.counter - 1] = obj.counter + ".[ ] " + task;
        obj.counter = obj.counter + 1;
} else if (commandType === "show") {
    for (let i = 0; i < obj.todoItems.length; i++) {
        console.log(obj.todoItems[i]);
    }
}
  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});