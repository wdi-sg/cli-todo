// const jsonfile = require('data.json');

// const file = 'data.json'

// jsonfile.readFile(file, (todoList, obj) => {

// const obj = {
// 1. [ ] - eat bak kut teh
// 2. [ ] - go shopping
// 3. [ ] - feed dog
// 4. [ ] - swim practice
// 5. [ ] - code app
// 6. [ ] - meet gabriel
// };

// jsonfile.writeFile(file, obj, (todoList) => {
//   console.log(writeFile)
// });

// // jsonfile.readFile(file, (todoList, obj) => {

// //   console.log(obj);
// //   obj["helloworld"] = "monkey";

// //   jsonfile.writeFile(file, obj, (err) => {
// //     console.log(err)
// //   });
// // });

// const jsonfile = require('jsonfile');

// const file = 'data.json'

// jsonfile.readFile(file, (err, obj) => {

//   console.log(obj);
//   obj["helloworld"] = "monkey";

//   jsonfile.writeFile(file, obj, (err) => {
//     console.log(err)
//   });
// });

// console.log('Hello world');

// const fs = require('fs');

// fs.appendFile('file.txt', 'Writing To The Filesystem! ', (error) => {
//     console.log(error);
// });

// console.log('Data has been written to file.txt');

console.log('Running index.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const todos = require('./todo.js');

const args = yargs.argv;

console.log('You ran the command: ' + args._[0]);

console.log(args.todo);

console.log(todos.addTodo());
console.log('We Love Nodemon!');

// console.log('Running index.js');

// const fs = require('fs');
// const _ = require('lodash');
// const yargs = require('yargs');

// const todos = require('./todo.js');

// const argv = yargs.argv;
// var command = argv._[0];

// console.log('Running Command: ', command);

// if (command === 'addTodo') {
//     todos.addTodo(argv.title);
// } else {
//     console.log('Invalid command.');
// }

// console.log('Starting todo.js');

// const fs = require('fs');

// var addTodo = (title) => {
//     var todos = [];
//     var todo = {
//         title
//     };

//     try {
//         var todosString = fs.readFileSync('todo-data.json');
//         todos = JSON.parse(todosString);
//     } catch (e) {

//     }

//     var duplicatetodos = todos.filter((todo) => todo.title === title);

//     if (duplicatetodos.length === 0) {
//         todos.push(todo);
//         fs.writeFileSync('todo-data.json', JSON.stringify(todos));
//     }
// };

// module.exports = {
//     addTodo
// };