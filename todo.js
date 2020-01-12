const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    let todoItems = obj.todoItems;
    console.log(todoItems);
    if (process.argv[2] === "add") {
       todoItems.push(process.argv[3])
    }
    for (let i = 0; i < todoItems.length; i++) {
        console.log(i + 1 + ". [ ] - " + todoItems[i])
        }
 jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)
     
  });
});
