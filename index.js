const input = process.argv.slice(2)
const command = input[0];
const jsonfile = require('jsonfile');
const file = 'data.json'

//Function to console.log items in an array.
const logArray = (array) => {
  array.forEach((item) => console.log(item));
}

jsonfile.readFile(file, (err, obj) => {

  const toDoList = obj["todoItems"]

//TO ADD STUFF INTO THE LIST.
  if (command === "add") {
      let newItem = input.slice(1).join(" ");
      toDoList.push(`${(toDoList.length+1)}. [ ] - ${newItem}`);
      jsonfile.writeFile(file, obj, (err) => {
          if (!err) {
            console.log(`Item added successfully! Updated list:`);
            logArray(toDoList);
          } else {
            console.log(`Sorry, there was an error with adding to the list.`);
            console.log(err);
          }
      });
  }

//TO SEE YOUR LIST.

  if (command === "show") {
    logArray(toDoList)
  }

//TO MARK IT DONE
  if (command === "done") {
    let targetItem = toDoList[input[1]-1] //Target index should be the input number - 1
    let doneItem = targetItem.slice(0,4) + "X" + targetItem.slice(5)
    toDoList[targetIndex] = doneItem

    jsonfile.writeFile(file, obj, (err) => {
        if (!err) {
          console.log(`Great job on completing a task!`);
          logArray(toDoList);
        } else {
          console.log(`Sorry, there was an error with checking your task off the list.`);
          console.log(err);
        }
    });
  }

});
