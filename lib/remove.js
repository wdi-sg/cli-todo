const fs = require("fs");

const {todosPath} = require("./config");
const read = require("./utils/read");
const write = require("./utils/write");

module.exports = function(id) {
  let collection;
  if (fs.existsSync(todosPath)) {
    collection = read(todosPath);
    if (collection[id - 1] !== undefined) {
      console.log(`\n"${collection[id - 1].data}" has been removed.\n`);
      collection.splice(id-1, 1);
      // reset id
      for (let i=0; i<collection.length; i++) {
        collection[i].id = i+1;
      }
      write(todosPath, collection);
    } else {
      console.log(`\nCould not find todo at id: ${id}\n`);
      process.exit(1);
    }
  } else {
    console.log("You have no todos saved.");
  }
};
