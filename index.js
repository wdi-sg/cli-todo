const jsonfile = require('jsonfile');
const moment = require('moment');
const figlet = require('figlet');
const columnify = require('columnify');
var colors = require('colors');

const command = process.argv[2];
const input = process.argv[3];

const file = 'data.json';

const columnifyItems = (toDoItems) => {

    const columnifiedItems = columnify(toDoItems, {
        columnSplitter: ' | ',
        config: {
            index: {
                headingTransform: () => "#",
            },
            done: {
                headingTransform: () => "Done?",
                dataTransform: done => done === "true" ? "✔" : ""
            },
            task: {
                headingTransform: () => "Task",
            },
            created: {
                minWidth: 35,
                headingTransform: () => "Created",
            },
            updated: {
                minWidth: 35,
                headingTransform: () => "Updated",
            }
        }
    })

    return columnifiedItems;
};

const printList = (toDoItems) => {
    console.log(columnifyItems(toDoItems).split("\n")[0].underline.bgGray);
    console.log(columnifyItems(toDoItems).substring(columnifyItems(toDoItems).indexOf("\n") + 1).underline.gray);
};

const instructions = {
    add: "add new task",
    show: "show tasks",
    done: "check and uncheck task as done",
    delete: "delete a task",
    help: "show this message"
};


console.log(figlet.textSync('To Do List', {
    font: 'Larry 3D',
    horizontalLayout: 'default',
    verticalLayout: 'default'
}).rainbow);


jsonfile.readFile(file, (err, obj) => {

    switch (command) {
        case "add":
            {
                if (!input) {
                    console.log("*** Please specify the name of the task to be added. ***".red);
                    return;
                } else {

                    let lastIndex;

                    if (!obj.toDoItems.length) {
                        lastIndex = 0;
                    } else {
                        lastIndex = obj.toDoItems[obj.toDoItems.length - 1].index;
                    }

                    let newItem = {
                        "index": lastIndex + 1,
                        "done": false,
                        "task": input,
                        "created": moment().format("LLLL"),
                        "updated": "-"
                    };

                    obj.toDoItems.push(newItem);

                    jsonfile.writeFile(file, obj, (err) => {
                        if (err) {
                            console.log("*** Error writing file. ***");
                            console.log(err);
                        };
                        printList(obj.toDoItems);
                    });
                }
            }
            break;
        case "show":
            {
                printList(obj.toDoItems);
                break;
            }
        case "done":
            {
                if (!obj.toDoItems.length) {
                    console.log("*** To do list is empty, please add a task ***".yellow);
                    return;
                } else {
                    if (!input) {
                        console.log("*** Please specify the task to be marked done. ***".red);
                        printList(obj.toDoItems);
                        return;
                    } else if (input > obj.toDoItems.length || input <= 0) {
                        console.log("*** Please specify a valid task number. ***".red);
                        printList(obj.toDoItems);
                    } else {
                        let doneItem = obj.toDoItems[input - 1];

                        doneItem.done = !doneItem.done;
                        doneItem.updated = moment().format("LLLL");

                        obj.toDoItems[input - 1] = doneItem;

                        jsonfile.writeFile(file, obj, (err) => {
                            if (err) {
                                console.log("Error writing file");
                                console.log(err);
                            };
                            printList(obj.toDoItems);
                        });
                    }
                }
                break;
            }
        case "delete":
            {
                if (!obj.toDoItems.length) {
                    console.log("*** To do list is empty, please add a task. ***".yellow);
                    return;
                } else {
                    if (!input) {
                        console.log("*** Please specify the task to be deleted. ***".red);
                        printList(obj.toDoItems);
                        return;
                    } else if (input > obj.toDoItems.length || input <= 0) {
                        console.log("*** Please specify a valid task number. ***".red);
                        printList(obj.toDoItems);
                    } else {
                        let deleteItem = obj.toDoItems[input - 1];

                        obj.toDoItems.splice(input - 1, 1);

                        obj.toDoItems.forEach((item, index) => { item.index = index + 1 });

                        jsonfile.writeFile(file, obj, (err) => {
                            if (err) {
                                console.log("*** Error writing file. ***");
                                console.log(err);
                            };
                            printList(obj.toDoItems);
                        });
                    }
                    break;
                }
            }
        case "help":
            {
                console.log(columnify(instructions, { columns: ['command', 'description'] }));
                break;
            }
        default:
            {
                printList(obj.toDoItems);
                break;
            }
    }
});