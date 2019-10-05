// Install jsonfile using npm
const jsonfile = require('jsonfile');

// Create data.json file with empty object syntax
const file = 'data.json';

// Create constant variable to indicate if task is completed
const taskIncomplete = ". [ ] - ";
const taskComplete = ". [x] - ";

// Create

// Read the third argument from command line to add into todoItems array
jsonfile.readFile(file, (err, obj) => {

    // Declare a variable to for obj.todoItems
    let toDoObject = obj.todoItems;

    if(process.argv[2] === "add") {

        toDoObject.push(process.argv[3]);
        console.log(process.argv[3] + " has been added to the list.");

    } else if(process.argv[2] === "show") {

        // Display list as per expected format
            // e.g. 1. [ ] - eat bak kut teh
        for(let i = 1; i < toDoObject.length; i++) {

            console.log(i + taskIncomplete + toDoObject[i]);
        }

    } else if(process.argv[2] === "done") {

        // Check the next input for the item to be marked as done
        let taskNo = parseInt(process.argv[3]);

        // Pass the taskNo to the array and mark as complete
        console.log(taskNo + taskComplete + toDoObject[taskNo]);

        console.log(toDoObject);

    }

    jsonfile.writeFile(file, obj, (err) => {
        console.log("Error: " + err);
    });
});
