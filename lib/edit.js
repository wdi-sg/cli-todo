const fs = require("fs");

const {todosPath} = require("./config");
const read = require("./utils/read");
const write = require("./utils/write");

const doneArr = [
  "done",
  "d",
  "completed",
  "c",
  "finish",
  "f",
  "finished",
  "over",
  "o",
];

module.exports = function(id, status) {
  let editStatus;
  let collection;
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() +
    1}/${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  if (fs.existsSync(todosPath)) {
    collection = read(todosPath);
    if (collection[id - 1] !== undefined) {
      editStatus = status.toLowerCase();
      collection[id - 1].done = doneArr.includes(editStatus) ? "✔" : " ";
      collection[id - 1].updated_at = dateTime;
      write(todosPath, collection);
      console.log(
        `\n"${collection[id - 1].data}" has been marked as ${
          doneArr.includes(editStatus) ? "completed" : "uncompleted"
        }.\n`,
      );
    } else {
      console.log(`\nCould not find todo at id: ${id}\n`);
      process.exit(1);
    }
  } else {
    console.log("You have no todos saved.");
  }
};
