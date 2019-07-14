//console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var itemName = process.argv[3];

console.log("Your command was: " + commandType+ ", item Name was: "+itemName);

const jsonfile = require("jsonfile");

const file = "data.json";

//main program flow:

jsonfile.readFile(file, (err, obj) => {
  //Log obj json
  //console.log(obj);
  //check if json constains property todoItems
  if (!obj["todoItems"]) {
    obj["todoItems"] = [];
  }
  if (commandType === "add" && itemName != undefined) {
    obj["todoItems"].push({ item: itemName, done: "no" });
  }

  for (var i = 0; i < obj["todoItems"].length; i++) {
      var doneChar;
      if(obj["todoItems"][i]["done"]==="yes"){
        doneChar="x";
      }
      else{
        doneChar = " ";
      }
    console.log(
      (i + 1) + ". [" + doneChar + "] - " + obj["todoItems"][i]["item"]
    );
  };

  jsonfile.writeFile(file, obj, err => {
    if (err != null) {
      console.log(err);
    }
  });

});
