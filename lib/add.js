const fs = require("fs");

const {todosPath} = require("./config");
const read = require("./utils/read");
const write = require("./utils/write");

module.exports = function(todo) {
  let newTodo;
  let collection;
  const today = new Date();
  const date = `${today.getFullYear()}/${today.getMonth() +
    1}/${today.getDate()}`;
  const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
  const dateTime = `${date} ${time}`;

  if (fs.existsSync(todosPath)) {
    collection = read(todosPath);
    const newId = collection.length + 1;
    newTodo = {
      "id": newId,
      "data": todo,
      "done": " ",
      "created_at": dateTime,
      "updated_at": "",
    };
    collection.push(newTodo);
  } else {
    newTodo = {
      "id": 1,
      "data": todo,
      "done": " ",
      "created_at": dateTime,
      "updated_at": "",
    };
    collection = [newTodo];
  }
  write(todosPath, collection);
  console.log(`\n✔ Added "${todo}" to the todos collection.\n`);
};
