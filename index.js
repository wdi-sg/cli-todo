const jsonfile = require('jsonfile');
const file = 'data.json';


if (process.argv[2] === "show") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) console.error(err);

        for (var i=0; i<obj.todoItems.length; i++) {
            console.log((i + 1) + ". [ ] - " + obj.todoItems[i]);
        }
    });
}

if (process.argv[2] === "add") {
    jsonfile.readFile(file, (err, obj) => {
        if (err) console.error(err);

        obj.todoItems.push(process.argv[3]);
        for (var i=0; i<obj.todoItems.length; i++) {
            console.log((i + 1) + ". [ ] - " + obj.todoItems[i]);
        }
        jsonfile.writeFile(file, obj, (err) => {
            if (err) console.log(err);
        });
    });
}