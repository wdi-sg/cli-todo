const input = process.argv.slice(2)
const command = input[0];
const jsonfile = require('jsonfile');
const file = 'data.json'
const date = new Date();
const today = date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()


//Function to format output of the todo list.
const readList = (array) => {
    array.forEach((obj, index) => {
        let checkBox = `[ ]`
        if (obj.status) {
            checkBox = `[X]`
        }
        let output = `${index+1}. ${checkBox} - ${obj.item} | Added: ${obj.created_at} | Completed: ${obj.updated_at}`

        colorLog(`lavender`, output);
    });
}

const colorLog = (col, output) => {
    let r;
    let g;
    let b
    if (col === 'lavender') {
        r = 181;
        g = 126;
        b = 220
    } else if (col === 'red') {
        r = 230;
        g = 0;
        b = 0;
    } else if (col === 'green') {
        r = 0;
        g = 230;
        b = 0
    }

    console.log(`\x1b[38;2;${r};${g};${b}m%s\x1b[0m`, output);
}


jsonfile.readFile(file, (err, obj) => {

    const toDoList = obj["todoItems"]

    //TO ADD STUFF INTO THE LIST.
    if (command === "add") {
        let newItem = input.slice(1).join(" ");

        const newTask = {
            status: false,
            item: newItem,
            created_at: today,
            updated_at: false
        }

        toDoList.push(newTask)

        jsonfile.writeFile(file, obj, (err) => {
            if (!err) {
                colorLog('green', `Item added successfully! Updated list.`);
                readList(toDoList)
            } else {
                colorLog('red', `Sorry, there was an error with adding to the list.`);
                console.log(err);
            }
        });
    }

    //TO SEE YOUR LIST.
    if (command === "show") {
        readList(toDoList)
    }

    //TO MARK IT DONE
    if (command === "done") {

        var targetObj = toDoList[input[1] - 1]
        targetObj.status = true;
        targetObj.updated_at = today;

        jsonfile.writeFile(file, obj, (err) => {
            if (!err) {
                colorLog('green', `Congrats on completing a task!`);
                readList(toDoList)
            } else {
                colorLog('red', `Sorry, there was an error with completing your task.`);
                colorLog('red', err);
            }
        });
    }

    if (command === "del") {
        var targetIndex = input[1] - 1
        toDoList.splice(targetIndex, 1);
        jsonfile.writeFile(file, obj, (err) => {
            if (!err) {
                colorLog('green', `Deleted item.`);
                readList(toDoList)
            } else {
                colorLog('red', `Sorry, there was an error with deleting your task.`);
                colorLog('red', err);
            }
        });
    }

});
