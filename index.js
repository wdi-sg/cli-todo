const jsonfile = require('jsonfile');
const file = "data.json";

//see the list
if (process.argv[2] === "show") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) console.log(err);

        if (obj.todoItems.length === 0) {
            console.log("Error: List is empty");
        } else {
            for (i=0; i<obj.todoItems.length; i++) {
                console.log((i+1) + ". [ ] - " + obj.todoItems[i]);
            }
        }
    });
}

//add to the list
if (process.argv[2] === "add") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) console.log(err);

        if (process.argv[3] === undefined) {
            console.log("Error: Enter \"task\" after \"add\"");
        } else {
            obj.todoItems.push(process.argv[3]);
            console.log((obj.todoItems.length) + ". [ ] - " + process.argv[3]);

            jsonfile.writeFile(file, obj, (err) => {
                if (err) console.log(err);
            });
        }
    });
}