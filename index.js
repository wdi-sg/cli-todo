const jsonfile = require('jsonfile');

const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {

  if (!obj.todoItems){
    obj.todoItems = []
  }
  if (!obj.tempStorage){
    obj.tempStorage = []
  }

  let display = () => {
    //loop through todoItems for display
    for (let i = 0; i < obj.todoItems.length; i++){
      console.log(`${i+1}. ${obj.todoItems[i]}`)
    }
  }
  let command = process.argv[2]

  if (command === "add"){
    //create date
    let date = new Date()
    //push input and date into temp storage
    obj.tempStorage.push({input: process.argv[3], created: `created at: ${date.toString()}`})
    //push todo with string text into todoItems
    obj.todoItems.push(`[ ] - ${process.argv[3]} - ${obj.tempStorage[obj.todoItems.length].created}`)

    display()
  }

  if (command === "done"){
    let date = new Date()
    let arrayItem = process.argv[3]-1
    obj.tempStorage[arrayItem].updated = `updated at: ${date.toString()}`
    //set todoItem string to X
    obj.todoItems[arrayItem] = `[X] - ${obj.tempStorage[arrayItem].input} - ${obj.tempStorage[arrayItem].created} - ${obj.tempStorage[arrayItem].updated}`
    display()
  }

  if (command === "remove"){
    let arrayItem = process.argv[3]-1
    obj.todoItems.splice(arrayItem, 1)
    obj.tempStorage.splice(arrayItem, 1)
    display()
  }

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
