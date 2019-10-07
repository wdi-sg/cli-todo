var commandType = process.argv[2];

console.log("Your command is: "+commandType);


const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    if (commandType === "add"){
        var commandText = process.argv[3];
        console.log("Your command text is: " + commandText);
        if (!obj["todoList"]){
            obj["todoList"] = [];
        };

        obj["todoList"].push(commandText);
        var objectList = obj["todoList"];


    } else if (commandType === "show"){
        for (var i = 0; i < 6; i++){
            var objectList = obj["todoList"];
            console.log( (i + 1) + "." + "[ ]" + " - " + objectList[i]);
        }
    }

    if (commandType === "done"){
        for (var i = 0; i < 6; i++){
            var objectList = obj["todoList"];
            var commandText = process.argv[3];
            if (i == commandText){
               console.log( (i + 1) + "." + "[ x ]" + " - " +objectList[i]);
            } else {
                console.log( (i + 1) + "." + "[ ]" + " - " +objectList[i]);
            }
        }


    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});