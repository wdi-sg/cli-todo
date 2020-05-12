console.log("works!!", process.argv[2]);

var commandType = process.argv[2].toLowerCase();
let itemList = process.argv[3];


console.log("Your command was: "+ commandType);
console.log("Your new item is: " + itemList);

const jsonfile = require('jsonfile');

const file = 'data.json'



jsonfile.readFile(file, (err, obj) => {

  if (commandType === "add"){
    let now = new Date();
    obj.todoItems[obj.itemNum - 1] = obj.itemNum + " [ ] " + itemList + " created at " + now.toDateString();
    obj.itemNum = obj.itemNum + 1;
    console.log(obj);
  } else if (commandType === "show") {
    for(let i = 0; i < obj.todoItems.length; i++){
        console.log(obj.todoItems[i]);
    }
  } else if (commandType === "done"){
    let listObjStr = obj.todoItems[itemList - 1]
    let splitListStr = listObjStr.split("");
    //console.log(splitListStr);
    splitListStr[3] = "x";
    //console.log(splitListStr);
    let doneListItem = splitListStr.join("");
    obj.todoItems[itemList - 1] = doneListItem;
    console.log(obj);
  } else if (commandType === "delete"){
    delete obj.todoItems[itemList - 1];
    let deletedItem = obj.todoItems.splice((itemList - 1), 1);
    obj.itemNum = obj.itemNum - 1;
    for (let i = 0; i < obj.todoItems.length; i++){
        let listObjStr = obj.todoItems[i]
        let splitListStr = listObjStr.split("");
        splitListStr[0] = i + 1;
        let doneListItem = splitListStr.join("");
        obj.todoItems[i] = doneListItem;
    }
    //console.log(obj);
  }


  jsonfile.writeFile(file, obj, (err) => {
    if(err){
        console.log("There's an error.");
        console.log(err);
    }
    console.log(obj);
  });
});