/*
Create a todo list.
eg:
1. [ ] - eat bak kut teh
user can add to list, date created, mark done and display date when completed, show whole list

show date:
    var dateCreated = new Date();
    console.log(dateCreated)

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj["helloworld"] = "monkey";

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});

var commandType = process.argv[2];
var userInput = process.argv[3]

if add,
obj.todoItems.push(userInput)

if del,
obj.todoItems.splice(userInput,1)


*/



const jsonfile = require('jsonfile');

const file = 'data.json'

const commandType = process.argv[2];
const userInput = process.argv[3]

// user runs node index.js:
// sees current list and how to use guide (add, done)

// jsonfile.readFile(file, (err, obj) => {

//   // console.log(obj.todoItems[0]);
//   // console.log(process.argv)
//   let userInput = process.argv[2]
//   obj.todoItems.push(userInput)
//   console.log("list of items to do: ",obj.todoItems)

// });

console.log(`
Welcome to Khairi's Todo List.
`);

const show = () => {
    jsonfile.readFile(file, (err, obj) => {
        if (obj.todoItems.length === 0) {
            console.log("Your list is currently empty!")
        } else {
            for (var i = 0; i < obj.todoItems.length; i++) {
                console.log(obj.todoItems[i])
            }
        }
    });
};


if (commandType === "show") {
    show();
}
else {
    console.log(`
Commands available:
show: shows curent todo list
add: creates new list item
done: marks list item as completed
del: deletes list item
`);
}