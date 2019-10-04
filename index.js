console.log("---To Do List---");

const command = process.argv[2];
const newTask = process.argv[3];
// console.log("Your command was: "+input);

const jsonfile = require('jsonfile');

const file = 'data.json';

const listItem = (item) => {
    return `${item.index}. [${item.done ? 'X' : ' ' }] - ${item.task} - created: ${item.created} - updated: ${item.updated}`;
}

jsonfile.readFile(file, (err, obj) => {

    switch (command) {
        case "add":
            {
                if(!newTask) {
                    console.log("Please specify new task to be added.");
                    return;
                }

                let lastIndex = obj.toDoItems[obj.toDoItems.length-1].index;

                let newItem = {
                    "index": lastIndex + 1,
                    "done": false,
                    "task": newTask,
                    "created": "04 Oct 2019",
                    "updated": "04 Oct 2019"
                };

                obj.toDoItems.push(newItem);

                jsonfile.writeFile(file, obj, (err) => {
                    if (err) {
                        console.log("Error writing file");
                        console.log(err);
                    };
                    obj.toDoItems.forEach(item => console.log(listItem(item)));
                });
            }
            break;
        case "list":
            {
                // console.log("listing items");
                obj.toDoItems.forEach(item => console.log(listItem(item)));
                break;
            }
        case "help":
            {
                console.log("show help");
                break;
            }
        default:
            {
                console.log("show default help");
                break;
            }
    }

    // console.log(obj);
    // obj["helloworld"] = "monkey";

});