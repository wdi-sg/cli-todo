let commandType = process.argv[2];


let dateOutput = new Date().toLocaleDateString();

console.log("Your command was: "+commandType);

const jsonfile = require("jsonfile");

const file = 'data.json';

function showAndWrite(obj) {
    obj["todoItems"].forEach((action, index)=> {
            console.log(`${index + 1}${action}`)
    })
    jsonfile.writeFile(file, obj, (err) => {
        if (err) throw err;
    })
}

if (commandType === "add") {
    let toDoActions = process.argv.slice(3);
    jsonfile.readFile(file, (err, obj) => {
        toDoActions.forEach(toDo => {
            obj["todoItems"].push(`. [ ] - ${toDo}, Created at: ${dateOutput}`)
        })
        showAndWrite(obj);
    })
} else if (commandType === "show") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"].forEach((action, index)=> {
            console.log(`${index + 1}${action}`)
        })
    })
} else if (commandType === "done") {
    let markDoneNumber = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
        let toBeReplaced = obj["todoItems"][markDoneNumber - 1].replace("[ ]", "[X]") + ", Updated at:" + dateOutput;
        obj["todoItems"].splice((markDoneNumber - 1), 1, toBeReplaced);
        showAndWrite(obj);
    })
} else if (commandType === "delete") {
    let markDeleteNumber = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"].splice((markDeleteNumber - 1), 1);
        showAndWrite(obj);
    })
}