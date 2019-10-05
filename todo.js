// 1. Install jsonfile using npm
const jsonfile = require('jsonfile');
/*const add = require('./addItem');*/

// 2. Create data.json file with empty object syntax
const file = 'data.json';

// 3. Read the third argument from command line to add into todoItems array
jsonfile.readFile(file, (err, obj) => {

    // 5. Declare a variable to for obj.todoItems
    let toDoObject = obj.todoItems;

    if(process.argv[2] === "add") {

        toDoObject.push(process.argv[3]);
        console.log(process.argv[3] + " has been added to the list.");

    } else if(process.argv[2] === "show") {

        console.log(toDoObject);

    }



    /*obj.todoItems.push(process.argv[2]);
    console.log(obj.todoItems);

    // Try to get item number
    console.log(obj.todoItems[0]);*/

    jsonfile.writeFile(file, obj, (err) => {
        console.log(err)
    });
});

// 4. Declare a function to add item to the list