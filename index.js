var input1 = process.argv[2];
var input2 = process.argv[3];
var input3 = process.argv[4];
var input4 = process.argv[5];
console.log(input1)
console.log(input2)
console.log(input3)
console.log(input4)
const file = 'todo.json'
const jsonfile = require('jsonfile');


// console.log(process.stdin)
// var user_input = process.stdin
// user_input.setEncoding("utf-8");
// console.log("Hello, what would you like to do today?");
//
// user_input.on("data", function (data){
//
//
//
//
//
//   if(data === "exit\n"){
//     process.exit();
//   }
// });

jsonfile.readFile(file, (err, obj) => {

  if (input1 === "add"){
    var joinStr ="";
    for (var i = 3; i < process.argv.length; i++){
      joinStr = joinStr + process.argv[i] + " ";
    }
    var date = new Date();
    var string = `${obj["todo"].length+1}. [ ] - ${joinStr} - Created on: ${date}`;
    obj["todo"].push(string);
  }
  if (input1 === "done"){
    var getIndex = obj["todo"][input2-1].indexOf("["); //returns index to be split
    var splitIndex1 = obj["todo"][input2-1].substring(0,getIndex+1); //returns first part of string
    var splitIndex2 = obj["todo"][input2-1].substring(getIndex+2); //returns second part of string
    var combinedStr = splitIndex1 + "X" + splitIndex2;
    var date = new Date();

    obj["todo"][input2-1] = combinedStr + " - Updated at: "+date;
  }
  if (input1 === "delete"){
    obj["todo"].splice(input2-1,1); //remove the to do item from the array
    //update rest of entries to take on new number after the removed item
    console.log(input2-1)
    for (var i = input2-1; i < obj["todo"].length; i++){
      var getIndex = obj["todo"][i].indexOf("."); //returns index to be split
      var splitIndex = obj["todo"][i].substring(getIndex); //returns second part of string after the "."
      var finishedStr = (i+1) + splitIndex;
      obj["todo"][i] = finishedStr;
    }
  }

  jsonfile.writeFile(file, obj, (err) => {
    console.log("--------------------------err message--------------------------")
    if (err){
      console.log(err)
    }
    console.log("--------------------------json file--------------------------")
    for (var i = 0; i < obj["todo"].length; i++){
      console.log(obj["todo"][i]);
    }
  });
});

//
// function writeSomething (input1, input2){
//   obj[input1] = input2;
// }
