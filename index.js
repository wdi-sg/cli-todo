// console.log("works!!", process.argv[2]);
// var commandType = process.argv[2];
// console.log("Your command was: "+commandType);

let command = process.argv[2]

console.log(` ______       ___         __   _     __
/_  __/__    / _ \___    / /  (_)__ / /_
 / / / _ \  / // / _ \  / /__/ (_-</ __/
/_/  \___/ /____/\___/ /____/_/___/\__/
                                        `)

console.log("Your command was : " +command);

const jsonfile = require('jsonfile');
const file = 'data.json'

jsonfile.readFile(file, (err, obj) => {
    // console.log(err)

  if (command === "add") {

    let created_at = new Date();
    let createdDate = created_at.setDate(17);
    let createdMonth = created_at.setMonth(11);
    let createdYear = created_at.setFullYear(2018);

    let updated_at = new Date();
    let updatedDate = updated_at.getDate();
    let updatedMonth = updated_at.getMonth();
    let updatedYear = updated_at.getFullYear();

        obj.todoItems.push(process.argv[3] +  " - created_at: " + created_at + ", updated_at: " + updated_at);

  }

  jsonfile.writeFile(file, obj, (err) => {
    // console.log(obj)
  });
});


jsonfile.readFile(file, (err, obj) => {

  if (command === "show") {
    for (let i=0; i<obj.todoItems.length; i++)
        console.log((i+1) + ". " + "[ ] - " + obj.todoItems[i])
  }

      jsonfile.writeFile(file, obj, (err) => {
      // console.log(err)
});

});


jsonfile.readFile(file, (err, obj) => {

  if (command === "done") {
    let num = parseInt(process.argv[3])
    for ( let i=0; i<obj.todoItems.length; i++) {
        if (num === i+1) {
            console.log((i+1) + ". " + "[X] - " + obj.todoItems[i])
        }
        else {
            console.log((i+1) + ". " + "[ ] - " + obj.todoItems[i])
        }
    }
  }


  jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)
  });
});



jsonfile.readFile(file, (err, obj) => {

  if (command === "delete") {
    let num = parseInt(process.argv[3])-1
    for ( let i=0; i<obj.todoItems.length; i++) {
        if (num === i+1) {
            console.log(obj.todoItems.splice(num, 1));
        }
        else {
            console.log("Error")
        }
    }
  }


  jsonfile.writeFile(file, obj, (err) => {
    // console.log(err)
  });
});