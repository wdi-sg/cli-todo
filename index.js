const jsonfile = require('jsonfile');
const figlet = require('figlet')
const file = 'data.json'

//ASCII Art
figlet.text('To-do List', {
  font: 'Larry 3D',
  horizontalLayout: 'default',
  verticalLayout: 'default'
}, function (err, data) {
  if (err) {
    console.log('Something went wrong...');
    console.dir(err);
    return;
  }
  console.log(data);


  //ACTUAL PROGRAM
  jsonfile.readFile(file, (err, obj) => {

    if (err){
      return console.log(err)
    }
    const display = () => {
      //loop through todoItems for display
      for (let i = 0; i < obj.todoItems.length; i++) {
        console.log(`${i+1}. ${obj.todoItems[i]}`)
      }
    }
    //create arrays if not existant
    if (!obj.todoItems) {
      obj.todoItems = []
    }
    if (!obj.tempStorage) {
      obj.tempStorage = []
    }

    let command = process.argv[2]
    let input = process.argv[3]

    if (command === "add") {
      //create date
      let date = new Date()
      //push input and date into temp storage
      obj.tempStorage.push({
        input: input,
        created: `created at: ${date.toString()}`
      })

      //variable for better readability
      let dateValue = obj.tempStorage[obj.todoItems.length].created
      //push todo with string text into todoItems
      obj.todoItems.push(`[ ] - ${input} - ${dateValue}`)

      display()
    }

    if (command === "done") {
      //set update date to todo
      let date = new Date()

      //variables for better readability
      let arrayItem = input - 1
      let todo = obj.tempStorage[arrayItem].input
      let createdDate = obj.tempStorage[arrayItem].created
      

      //create updated key and create variable for it
      obj.tempStorage[arrayItem].updated = `updated at: ${date}`
      let updatedDate = obj.tempStorage[arrayItem].updated

      //set todoItem string to X and add updatedDate
      obj.todoItems[arrayItem] = `[X] - ${todo} - ${createdDate} - ${updatedDate}`

      display()
    }

    if (command === "remove") {
      let arrayItem = input - 1
      //remove array item from todo and temp array
      obj.todoItems.splice(arrayItem, 1)
      obj.tempStorage.splice(arrayItem, 1)
      display()
    }

    jsonfile.writeFile(file, obj, (err) => {
      if (err) {
        return console.log(err)
      }

    });
  });



});