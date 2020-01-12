let commandType = process.argv[2];
let commandString = process.argv[3];
const jsonfile = require('jsonfile');
const file = 'data.json'

switch (commandType) {
    case "add":
        jsonfile.readFile(file, (err, obj) => {
            obj.toDoItems.push(commandString);
            jsonfile.writeFile(file, obj, (err) => {
                if (err != null) {
                    console.log(err);
                } // closing bracket for "if"
            }); //closing bracket for "writeFile"
        }); //closing bracket for "readFile"
    break;
    case "show":
        json.readFile(file, (err,obj) => {
            jsonfile.writeFile(file, obj, (err) => {
                if (err != null) {
                    console.log(err);
                } //closing bracket for if
            }) // closing bracket for writeFile
        }) //closing bracket for readFile
    break;
    case "done":

    break;
}


