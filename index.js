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
    //create date
    let date = new Date()
    //push input and date into temp storage
    obj.tempStorage.push({input: process.argv[3], created: `created at: ${date.toString()}`})
    //push todo with string text into todoItems
    obj.todoItems.push(`${obj.todoItems.length+1}. [ ] - ${process.argv[3]} - ${obj.tempStorage[obj.todoItems.length].created}`)

    //loop through todoItems for display
    for (let i = 0; i < obj.todoItems.length; i++){
      console.log(`${obj.todoItems[i]}`)
    }
  }

  if (process.argv[2] === "done"){
    let arrayItem = process.argv[3]-1
    //set todoItem string to X
    obj.todoItems[arrayItem] = `${process.argv[3]}. [X] - ${obj.tempStorage[arrayItem].input} - ${obj.tempStorage[arrayItem].created}`
    //loop and print all todoItems
    for (let i = 0; i < obj.todoItems.length; i++){
      console.log(`${obj.todoItems[i]}`)
    }
  }

  //WORK ON ^^^^ step

  jsonfile.writeFile(file, obj, (err) => {
    console.log(err)
  });
});
