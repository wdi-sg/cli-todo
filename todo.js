const jsonfile = require('jsonfile');

const file = 'data.json'

var commandType = process.argv[2]

var newItems = process.argv[3]

if (commandType === "add")jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  obj["todoItems"] = newItems;

    var counter = 0;

}


console.log(commandType)
console.log(newItems)





  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });