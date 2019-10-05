console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
var listCheck;

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

class todoItem {
    constructor(complete, item, date){

        this.complete = complete;
        this.item = item;
        this.date = date
    }
}

jsonfile.readFile(file, (err, obj) => {

    if (commandType === "add"){

        newTodo = new todoItem (`[ ]`, process.argv[3], new Date())
        obj["todoList"].push(newTodo)
        newTodo.number = `${obj["todoList"].indexOf(newTodo)+1}`

        console.log(`${newTodo["number"]}. ${newTodo["complete"]} - ${newTodo["item"]}, created at: ${newTodo["date"]}`)

    } else if (commandType === "show"){

        for (i=0; i<obj["todoList"].length; i++){
            obj["todoList"][i]["number"] = `${obj["todoList"].indexOf(obj["todoList"][i])+1}`
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}, created at: ${obj["todoList"][i]["date"]}`)
        }
    } else if (commandType === "done"){
        const todoNum = process.argv[3]
        const index = todoNum - 1
        obj["todoList"][index]["complete"] = "[x]"
         for (i=0; i<obj["todoList"].length; i++){
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}`)
        }
    } else if (commandType === "delete"){
        const deleteItem = process.argv[3]
        const deletedIndex = process.argv[3]-1
        const deleted = obj["todoList"].splice(deletedIndex,1)
        console.log(`Item ${deleteItem} was removed.`)

    }

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
});