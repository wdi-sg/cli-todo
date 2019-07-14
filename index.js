////For Debugging
//console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var itemName = process.argv[3];

////For Debugging
//console.log("Your command was: " + commandType+ ", item Name was: "+itemName);

const jsonfile = require("jsonfile");

const file = "data.json";

// function filterArray(inputArray){
//     var newArr = [];
//     for (var i=0; i<inputArray.length; i++){
//         if(inputArray[i]!= null){
//             newArr.push(inputArray[i]);
//         }
//     }
//     return newArr;
// }

function ShowTodoItems(arrayTodoItems) {
  for (var i = 0; i < arrayTodoItems.length; i++) {
    var doneChar;
    if (arrayTodoItems[i]["done"] === "yes") {
      doneChar = "x";
    } else {
      doneChar = " ";
    }
    console.log(
      i +
        1 +
        ". [" +
        doneChar +
        "] - " +
        arrayTodoItems[i]["item"] +
        " - " +
        arrayTodoItems[i]["created_at"]
    );
  }
};

//main program flow:

jsonfile.readFile(file, (err, obj) => {

    //var arrayTodoItems = obj["todoItems"];

  //check if json contains property todoItems
  if (!obj["todoItems"]) {
    obj["todoItems"] = [];
  }
  switch (commandType) {
    case "show":
      ShowTodoItems(obj["todoItems"]);
      break;
    case "add":
      obj["todoItems"].push({
        item: itemName,
        done: "no",
        created_at: new Date()
      });
      ShowTodoItems(obj["todoItems"]);
      break;
    case "delete":
      delete obj["todoItems"][itemName - 1];
      //ShowTodoItems(obj["todoItems"]);
      break;
    case "done":
      break;
    case undefined:
      console.log(
        "\nPlease Enter an option arg after filename.\n\n" +
          "[ show | add | delete ]" +
          "\n\nExample:\n" +
          "node index.js show"
      );
      break;
    default:
      console.log("\nPlease enter a valid option.\n");
  };

  jsonfile.writeFile(file, obj, err => {
    if (err != null) {
      console.log(err);
    }
  });

});
