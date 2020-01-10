// console.log("works!!", process.argv[2]);

// var commandType = process.argv[2];

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

    if (process.argv[2] === "add") {
        obj["todoItems"].push(process.argv[3])
    }
    // console.log("1. [ ] - " + obj["todoItems"][0]);
    if (process.argv[2] === "show") {
    for (let i = 0; i < obj["todoItems"].length; i++) {
    console.log(i + 1 + ". [ ] - " + obj["todoItems"][i]);
    }
}

  jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)
  });
});


//Create a commandline todo list app that you can use from your terminal and that will keep track of things you need to do.

// let counter = 0;

// if (process.argv[2] === "add") {
//     for (var i = 0; i < list.length; i++) {
//     let smth = i + "." + "[ ]" + " - " + process.argv[3] + " " + process.argv[4] + " " + process.argv[5];//how to let it add process.argv[3] onwards unlimitedly?
//     counter++;
//     file.value.push(smth);
//     console.log(smth);
//     }
// }

// if (process.argv[2] === "show") {
//     console.log(list);
// }