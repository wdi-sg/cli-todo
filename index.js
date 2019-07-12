const file = 'todo.json'
const jsonfile = require('jsonfile');
const columns = require('columnify');

function displayOptions(){
  console.log(`-----------------------------------------------------------------`)
  console.log(`To see your existing entries - Type "show"`)
  console.log(`To add a new entry - Type "add x" where x is the entry name`)
  console.log(`To mark an entry - Type "done x" where x is the number corresponding to the entry`)
  console.log(`To remove an entry - Type "delete x" where x is the number corresponding to the entry`)
  console.log(`To remove all entries - Type "delete all"`)
  console.log(`To exit - Type "exit"`)
  console.log(`Type "help" to display the options again`)
  console.log(`-----------------------------------------------------------------`)
}

var user_input = process.stdin
user_input.setEncoding("utf-8");
console.log("Hello, what would you like to do today?");
displayOptions()

user_input.on("data", function (data){
  var dataControl = data.split(" ");
  var input = [];
  //replace the \n with ""
  for (var i = 0; i < dataControl.length; i++){
    input[i] = dataControl[i].replace(/\n/, "")
  }

  jsonfile.readFile(file, (err, obj) => {
    //show all entries
    if (input[0] === "show"){
      if (obj["todo"].length === 0){
        console.log(`You have no existing entries. Type "add" to add some entries.`);
      }else{
        console.log("-------------------------Your entries-------------------------");
        for (var i = 0; i < obj["todo"].length; i++){
          console.log(obj["todo"][i]);
        }
      }
    }
    //display help options
    if (input[0] === "help" || input[0] === ""){
        displayOptions();
    }
    //adds new entry
    if (input[0] === "add"){
      var joinStr ="";
      for (var i = 1; i < input.length; i++){
        if (i === input.length-1){
          joinStr = joinStr + input[i];
        }else {
          joinStr = joinStr + input[i] + " ";
        }
      }
      var date = new Date();
      var string = `${obj["todo"].length+1}. [ ] - ${joinStr} - Created on: ${date}`;
      obj["todo"].push(string);
      console.log(`You have added ${joinStr} on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      for (var j = 0; j < obj["todo"].length; j++){
        console.log(obj["todo"][j]);
      }
    }
    //marks entry as done
    if (input[0] === "done"){
      var getIndex = obj["todo"][input[1]-1].indexOf("["); //returns index to be split
      var splitIndex1 = obj["todo"][input[1]-1].substring(0,getIndex+1); //returns first part of string
      var splitIndex2 = obj["todo"][input[1]-1].substring(getIndex+2); //returns second part of string
      var combinedStr = splitIndex1 + "X" + splitIndex2;
      var date = new Date();

      obj["todo"][input[1]-1] = combinedStr + " - Updated at: "+date;
      console.log(`You have marked this task as completed on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      for (var i = 0; i < obj["todo"].length; i++){
        console.log(obj["todo"][i]);
      }
    }
    //unmarks entry
    if (input[0] === "undo"){
      var getIndex = obj["todo"][input[1]-1].indexOf("["); //returns index to be split
      var splitIndex1 = obj["todo"][input[1]-1].substring(0,getIndex+1); //returns first part of string
      var splitIndex2 = obj["todo"][input[1]-1].substring(getIndex+2); //returns second part of string
      var combinedStr = splitIndex1 + " " + splitIndex2;
      var date = new Date();

      obj["todo"][input[1]-1] = combinedStr + " - Updated at: "+date;
      console.log(`You have marked this task as completed on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      for (var i = 0; i < obj["todo"].length; i++){
        console.log(obj["todo"][i]);
      }
    }
    //deletes specific entry based on corresponding number
    if (input[0] === "delete" && input[1] != "all"){
      console.log(`You have deleted ${obj["todo"][input[1]-1]}`)
      obj["todo"].splice(input[1]-1,1); //remove the to do item from the array
      //update rest of entries to take on new number after the removed item
      for (var i = input[1]-1; i < obj["todo"].length; i++){
        var getIndex = obj["todo"][i].indexOf("."); //returns index to be split
        var splitIndex = obj["todo"][i].substring(getIndex); //returns second part of string after the "."
        var joinStr = (i+1) + splitIndex;
        obj["todo"][i] = joinStr;
      }
      console.log("-------------------------Your entries-------------------------");
      for (var j = 0; j < obj["todo"].length; j++){
        console.log(obj["todo"][j]);
      }
    //delete all entries
    }else if (input[0] === "delete" && input[1] === "all"){
      obj["todo"].splice(0,obj["todo"].length);
      console.log("All entries deleted!")
    }

    jsonfile.writeFile(file, obj, (err) => {

      if (err){
        console.log("--------------------------err message--------------------------")
        console.log(err)
      }
      // console.log("--------------------------json file--------------------------")
      // for (var i = 0; i < obj["todo"].length; i++){
      //   console.log(obj["todo"][i]);
      // }
    });
  });
  if(data === "exit\n"){
    console.log("Thank you, please drop by again.")
    process.exit();
  }
});
