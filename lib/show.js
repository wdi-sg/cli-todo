const fs = require("fs");

const {todosPath} = require("./config");
const read = require("./utils/read");

module.exports = function(todo) {
  let collection;
  if (fs.existsSync(todosPath)) {
    collection = read(todosPath);
    for (let i = 0; i < collection.length; i++) {
      console.log(
        `${collection[i].id}. [${collection[i].done}] - ${collection[i].data}\n\tcreated: ${collection[i].created_at}${collection[i].updated_at === "" ? "" : `\n\tupdated: ${collection[i].updated_at}`}`,
      );
    }
  } else {
    console.log("You have no todos saved.");
  }
};
