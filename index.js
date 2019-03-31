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

// to show current list items
const show = () => {
    jsonfile.readFile(file, (err, obj) => {
        if (obj.todoItems.length == 0) {
            // if list is empty
            console.log("Your list is currently empty!")
        } else {
            // generate list of items
            console.log("Your list of items to do:");
            console.log("");
            for (var i = 0; i < obj.todoItems.length; i++) {
                let itemNumber = (i+1);
                let itemStatus = obj.doneStatus[i];
                // displays status of item
                if (itemStatus === "false") {
                    statusDisplay = " ";
                    console.log(itemNumber + ". [" + statusDisplay + "] - " + obj.todoItems[i]);
                    console.log("[Created on: " + obj.created_at[i] + "]");
                    console.log("");
                } else {
                    statusDisplay = "x";
                    console.log(itemNumber + ". [" + statusDisplay + "] - " + obj.todoItems[i]);
                    console.log("[Created on: " + obj.created_at[i]);
                    console.log("[Updated on: " + obj.updated_at[i]);
                    console.log("");
                };
            }
        }
    });
};

// to add list items
const add = (userInput) => {
    // console.log(userInput)
    jsonfile.readFile(file, (err, obj) => {
        // create new list item
        obj.todoItems.push(userInput);
        // create default item status of new item
        obj.doneStatus.push("false");
        // pull the date
        let dater = new Date();
        let now = dater.toLocaleString();
        obj.created_at.push(now)
        obj.updated_at.push("")

        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
        });

        console.log(`Added item, showing list...
            `)
        show();
    });
};

// to mark list item as done
const done = (userInput) => {
    jsonfile.readFile(file, (err, obj) => {
        let itemNumber = (userInput-1);
        obj.doneStatus[itemNumber] = "true";
        // pull the date
        let dater = new Date();
        let now = dater.toLocaleString();
        obj.updated_at[itemNumber] = now;

        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
        });

        console.log(`Item marked as done, showing list...
            `)
        show();
    });
};

// to add list items
const del = (userInput) => {
    // console.log(userInput)
    jsonfile.readFile(file, (err, obj) => {
        let itemNumber = (userInput-1);
        // console.log(itemNumber);
        obj.todoItems.splice(itemNumber,1);
        obj.doneStatus.splice(itemNumber,1);
        obj.created_at.splice(itemNumber,1);

        jsonfile.writeFile(file, obj, (err) => {
            if (err) { console.log(err) };
        });

        console.log(`Item marked as done, showing list...
            `)
        show();
    });
};


// what user sees when running node index.js
// different input options
if (commandType === "show") {
    show();
}
else if (commandType === "add") {
    add(userInput);
}
else if (commandType === "done") {
    done(userInput);
}
else if (commandType === "del") {
    del(userInput);
}
else {
    // default
    console.log(`
Welcome to your Todo List.

Commands available:

show : shows current todo list           [ node index.js show             ]
add  : creates new list items            [ node index.js add "boil water" ]
done : marks list item as completed      [ node index.js done 2           ]
del  : deletes list item                 [ node index.js del  1           ]
`);
}