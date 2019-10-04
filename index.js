console.log("---To Do List---");

var input = process.argv[2];

// console.log("Your command was: "+input);

const jsonfile = require('jsonfile');

const file = 'data.json';


const listItem = (item) => {
    return `${item.index}. [${item.done ? 'X' : ' ' }] - ${item.task} - created:${item.created} - updated:${item.updated}`;
}

jsonfile.readFile(file, (err, obj) => {

  obj.toDoItems.forEach(item => console.log(listItem(item)));
  // console.log(obj);
  // obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    if (err) {
        console.log(err)
    };
  });
});