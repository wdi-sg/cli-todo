const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  if (!obj.todoItems){
    obj.todoItems = []
  }

  if (!obj.tempStorage){
    obj.tempStorage = []
  }


  if (process.argv[2] === "add"){
    obj.tempStorage.push(process.argv[3])
    obj.todoItems.push(`${obj.todoItems.length+1}. [ ] - ${process.argv[3]}`)
    
    for (let i = 0; i < obj.todoItems.length; i++){
      console.log(`${obj.todoItems[i]}`)

    }
  }

  if (process.argv[2] === "done"){
    let arrayItem = process.argv[3]-1
    obj.todoItems[arrayItem] = `${process.argv[3]}. [X] - ${obj.tempStorage[arrayItem]}`

    for (let i = 0; i < obj.todoItems.length; i++){
      console.log(`${obj.todoItems[i]}`)
    }

  }

  //WORK ON ^^^^ step

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
