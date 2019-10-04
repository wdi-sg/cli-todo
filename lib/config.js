const os = require("os");
const path = require("path");


// set data path and filename
const fileName = ".todos.json";
const todosPath = path.resolve(os.homedir(), fileName);

module.exports = {todosPath};
