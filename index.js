console.log("works!!");

const jsonfile = require('jsonfile');
const file = 'data.json'

var commandType = process.argv[2];
var input = process.argv[3];

console.log("Your command was: "+commandType);


var showList = function() {
    jsonfile.readFile(file, (err, obj) => {
        if (obj["todo-list"].length === 0) {
            console.log("No tasks in your to-do list");
        } else {
            console.log(`\n${obj["todo-list"].length} tasks in your to-do List \n`);
            for (i=0; i<obj["todo-list"].length; i++) {
                if (obj["todo-list"][i].complete === true) {
                    console.log(`${obj["todo-list"][i].number}. [X] - ${obj["todo-list"][i].desc}`);
                } else {
                    console.log(`${obj["todo-list"][i].number}. [ ] - ${obj["todo-list"][i].desc}`);
                }
            }
        }
    })
}

var addToList = function(input) {
    jsonfile.readFile(file, (err, obj) => {
        var task = {};
        task.number = obj["todo-list"].length + 1;
        task.desc = input;
        task.complete = false;
        obj["todo-list"].push(task);



        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log(err)
            }
        });
    })
}


var markComplete = function(input) {
    jsonfile.readFile(file, (err, obj) => {
        for (i=0; i<obj["todo-list"].length; i++) {
            if (parseInt(input) === obj["todo-list"][i].number) {
                obj["todo-list"][i].complete = true;
            }
        }

        jsonfile.writeFile(file, obj, (err) => {
            if (err) {
                console.log(err)
            }
        });
    })
}










const instructions = function() {
    console.log(`
████████╗ ██████╗ ██████╗  ██████╗     ██╗     ██╗███████╗████████╗
╚══██╔══╝██╔═══██╗██╔══██╗██╔═══██╗    ██║     ██║██╔════╝╚══██╔══╝
   ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║███████╗   ██║
   ██║   ██║   ██║██║  ██║██║   ██║    ██║     ██║╚════██║   ██║
   ██║   ╚██████╔╝██████╔╝╚██████╔╝    ███████╗██║███████║   ██║
   ╚═╝    ╚═════╝ ╚═════╝  ╚═════╝     ╚══════╝╚═╝╚══════╝   ╚═╝

`);
    console.log("How to use");
    console.log(`1. Type node todo.js show to show the to-do list`);
    console.log(`2. Type node todo.js add 'task' to add a new task`);
    console.log(`3. Type node todo.js check 'task number' to check or uncheck the task`);
    console.log(`4. Type node todo.js delete 'task number' to delete task`);
}



if (commandType === "show") {
    showList();
} else if (commandType === "add") {
    addToList(input);
    setTimeout(showList,100);
} else if (commandType === "check") {
    markComplete(input);
    setTimeout(showList,100);
}
else {
    instructions();
}








// jsonfile.readFile(file, (err, obj) => {
//         if (process.argv[2] === "show") {
//             console.log(obj);
//             console.log(obj["todo-list"]);
//             if (Object.keys(obj).length === 0) {
//             console.log("no data");
//             }
//         } else if (process.argv[2] === "add") {
//             console.log("adding items to todo list");
//             if (Object.keys(obj).length === 0) {
//                 obj["todo-list"] = [];
//                 for (i=Object.keys(obj).length+1; i>0; i--) {
//                     // obj["todo-list"][0] = `{item ${i}: ${process.argv[3]}}`;
//                     obj["todo-list"][0] = `${i}. [ ] - ${process.argv[3]}`
//                 }
//                 console.log(`object length is ${Object.keys(obj).length}`)
//             } else {
//                 var todo = `${Object.keys(obj).length+1}. [ ] - ${process.argv[3]}`;
//                 // console.log(todo);
//                 obj["todo-list"].push(todo);
//                 // obj["todo-list"].push(`item ${Object.keys(obj).length+1}: ${process.argv[3]}`);
//             }
//         }
//       console.log(obj);
//       // obj["helloworld"] = "monkey";

//       jsonfile.writeFile(file, obj, (err) => {
//         console.log(err)
//       });
//     });