var command = process.argv[2];

console.log("Your command was: " + command);

const jsonfile = require('jsonfile');

const file = 'data.json'

//reads the obj from the file otherwise return error
jsonfile.readFile(file, (err, obj) => {

    if (command == "add"){

        let created_at = Date();
        obj.todoItems.push(process.argv[3]);
        obj.createdDate.push(created_at);

        //writes the obj into the file, otherwise return error
        jsonfile.writeFile(file, obj, (err) => {

        });
    }

    if (command == "done"){

        let i = process.argv[3] - 1;

        let updated_at = Date();
        obj.doneItems.push(obj.todoItems[i]);
        obj.updatedDate.push(updated_at);

        //writes the obj into the file, otherwise return error
        jsonfile.writeFile(file, obj, (err) => {

        });

    }

    if (command == "show"){

        for (i = 0; i < obj.todoItems.length; i++){

            if (obj.doneItems.includes(obj.todoItems[i])){
                console.log((i+1) + ". [X] - " + obj.todoItems[i] + " updated_at: "+ obj.updatedDate[i]);
            }else {
                console.log((i+1) + ". [ ] - " + obj.todoItems[i] + " created_at: "+ obj.createdDate[i]);
            }
        }
    }

    if (command == "delete"){

        let i = process.argv[3] - 1;

        obj.todoItems.splice([i]);
        obj.createdDate.splice([i]);
        obj.updatedDate.splice([i]);

        //writes the obj into the file, otherwise return error
        jsonfile.writeFile(file, obj, (err) => {

        });

    }
});

// var boolean = true

// if boolean { doSmth }
// else {doSmth}

// boolean ? doSmth : doSmth

// if boolean { console.log("def")}
// else { console.log("xyz")}

// console.log( boolean ? "def" : "xyz")