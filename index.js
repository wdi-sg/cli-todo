// console.log("works!!", process.argv[2]);


// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);

// const jsonfile = require('jsonfile');
// const file = 'data.json'


// jsonfile.readFile(file, (err, obj) => {

//     if (process.argv[2] === "add") {
//         obj["todoItems"].push(process.argv[3])
//     }

//     for (let i = 0; i < obj["todoItems"].length; i++) {
//     console.log(i + 1 +". [ ] - " + obj["todoItems"][i]);
//     }

//   console.log(obj);


//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });

const jsonfile = require('jsonfile');

const file = 'data.json'

let commandType = process.argv[2];
let toDoItem = process.argv[3];
let parseItem = parseInt(toDoItem);

let addItem = obj => {
    if (commandType === "add") {
        obj["todoList"].push(". [] - ");
        obj["todoItems"].push(toDoItem);
        obj["date"].push(" [created at " + new Date() + "]");
        for (let i = 0; i < obj["todoItems"].length; i++) {
            obj["listNum"][i] = i + 1;
            console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
        }
    }
};


let showItem = obj => {
    if (commandType === "show") {
        for (let i = 0; i < obj["todoItems"].length; i++) {
            obj["listNum"][i] = i + 1;
            if (obj["listNum"][i] === i + 1) {
                console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
            }
        }
    }
};

let doneItem = obj => {
    for (let i = 0; i < obj["todoItems"].length; i++) {
        obj["listNum"][i] = i + 1;
        if (i + 1 === parseItem) {
            obj["todoList"][i] = ". [x] - ";
            obj["date"][i] = " [updated at " + new Date() + "]";
        }
        console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
    }
};


let deleteItem = obj => {
    for (let i = 0; i < obj["todoItems"].length; i++) {
        obj["listNum"][i] = i + 1;
        if (i + 1 === parseItem) {
            obj["todoItems"].splice(i, 1);
            obj["todoList"].splice(i, 1);
            obj["date"].splice(i, 1);
    } console.log(obj["listNum"][i] + obj["todoList"][i] + obj["todoItems"][i] + obj["date"][i]);
    }
};


jsonfile.readFile(file, (err, obj) => {
    if (commandType === "add") {
        addItem(obj);
    } else if (commandType === "show") {
        showItem(obj);
    } else if (commandType === "done") {
        doneItem(obj);
    }
    else if (commandType === "delete") {
        deleteItem(obj);
    }
    else {
        console.log("Welcome to your personal to do app! \n Type \'add\' followed by what activity you would like to start doing. \n Type \'show\' to display the items in your current to-do-list. \n Type \'done\' followed by the number of the list item to mark that item as completed. \n Type \'delete\' followed by the number of the list item to remove the unwanted item.")
     }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});