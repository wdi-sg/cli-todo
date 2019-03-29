console.log("works!!");

var commandType = process.argv[2];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

if (process.argv[2] === "add") {
  //add an item to the to do list
  let todoString = process.argv[3];
  jsonfile.readFile(file, (err, obj) => {
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    //json file must have an index as key, and text as the value
    for (let i = 1; i < todolistLength + 2; i++) {
      if (obj[i] === undefined) {
        obj[i] = {value:todoString, done:false};
        console.log(i + ". [ ] - " + todoString)
      }
    }

    jsonfile.writeFile(file, obj, (err) => {
      console.log(err);
    });
  });
}
if (process.argv[2] === "done") {
  jsonfile.readFile(file, (err, obj)=>{
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    for (let i = 0; i < todolistLength; i++) {
      if (i === parseInt(process.argv[3])) {
        obj[i].done = true;
      }
    }

    jsonfile.writeFile(file, obj, (err) => {
      console.log(err);
    })
  })
}

if (process.argv[2] === "show") {
  jsonfile.readFile(file, (err, obj)=>{
    if (err) {
      console.log(err);
    }
    const todolistLength = Object.keys(obj).length;
    let done = "not reading done";
    for (let i = 1; i < todolistLength + 1; i++) {
      console.log(obj[i].done);

      if (obj[i].done === true) {
        done = "x";
      } else {
        done = " ";
      }

      console.log(i + ". [" + done + "] - " + obj[i].value);


    }
  })
}
