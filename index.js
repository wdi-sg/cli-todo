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
        let num = obj["toDoList"].length + 1;
        let addedElement = `${num}. [] - ${commandArgument}`;
        obj["toDoList"].push(addedElement);
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
        for(var a=0; a < obj["toDoList"].length; a++){
            let string = obj["toDoList"][a];
            console.log("String is: ",string);
            console.log("Replace",string.replace(string.charAt(0),(a+1)))
            obj["toDoList"][a] = string.replace(string.charAt(0),(a+1))
        }
    }else if (commandType === "show"){
        console.log("List of tasks recorded:")
        for(var i=0;i<obj["toDoList"].length;i++){
            console.log(obj["toDoList"][i]);
        }
    }


    jsonfile.writeFile(file, obj, (err) => {
        if(err !== null){
            console.log(err)

        }
        // console.log("New object: ", obj);
    });
});