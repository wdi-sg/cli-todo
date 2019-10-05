console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
var listCheck;

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'
const command = "commands"

class todoItem {
    constructor(complete, item){

        this.complete = complete;
        this.item = item
    }
}



jsonfile.readFile(file, (err, obj) => {

    if (commandType === "add"){


        newTodo = new todoItem (`[ ]`, process.argv[3])
        obj["todoList"].push(newTodo)
        newTodo.number = `${obj["todoList"].indexOf(newTodo)+1}`

        console.log(`${newTodo["number"]}. ${newTodo["complete"]} - ${newTodo["item"]}`)
        console.log(obj)
        console.log(newTodo)

    } else if (commandType === "show"){

        for (i=0; i<obj["todoList"].length; i++){
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}`)
        }
    } else if (commandType === "done"){
        const todoNum = process.argv[3]
        const index = todoNum - 1
        obj["todoList"][index]["complete"] = "[x]"
         for (i=0; i<obj["todoList"].length; i++){
            console.log(`${obj["todoList"][i]["number"]}. ${obj["todoList"][i]["complete"]} - ${obj["todoList"][i]["item"]}`)
        }





    }

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
});