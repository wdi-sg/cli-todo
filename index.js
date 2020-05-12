console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
var listCheck;

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');
const cats = require('cat-ascii-faces')

const file = 'data.json'

class todoItem {
    constructor(number, complete, item, date, update){

        this.number = number;
        this.complete = complete;
        this.item = item;
        this.date = date;
        this.updated = update
    }
}

jsonfile.readFile(file, (err, obj) => {

    if (commandType === "add"){

        let newTodo = {}

        newTodo = new todoItem (obj["todoList"].length+1, `[ ]`, process.argv[3], new Date(), null)
        obj["todoList"].push(newTodo)

        console.log(`${newTodo["number"]}. ${newTodo["complete"]} - ${newTodo["item"]}, created at: ${newTodo["date"]}`)

    } else if (commandType === "show"){

        for (i=0; i<obj["todoList"].length; i++){
            obj["todoList"][i]["number"] = `${obj["todoList"].indexOf(obj["todoList"][i])+1}`
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}, created at: ${obj["todoList"][i]["date"]}; marked complete at ${obj["todoList"][i]["updated"]}`)
        }
    } else if (commandType === "done"){
        const todoNum = process.argv[3]
        const index = todoNum - 1
        obj["todoList"][index]["complete"] = "[x]"
        obj["todoList"][index]["updated"] = new Date()
         for (i=0; i<obj["todoList"].length; i++){
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}, created at: ${obj["todoList"][i]["date"]}; marked complete at ${obj["todoList"][i]["updated"]}`)
        }
    } else if (commandType === "delete"){
        const deleteItem = process.argv[3]
        const deletedIndex = process.argv[3]-1
        const deletedThing = obj["todoList"][deletedIndex]["item"]
        const deleted = obj["todoList"].splice(deletedIndex,1)
        console.log(`Item ${deleteItem} - ${deletedThing} - was removed.`)

    } else {
        let cat = cats()
        console.log(`Invalid command, meow!

            ${cat}`)
    }

      jsonfile.writeFile(file, obj, {spaces:2},(err) => {
        console.log(err)
      });
});