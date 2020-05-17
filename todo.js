const jsonfile = require("jsonfile");
const file = "data.json";
const commandType = process.argv[2];
const todoItem = process.argv[3];
const date = new Date();
const angryFace = "•`_´•";

jsonfile.readFile(file, (err, obj) => {
  if (commandType === "add") {
    let todoNumber = obj["todoItems"].length;
    obj["todoItems"].push(`${todoNumber + 1}. [ ] - ${todoItem}
    Created on ${date}`);
    console.log(obj);
  } else if (commandType === "delete") {
    obj["todoItems"].splice(todoItem - 1, 1);
    for (let i = 0; i < obj["todoItems"].length; i++) {
      const stringWithoutIndex = obj["todoItems"][i].slice(3);
      const index = 1;
      const newString = `${i + 1}. ${stringWithoutIndex}`;
      obj["todoItems"][i] = newString;
    }
    console.log(obj);
  } else if (commandType === "show") {
    console.log(obj);
  } else if (commandType === "done") {
    let selectedTodo = obj["todoItems"][parseInt(todoItem) - 1];
    let doneTodo = selectedTodo.replace(`${todoItem}. [ ]`, `${todoItem}. [x]`);
    obj["todoItems"].splice(todoItem - 1, 1, doneTodo);
    obj["todoItems"][parseInt(todoItem) - 1] = obj["todoItems"][
      parseInt(todoItem) - 1
    ].concat(`. 
    Updated at: ${date}`);
    console.log(obj["todoItems"]);
  } else if (commandType === "clear") {
    while (obj["todoItems"].length > 0) {
      obj["todoItems"].pop();
    }
  } else {
    console.log(`That's not a valid input! ${angryFace}`);
  }

  jsonfile.writeFile(file, obj, err => {
    // console.log(err);
  });
});
