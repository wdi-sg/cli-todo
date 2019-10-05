//commandType to define what function used, commandArgument for input
let commandType = process.argv[2];
let commandArgument = process.argv[3];
//Parrots what the user typed
console.log("Your command was: " + commandType);
if(commandArgument !== undefined){
    console.log("Your argument was: " + commandArgument);
}
//Declare Constants for jsonfile package and data file.
const jsonfile = require('jsonfile');
const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    if (commandType === "add") { //If command is add, create the date and create a template for to do list.
        let x = new Date();
        let dateString = x.toLocaleDateString();
        let num = obj["toDoList"].length + 1; //The number will be based on the length of the array + 1 (Because array starts form 0)
        let addedElement = `${num}. [] - ${commandArgument}`;//Create the text to be added in
        obj["toDoList"].push(addedElement); //Push the to do list in toDoList array
        obj["created_at"].push(dateString); //Push the date to created_at array
    } else if (commandType === "done"){//If command is done, check the index and add X if it is unmarked.
        for(var a=0; a<obj["toDoList"].length; a++){
            let string = obj["toDoList"][a]; //Makes typing easier
            if(string.charAt(0) === commandArgument){ //If the first character matches user input
                let arr = string.split(""); //Turn the string into an array
                if(arr[4] === "X"){ //Check if the 4th character is X or ']'.
                    console.log("Task has already been marked as done"); //If it is X, it means the to do has already been marked.
                } else if (arr[4] === "]"){ //If not, then add an X, and turn it back into a string. Replace the element in the array with the new updated string.
                    arr.splice(4,0,"X");
                    var x = arr.join("");
                    obj["toDoList"][a] = x;
                }
            }
        }
    } else if (commandType === "delete"){ //If command is delete, remove the element
        let elementSlice = parseInt(commandArgument) - 1; //Remember! Array count starts from 0!
        obj["toDoList"].splice(elementSlice,1); //Remove the element from toDoList
        obj["created_at"].splice(elementSlice,1); //Remove the element from created_at
        for(var a=0; a < obj["toDoList"].length; a++){
            let string = obj["toDoList"][a]; //Makes typing easier
            obj["toDoList"][a] = string.replace(string.charAt(0),(a+1)) //Re-index all the strings so you won't have awkward gaps in number like 1,2,4,5,6...
        }
    }else if (commandType === "show"){//If command is show, shows whatever data is stored
        console.log("List of tasks recorded:") //To make your response a bit clearer in CLI
        for(var i=0;i<obj["toDoList"].length;i++){ //Loops through toDoList
            console.log(obj["toDoList"][i] + ". Created at: " + obj["created_at"][i]); //Return concatenated To dos and its corresponding created date.
        }
    } else if (commandType === "empty"){ //Not required as part of homework, but it helps me save time when testing with empty list, and also makes sense to want to have a function to empty your to do list.
        obj["toDoList"] = [];
        obj["created_at"] = [];
        console.log("To do list emptied!")
    } else { //I. .D.O.N.T. .U.N.D.E.R.S.T.A.N.D
        console.log("Unknown Command")
    }

    //Log error only if it is not Null because it is annoying
    jsonfile.writeFile(file, obj, (err) => {
        if(err !== null){
            console.log(err)
        }
    });
});