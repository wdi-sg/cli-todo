let command = process.argv[2];
let arguments = process.argv.slice(3);

const jsonfile = require('jsonfile');
const file = 'data.json';

// returns readed obj and err if any
let filePromise = jsonfile.readFile(file);

const writeFile = function (file, obj) {
  jsonfile.writeFile(file, obj, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log("Saved!");
    }
  });
};

const parseList = function (todoObj) {
  let list = todoObj.todoList;
  console.log(list);

  for (let index in list) {
    console.log(`${index}: ${list[index].title}`);
  }
};

const addItem = function (todoObj, newItem) {
  console.log(newItem);
  const list = todoObj.todoList;
  const newItemIndex = Object.keys(list).length + 1;
  console.log(newItemIndex);
  const item = {
    [newItemIndex]: {
      "title": newItem,
      "done": false,
      "createdAt": Date.now(),
      "updatedAt": null
    }
  };

  console.log(item);
};

const delItem = function (todoObj, oldItem) {
};

const markDone = function (todoObj, itemDoneId) {
};

const despatch = {
  "list": parseList,
  "add" : addItem,
};

if (despatch[command] === undefined) {
  console.log("GO AWAY");
} else {
  filePromise
    .then((obj) => despatch[command](obj, arguments))
    .catch((err) => console.log(err));
}
