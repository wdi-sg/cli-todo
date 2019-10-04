console.log("---To Do List---");

const command = process.argv[2];
const toDoItem = process.argv[3];
// console.log("Your command was: "+input);

const jsonfile = require('jsonfile');

const file = 'data.json';

const listItem = (item) => {
    return `${item.index}. [${item.done ? 'X' : ' ' }] - ${item.task} - created:${item.created} - updated:${item.updated}`;
}

jsonfile.readFile(file, (err, obj) => {

  switch(command) {
    case "add": {
        console.log("adding item");
        }
        break;
    case "list": {
        // console.log("listing items");
        obj.toDoItems.forEach(item => console.log(listItem(item)));
        break;
        }
    case "help": {
        console.log("show help");
        break;
        }
    default: {
        console.log("show default help");
        break;
        }
  }


  // console.log(obj);
  // obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    if (err) {
        console.log(err)
    };
  });
});