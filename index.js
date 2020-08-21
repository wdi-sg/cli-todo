console.log("works!!", process.argv);

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
obj["todoItems"].push(`${listNo}.${notDone}${task}`)
  console.log(obj)
} if(commandType === "done"){
    let listNo = process.argv[3];
    // console.log(obj["todoItems"][listNo-1]);
    let doneTask = obj["todoItems"][listNo-1].split(" ").slice(4).join(' ');
    obj["todoItems"][listNo-1] = `${listNo}.${done}${doneTask}`
    console.log(obj);
}

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
