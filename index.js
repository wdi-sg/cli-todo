
var formPhrase = require("font-ascii").default;

var commandType = process.argv[2];

var task = process.argv[3];

console.log("Your command was: "+commandType);

const jsonfile = require('jsonfile');

const file = 'data.json'

const notDone = " [ ] - ";
const done = " [X] - ";

jsonfile.readFile(file, (err, obj) => {
    if(commandType === "add"){
    let listNo = obj["todoItems"].length+1;
obj["todoItems"].push(`${listNo}.${notDone}${task}`);
obj["created_at"].push(new Date().toLocaleString());
obj["updated_at"].push("");

  console.log(obj)
  formPhrase("Item Added", { typeface: "Small", color: "blue" });
} if(commandType === "done"){
    let listNo = process.argv[3];
    // console.log(obj["todoItems"][listNo-1]);
    let doneTask = obj["todoItems"][listNo-1].split(" ").slice(4).join(' ');
    obj["todoItems"][listNo-1] = `${listNo}.${done}${doneTask}`
    obj["updated_at"][listNo-1] = new Date().toLocaleString();

    console.log(obj);
    formPhrase("Item Done", { typeface: "Small", color: "green" });
} if (commandType === "delete"){
    let listNo = process.argv[3];
    obj["todoItems"].splice(listNo-1,1);
    obj["created_at"].splice(listNo-1,1);
    obj["updated_at"].splice(listNo-1,1);
    for(i=0;i<obj["todoItems"].length;i++){
        let task = obj["todoItems"][i].split(" ");
        task[0] = `${i+1}.`;
        obj["todoItems"][i] = task.join(" ");
    }
    formPhrase("Item Deleted", { typeface: "Small", color: "red" });
    console.log(obj);
}

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
