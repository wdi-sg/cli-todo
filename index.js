// console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');
const file = 'data.json';

const figlet = require('figlet');

function asciiTransform (wordString) {
    figlet(wordString, function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data);
});
}


jsonfile.readFile(file, (err, obj) => {
    if (err) {
        let wordString = "Error encountered while reading";
        asciiTransform(wordString);
        console.log(err);
    } else {
        if (commandType === "show") {
            if (obj["toDoItems"] === undefined) {
                let wordString = "No items in to-do list!";
                asciiTransform(wordString);
            } else {
                for (i=0; i<obj.toDoItems.length; i++) {

                    const index = obj["toDoItems"][i]["index"];
                    const done = obj["toDoItems"][i]["done"];
                    const item = obj["toDoItems"][i]["item"];
                    const createdAt = obj["toDoItems"][i]["createdAt"];
                    const updatedAt = obj["toDoItems"][i]["updated_at"];

                    console.log(`${index}. [${done?"x":" "}] - ${item} created_at:${createdAt} ${updatedAt===undefined?"":"updated_at:"+updatedAt}`);
                }
            }
        } else if (commandType === "add") {
            if (obj["toDoItems"] === undefined) {
                obj["toDoItems"] = [];

                let createdAt = new Date();

                newObj = {
                    "index": obj["toDoItems"].length+1,
                    "item": takeAllArgumentsAsString(),
                    "done": false,
                    "createdAt": createdAt.toString()
                };
                obj["toDoItems"].push(newObj);
            } else {

                let createdAt = new Date();

                newObj = {
                    "index": obj["toDoItems"].length+1,
                    "item": takeAllArgumentsAsString(),
                    "done": false,
                    "createdAt": createdAt.toString()
                };
                obj["toDoItems"].push(newObj);
            }

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    let wordString = "Error encountered while adding";
                    asciiTransform(wordString);
                    console.log(err);
                } else {
                    let wordString = "New to-do item added!\nTo do items: "+obj["toDoItems"].length;
                    asciiTransform(wordString);
                }
            });
        } else if (commandType === "done") {
            obj["toDoItems"][process.argv[3]-1]["done"] = true;

            updatedAt = new Date();
            obj["toDoItems"][process.argv[3]-1]["updated_at"] = updatedAt.toString();

            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    let wordString = "Error encountered while checking task";
                    asciiTransform(wordString);
                    console.log(err);
                } else {
                    let wordString = `Item ${process.argv[3]} checked!`;
                    asciiTransform(wordString);
                }
            });
        } else if (commandType === "delete") {
            obj["toDoItems"].splice(process.argv[3]-1,1);

            for (i=0; i<obj["toDoItems"].length; i++) {
                obj["toDoItems"][i]["index"] = i+1;
            }


            jsonfile.writeFile(file, obj, (err) => {
                if (err) {
                    let wordString = "Error encountered while deleting";
                    asciiTransform(wordString);
                    console.log(err);
                } else {
                    let wordString = `Item ${process.argv[3]} deleted!`;
                    asciiTransform(wordString);
                }
            });
        }
    }
});

function takeAllArgumentsAsString () {
    let i=3;
    let string = "";
    while (process.argv[i] !== undefined) {
        string += process.argv[i]+" ";
        i++;
    }
    return string;
}