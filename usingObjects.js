const file = 'todo.json'
const jsonfile = require('jsonfile');
const columnify = require('columnify');

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
  var input = []; //input[0] will be the function controller (add, delete, etc...)
  //replacing the \n with ""
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
        var myColumns = columnify(obj["todo"],{
          columns: [`activity`, `created_on`, `updated_on`]
        });
        console.log(myColumns);
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
      var string = `${obj["todo"].length+1}. [ ] - ${joinStr}`
      var date = new Date();
      var objSet = {}

      objSet.activity = string; //setting info to activity
      objSet.created_on = date; //setting date stamp
      objSet.updated_on = null;
      obj["todo"].push(objSet); //sending object to array

      console.log(`You have added ${joinStr} on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      var myColumns = columnify(obj["todo"],{
        columns: [`activity`, `created_on`, `updated_on`]
      });
      console.log(myColumns);
      // for (var j = 0; j < obj["todo"].length; j++){
      //   console.log(obj["todo"][j]);
      // }
    }
    //marks entry as done
    if (input[0] === "done"){
      var getIndex = obj["todo"][input[1]-1]["activity"].indexOf("["); //returns index to be split
      var splitIndex1 = obj["todo"][input[1]-1]["activity"].substring(0,getIndex+1); //returns first part of string
      var splitIndex2 = obj["todo"][input[1]-1]["activity"].substring(getIndex+2); //returns second part of string
      var combinedStr = splitIndex1 + "X" + splitIndex2;
      var date = new Date();
      obj["todo"][input[1]-1]["activity"] = combinedStr; //setting the new info
      obj["todo"][input[1]-1]["updated_on"] = date; //setting date that activity is done

      console.log(`You have marked this task as completed on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      var myColumns = columnify(obj["todo"],{
        columns: [`activity`, `created_on`, `updated_on`]
      });
      console.log(myColumns);
    }
    //unmarks entry
    if (input[0] === "undo"){
      var getIndex = obj["todo"][input[1]-1]["activity"].indexOf("["); //returns index to be split
      var splitIndex1 = obj["todo"][input[1]-1]["activity"].substring(0,getIndex+1); //returns first part of string
      var splitIndex2 = obj["todo"][input[1]-1]["activity"].substring(getIndex+2); //returns second part of string
      var combinedStr = splitIndex1 + " " + splitIndex2;
      var date = new Date();
      obj["todo"][input[1]-1]["activity"] = combinedStr; //setting the new info
      obj["todo"][input[1]-1]["updated_on"] = date; //setting date that activity is done

      console.log(`You have unmarked this task on ${date}`)
      console.log("-------------------------Your entries-------------------------");
      var myColumns = columnify(obj["todo"],{
        columns: [`activity`, `created_on`, `updated_on`]
      });
      console.log(myColumns);
    }
    //deletes specific entry based on corresponding number
    if (input[0] === "delete" && input[1] != "all"){
      console.log(`You have deleted ${obj["todo"][input[1]-1]}`)
      obj["todo"].splice(input[1]-1,1); //remove the to do item from the array
      //update rest of entries to take on new number after the removed item
      for (var i = input[1]-1; i < obj["todo"].length; i++){
        var getIndex = obj["todo"][i]["activity"].indexOf("."); //returns index to be split
        var splitIndex = obj["todo"][i]["activity"].substring(getIndex); //returns second part of string after the "."
        var joinStr = (i+1) + splitIndex;
        obj["todo"][i]["activity"] = joinStr;
      }
      console.log("-------------------------Your entries-------------------------");
      var myColumns = columnify(obj["todo"],{
        columns: [`activity`, `created_on`, `updated_on`]
      });
      console.log(myColumns);
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
