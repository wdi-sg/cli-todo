console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
let task = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  // obj["helloworld"] = "monkey";
  add(obj, task);

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});

add = (obj, task) => {
  let id = obj.todoItems.length + 1;
  obj.todoItems.push({ "id" : id, "task": task});
};