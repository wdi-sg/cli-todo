// console.log("added: ", process.argv[2], process.argv[3]);

const jsonfile = require('jsonfile');

const file = 'data.json'

// var toDoList = {"todoItems:[]"};

var commandType = process.argv[2];


if (commandType === "add") {
        jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  // obj[process.argv[3]] = process.argv[4]

if (obj["todoItems"] === undefined){
    obj["todoItems"] = []
}

obj["todoItems"].push(process.argv[3])


  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
} else if (commandType === "show") {
    jsonfile.readFile(file, (err, obj) => {
    for (i = 0; i < obj["todoItems"].length; i++){
        console.log ((i + 1) + "." + obj["todoItems"][i]);
    }
});
}