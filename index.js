console.log("works!!", process.argv[2]);

let commandType = process.argv[2];
let task = process.argv[3];

const currentCommand = require('./commands');

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);

      switch (commandType) {
        case "add":
        currentCommand.add(obj, task);
        break;

        case "show":
        currentCommand.show(obj);
        break;

        case "done":
        currentCommand.done(obj, process.argv[3]);
        break;

        case "undone":
        currentCommand.undone(obj, process.argv[3]);
        break;

        case "delete":
        currentCommand.delete(obj, process.argv[3]);
        break;

      };

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });

});

// add = (obj, task) => {
//   let id = obj.todoItems.length + 1;
//   obj.todoItems.push({ "id" : id, "done" : "[ ]", "task": task});

// };

// show = (obj) => {
//   let showList = obj.todoItems.length;

//   for (let i = 0; i < showList; i++) {
//     console.log(`${obj.todoItems[i]["id"]}.${obj.todoItems[i]["done"]} - ${obj.todoItems[i]["task"]}`);
//   }
//   // console.log('check show function');
// };

// done = (obj, id) => {
//     let itemId = process.argv[3];

//     for (let i = 0; i < obj.todoItems.length; i++) {
//         // console.log("for loop running");
//         // console.log(obj.todoItems[i].id);
//          if (parseInt(itemId) === parseInt(obj.todoItems[i].id)) {

//             // console.log("if statement running");
//             obj.todoItems[i].done = "[X]";
//          };
//     // } else {
//     //     console.log('condition not true')
//     // }
//     }
// };

// undone = (obj, id) => {
//     let itemId = process.argv[3];

//     for (let i = 0; i < obj.todoItems.length; i++) {
//          if (parseInt(itemId) === parseInt(obj.todoItems[i].id)) {
//             obj.todoItems[i].done = "[ ]";
//          };

//     }
// };