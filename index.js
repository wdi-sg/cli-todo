//commandType to define what function used, commandArgument for input
let commandType = process.argv[2];
let commandArgument = process.argv[3];

console.log("Your command was: " + commandType);
if(commandArgument !== undefined){
    console.log("Your argument was: " + commandArgument);
}


const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    if (commandType === "add") {
        let x = new Date();
        let dateString = x.toLocaleDateString();
        let num = obj["toDoList"].length + 1;
        let addedElement = `${num}. [] - ${commandArgument}`;
        obj["toDoList"].push(addedElement);
        obj["created_at"].push(dateString);
    } else if (commandType === "done"){
        for(var a=0; a<obj["toDoList"].length; a++){
            let string = obj["toDoList"][a];
            if(string.charAt(0) === commandArgument){
                let arr = string.split("");
                if(arr[4] === "X"){
                    console.log("Task has already been marked as done");
                } else if (arr[4] === "]"){
                    arr.splice(4,0,"X");
                    var x = arr.join("");
                    obj["toDoList"][a] = x;
                }
            }
        }
    } else if (commandType === "delete"){
        let elementSlice = parseInt(commandArgument) - 1;
        obj["toDoList"].splice(elementSlice,1);
        obj["created_at"].splice(elementSlice,1);
        for(var a=0; a < obj["toDoList"].length; a++){
            let string = obj["toDoList"][a];
            obj["toDoList"][a] = string.replace(string.charAt(0),(a+1))
        }
    }else if (commandType === "show"){
        console.log("List of tasks recorded:")
        for(var i=0;i<obj["toDoList"].length;i++){
            console.log(obj["toDoList"][i] + ". Created at: " + obj["created_at"][i]);
        }
    } else if (commandType === "empty"){
        obj["toDoList"] = [];
        obj["created_at"] = [];
        console.log("To do list emptied!")
    } else {
        console.log("Unknown Command")
    }


    jsonfile.writeFile(file, obj, (err) => {
        if(err !== null){
            console.log(err)
        }
        // console.log("New object: ", obj);
    });
});