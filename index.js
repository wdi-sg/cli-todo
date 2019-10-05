console.log("works!!", process.argv[2]);

const commandType = process.argv[2];
var listCheck;




console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    if (commandType === "add"){
        const toDo = process.argv[3]

        obj["todoItems"].push(toDo)
        let index = obj["todoItems"].indexOf(toDo)
        console.log(`${index+1}. [ ] - ${toDo}`)
    } else if (commandType === "show"){

        for (i=1; i<=obj["todoItems"].length; i++){
            console.log(`${i}. [ ] - ${obj["todoItems"][i-1]}`)
        }
    } else if (commandType === "done"){
        const todoNum = process.argv[3]
        let listCheck;

        for (i=1; i<=obj["todoItems"].length;i++){

             if (i === parseInt(todoNum)){
                listCheck = "[x]"
            } else {
                listCheck = "[ ]"
            }
            console.log(`${i}. ${listCheck} - ${obj["todoItems"][i-1]}`)
        }

    }

      jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
      });
});