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
