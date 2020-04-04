let command = process.argv[2];
let arguments = process.argv.slice(3);

const jsonfile = require('jsonfile');
const file = 'data.json';

// returns readed obj and err if any
let filePromise = jsonfile.readFile(file);

const parseDate = function (dateObj) {
  if (dateObj === "") {
    return "";
  }
  let options  = {
    weekday: "short",
    day: "numeric",
    month: "short",
    hour12: false,
    hour: "numeric",
    minute: "numeric",
  };
  let dateStr = new Intl.DateTimeFormat('default', options).format(dateObj);
  return dateStr;
};

const parseList = function (todoObj) {
  let heading = [
    "S/N",
    "Done".padEnd(4),
    "Item".padEnd(33, " "),
    "Created at".padEnd(18, " "),
    "Updated at".padEnd(18, " "),
  ];
  console.log(heading.join(" "));
  console.log("-".repeat(80));

  let list = todoObj.todoList;
  for (let i = 0; i < list.length; i++) {
    let item = list[i];
    let index = String(i + 1).padStart(3, " ");
    let done = item.done ? "[x] " : "[ ] ";
    let title = item.title.padEnd(33, " ");
    let cDateObj = new Date(item.createdAt);
    let cDateStr = parseDate(cDateObj).padEnd(18);
    let uDateObj = (item.updatedAt === null) ? "" : new Date(item.updatedAt);
    let uDateStr = parseDate(uDateObj).padEnd(18);
    console.log(index, done, title, cDateStr, uDateStr);
  }
};

const addItem = function (todoObj, newItems) {
  const list = todoObj.todoList;
  const timeStamp = new Date();
  for (let i = 0; i < newItems.length; i++) {
    const item = {
      "title": newItems[i],
      "done": false,
      "createdAt": timeStamp,
      "updatedAt": null
    };
    list.push(item);
  }

  todoObj.todoList = list;
  let writePromise = jsonfile.writeFile(file, todoObj);
  writePromise
    .then(console.log("Saved! Updated list:"))
    .then(parseList(todoObj))
    .catch((err) => console.log(err));
};

const delItem = function (todoObj, oldItems) {
  let list = todoObj.todoList;
  if (list.length === 0) {
    console.log("No more items in todo-list, exiting");
    return;
  }
  for (let i = 0; i < oldItems.length; i++) {
    let index = Number(oldItems[i]) - 1;
    console.log("Removing item: ", list[index].title);
    list.splice(index, 1);
  }

  todoObj.todoList = list;
  let writePromise = jsonfile.writeFile(file, todoObj);
  writePromise
    .then(console.log("Saved! Updated list:"))
    .then(parseList(todoObj))
    .catch((err) => console.log(err));
};

const markDone = function (todoObj, itemsDone) {
  let list = todoObj.todoList;
  for (let i = 0; i < itemsDone.length; i++) {
    let index = Number(itemsDone[i]) - 1;
    list[index].done = true;
    let uDateObj = new Date();
    list[index].updatedAt = uDateObj;
  }

  todoObj.todoList = list;

  let writePromise = jsonfile.writeFile(file, todoObj);
  writePromise
    .then(console.log("Saved! Updated list:"))
    .then(parseList(todoObj))
    .catch((err) => console.log(err));
};

const despatch = {
  "list": parseList,
  "add" : addItem,
  "delete": delItem,
  "done": markDone,
};

if (despatch[command] === undefined) {
  console.log("GO AWAY");
} else {
  filePromise
    .then((obj) => despatch[command](obj, arguments))
    .catch((err) => console.log(err));
}
