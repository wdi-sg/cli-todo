const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  console.log(obj);
  if (!obj.todoItems){
    obj.todoItems = []
  }

  if (process.argv[2] === "add"){
    obj.todoItems.push(`${obj.todoItems.length+1}. [ ] - ${process.argv[3]}`)
    console.log(obj.todoItems)
  }
  // if (process.argv[2] === "done"){
  //   let element = obj.todoItems[process.argv[3]-1]
  //   element = `${parseInt(process.argv[3])}. [X] - ${element}`
  //   console.log(obj.todoItems)
  // }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
