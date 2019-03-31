// acquire the npm package we installed
const jsonfile = require('jsonfile');
// the JSON file that we created {}
const file = 'data.json';

const commandType = process.argv[2];
const secondArg = process.argv[3];

const add = (todo) => {
    jsonfile.readFile(file,(err, json) => {
        const obj = {};
        const arr = json["todoItems"];
        const index = arr.length + 1;
        obj.index = index;
        obj.name = todo;
        obj.completed = false;
        arr.push(obj);
        console.log(`${index}. [ ] - ${todo}`);
        jsonfile.writeFile(file, json, (err) => {
            if (err) {
                console.log("ERROR");
            }
            // console.log(`${index}. [ ] - ${todo}`);
        });
    });
}

const show = () => {
    jsonfile.readFile(file,(err,json) => {
        const arr = json["todoItems"];
        for (let i = 0;i < arr.length; i++){
            if (arr[i]["completed"] === false) {
                console.log(`${arr[i]["index"]}. [ ] - ${arr[i]["name"]}`);
            } else if (arr[i]["completed"] === true) {
                console.log(`${arr[i]["index"]}. [x] - ${arr[i]["name"]}`);
            }
        }
    });
}

const done = (index) => {
    jsonfile.readFile(file,(err,json) => {
        const arr = json["todoItems"];
        for (let i = 0;i < arr.length; i++){
            if (parseInt(index) === arr[i]["index"]) {
                arr[i]["completed"] = true;
            }
        }
        jsonfile.writeFile(file, json, (err) => {
            if (err) {
                console.log("ERROR");
            }
        });
    });
}

if (commandType === "add") {
    add(secondArg);
}  else if (commandType === "show") {
    show();
} else if (commandType === "done") {
    done(secondArg);
    show();
}