// console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var inputString = function () {
  var stringArr = process.argv;
  var remove = stringArr.splice(0, 3);
  // console.log(remove);
  var outString = "";
  for (id in stringArr) {
    outString += stringArr[id];
    outString += " ";
  }
  return outString;
}

var inputNum = function () {
  var num = parseInt(process.argv[3]);
  return num;
}

//   } else if ((!isNaN(process.argv[3]) && process.argv.length==4)){
//     var outNum = 0;
//     outNum = parseInt(process.argv[3]);
//     console.log(`Num ${outNum}`);
//     return outNum;
//   }

// }

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);
  // obj["helloworld"] = "monkey";
  // console.log(obj);
  switch (commandType) {
    case "show":
      show(obj);
      break;
    case "add":
      add(obj);
      break;
    case "done":
      done(obj);
      break;
    default:
      break;
  }
  // console.log(obj);
  jsonfile.writeFile(file, obj, (err) => {
    if (err != null || err != undefined) {
      console.log(err)
    }

  });
});

function show(object) {
  if (object.todoItems.length == 0) {
    console.log("List is empty...");
  } else if (object.todoItems.length > 0) {
    var listOut = "";
    for (id in object.todoItems) {
      if (object.doneItems.includes(object.todoItems[id])) {
        listOut += `${parseInt(id) + 1}. [X] - ${object.todoItems[id]}\n`;
      } else {
        listOut += `${parseInt(id) + 1}. [ ] - ${object.todoItems[id]}\n`;
      }
    }
    listOut = listOut.trim();
    console.log(listOut);
  }

}

function add(object) {
  var input = inputString();
  input = input.trim();
  object.todoItems.push(input);
  show(object);
}

function done(object) {
  var input = inputNum();
  var doneItem = object.todoItems[input - 1];
  object.doneItems.push(doneItem);
  show(object);
}

