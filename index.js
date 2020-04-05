console.log("Mmmmyyyy TO-DO LISSSTSSSS")
const command = require("./command")

// node index.js add "eat bak kut teh"
// node index.js show
// node index.js mark 4

if (process.argv[2] === "add") {
    console.log ("The list is getting longeeeerrrr!!!")
    command.add ();

} else if (process.argv[2] === "show"){
    console.log("Here is the list:")
    command.show()

} else if (process.argv[2] === "mark"){
    console.log("crossed means done")

} else {
    console.log("I dont understand your command")
}












// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["helloworld"] = "monkey";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });