let commandType = process.argv[2];
let toDoAction = process.argv[3];


console.log("Your command was: "+commandType);

const jsonfile = require("jsonfile");

const file = 'data.json';

if (commandType === "add") {
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    obj["todoItems"].push(`${obj["todoItems"].length + 1}. [ ] - ${toDoAction}`);

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    })
})
} else if (commandType === "show") {
    jsonfile.readFile(file, (err, obj) => {
        console.log(obj["todoItems"]);
    })
}


// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["todoItems"] = "sleeping";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });