// console.log("works!!", process.argv[2]);

var commandType = process.argv[2];
var inputString = function(){
  var stringArr = process.argv;
  var remove = stringArr.splice(0,3);
  // console.log(remove);
  var outString = "";
  for (id in stringArr){
    outString += stringArr[id];
    outString += " ";
  }
  return outString;
}

// console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  // console.log(obj);
  // obj["helloworld"] = "monkey";
  // console.log(obj);
  switch (commandType) {
    case "show":
      show(obj.todoItems);
      break;
    case "add":
      add(obj.todoItems);
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

function show(list) {
  if (list.length == 0) {
    console.log("List is empty...");
  } else if (list.length > 0) {
    var listOut = "";
    for (id in list){
      listOut += `${parseInt(id)+1}. [ ] - ${list[id]}\n`;
    }
    listOut = listOut.trim();
    console.log(listOut);
  }

}

function add(list) {
  var input = inputString().trim();
  list.push(input);
  show(list);

}