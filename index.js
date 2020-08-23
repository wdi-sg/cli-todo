let commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require("jsonfile");

const file = 'data.json';

if (commandType === "add") {
    let toDoAction = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
    console.log(obj);
    obj["todoItems"].push(`${obj["todoItems"].length + 1}. [ ] - ${toDoAction}`);

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    })
})
} else if (commandType === "show") {
    jsonfile.readFile(file, (err, obj) => {
        obj["todoItems"].forEach(action => {
            console.log(action)
        })
    })
} else if (commandType === "done") {
    let markDoneNumber = process.argv[3];
    jsonfile.readFile(file, (err, obj) => {
        // obj["todoItems"][markDoneNumber - 1].replace("[ ]", "[X]";
        let toBeReplaced = obj["todoItems"][markDoneNumber - 1].replace("[ ]", "[X]");
        obj["todoItems"].splice((markDoneNumber - 1), 1, toBeReplaced);
        obj["todoItems"].forEach(action => {
            console.log(action)
        })
        jsonfile.writeFile(file, obj, (err) => {

        })
    })
}


// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["todoItems"] = "sleeping";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });