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

if add,
obj.todoItems.push(userInput)

if del,
obj.todoItems.splice(userInput,1)

user runs node index.js:
sees current list and how to use guide (add, done)
*/

const jsonfile = require('jsonfile');

const file = 'data.json'

const commandType = process.argv[2];
const userInput = process.argv[3]


// to add list items
const add = (userInput) => {
    // console.log(userInput)
    jsonfile.readFile(file, (err, obj) => {
        obj.todoItems.push(userInput)

        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
        });

        console.log(`Added item, showing list...
            `)
        show();
    });
};

// to show current list items
const show = () => {
    jsonfile.readFile(file, (err, obj) => {
        if (obj.todoItems.length == 0) {
            console.log("Your list is currently empty!")
        } else {
            console.log("Your list of items to do:")
            for (var i = 0; i < obj.todoItems.length; i++) {
                console.log(obj.todoItems[i])
            }
        }
    });
};


// what user sees when running node index.js
console.log(`
Welcome to Khairi's Todo List.
`);

// different input options
if (commandType === "show") {
    show();
}
else if (commandType === "add") {
    add(userInput);
}
else {
    // default
    console.log(`
Commands available:

show : shows current todo list           [ node index.js show             ]
add  : creates new list items            [ node index.js add "boil water" ]
done : marks list item as completed      [ (coming soon!)                 ]
del  : deletes list item                 [ (coming soon!)                 ]
`);
}