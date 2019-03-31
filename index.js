
const jsonfile = require('jsonfile');
// const chores = require('./chores');

const file = 'data.json'

// var add = (x,y) => {
//
// }

if (process.argv[2] == "add"){ //so instead of being implicit, I now code the read/write JSONfile function to only execute when process.argv[2] is explicitly named "add"
  jsonfile.readFile(file, (err, obj) => {
    let number = process.argv[3];
    let item = process.argv[4];
    console.log("***Reading file now***");
    // console.log(obj);
    obj.toDoItems[0][number] = item; // after reading, index.js saves the read file into obj; then goes into the
    //'toDoItems' property name, first element of array, and starts to populate this array with userinput1 = process.argv[3]  and userinput2 = process.argv[4].
    //process.argv[2] is implicitly an 'add' word that user ought to type out in the terminal
    console.log("***Done reading file***");

  jsonfile.writeFile(file, obj, { spaces: 2 }, (err) => { //used the spaces option so that JSON file contents' structure are always preserved.
    console.log("***Writing file now***");
    console.log(err);
    console.log(obj);
    console.log("***Done writing file***");
    });
  });
}else if((process.argv[2] == "show")){
  jsonfile.readFile(file, (err, obj) => {
    console.log("***Reading file now***");
    console.log(obj);
    console.log("***Done reading file***");
  });
}else{
  console.log("Dear user,please tell me what items you want to add to the 'to do list' by using keyword 'add', space '[# sign]', space [item_name] in quotes. Or did you want to see the 'to do list'? If so then just say 'show'.");
}



// jsonfile.readFile(file, (err, obj) => {
//   console.log("Reading file now");
//   function add () {
//
//     number = process.argv[3];
//     doneOrNot = process.argv[4]+ " - ";
//     item = process.argv[5];
//
//     if (doneOrNot == "done") {
//         doneOrNot = "[x]"
//     } else if (doneOrNot == "undone") {
//         doneOrNot = "[ ]"
//     }
//
//         obj[number] = (doneOrNot + item);
//          console.log("Done reading file");
// }
//
//   jsonfile.writeFile(file, obj, { spaces: 2 }, (err) => {
//     console.log("Writing file now");
//     console.log(err)
//     console.log(obj);
//     console.log("Done writing file")
//   });
// });



//Prompt: User, please enter number as the first input and 'to do item' as the second input.
// 1. "eat bak ku teh"

// console.log("works!!", process.argv[2]);
//
// var commandType = process.argv[2];
//
// console.log("Your command was: "+commandType);
//
// const jsonfile = require('jsonfile');
//
// const file = 'data.json'
//
// jsonfile.readFile(file, (err, obj) => {
//
//   console.log(obj);
//   obj["helloworld"] = "monkey";
//
//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });
